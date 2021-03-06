//login handler

// const nameDOM = document.querySelector('.name')
const emailDOM = document.querySelector('.email')
const passwordDOM = document.querySelector('.password')
const alertDOM = document.querySelector('.alert')
const loginbtnDOM = document.querySelector('.btn-submit')

const loginUser = async ()=>{
    loginbtnDOM.innerHTML = `fetching user...`
    try{
    const res = await fetch('https://jobs-app-v8.herokuapp.com/api/v1/auth/login',{
    method: 'POST',
    headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        "email": emailDOM.value,
        "password": passwordDOM.value
    })
    })
    // console.log(typeof res.status)
    if(res.status != 200){
        const error = await res.json()
        throw new Error(error.msg)
    }
    const data = await res.json()
    console.log(data)
    console.log(data.token)
    localStorage.setItem('token',JSON.stringify(data.token))
    localStorage.setItem('name',JSON.stringify(data.user.name))
    window.location.href = "dashboard.html";

    }
    catch(error){
        let message = error.message
        // console.log(message,typeof message,message.indexOf(duplicateEmail))
            alertDOM.innerHTML =message
            alertDOM.classList.add('show')
   

    setTimeout(()=>{
        alertDOM.classList.remove('show')
    },2000)
}
    loginbtnDOM.innerHTML = `Login`
}

document.querySelector('.login-form').addEventListener('submit', (e)=>{
    e.preventDefault();
    loginUser()
})