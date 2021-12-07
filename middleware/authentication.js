const User = require("../models/User")
const { StatusCodes } = require("http-status-codes")
const jwt = require("jsonwebtoken")
const {UnauthenticatedError} = require('../errors')

const authMiddleware = (req,res,next) => {
    //check header
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        throw new UnauthenticatedError('Authentication Invalid')
    }

    const token = authHeader.split(' ')[1]


    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        // attach user to req object for the jobs route
        req.user = {userId:payload.userId, name: payload.name }
        next()

    }
    catch(error){
        throw new UnauthenticatedError('Authentication Invalid')
    }
}

module.exports = authMiddleware