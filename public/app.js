//registration handler

const nameDOM = document.querySelector('.name')
const emailDOM = document.querySelector('.email')
const passwordDOM = document.querySelector('.password')
const alertDOM = document.querySelector('.alert')
const duplicateEmail = 'duplicate value enter for email field'

const registerUser = async ()=>{
    try{
    const res = await fetch('https://jobs-app-v8.herokuapp.com/api/v1/auth/register',{
    method: 'POST',
    headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        "name": nameDOM.value,
        "email": emailDOM.value,
        "password": passwordDOM.value
    })
    })
    // console.log(typeof res.status)
    if(res.status != 201){
        const error = await res.json()
        throw new Error(error.msg)
    }
    const data = await res.json()
    console.log(data)
    console.log(data.token)
    localStorage.setItem('token',JSON.stringify(data.token))
    window.location.href = "dashboard.html";
    }
    catch(error){
        let message = error.message
        console.log(message)
        if(message.indexOf(duplicateEmail)>=0){
            alertDOM.innerHTML = `Email already exist, Please choose another`
            alertDOM.classList.add('show')
            setTimeout(()=>{
                alertDOM.classList.remove('show')
            },2000)
    }else{
        alertDOM.innerHTML = error.message
            alertDOM.classList.add('alert-danger')
            setTimeout(()=>{
                alertDOM.classList.remove('alert-danger')
            },2000)
        }
    }

}


document.querySelector('.register-form').addEventListener('submit', (e)=>{
    e.preventDefault();
    registerUser()
})