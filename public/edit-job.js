const editFormDOM = document.querySelector('.edit-form')
const positionDOM = document.querySelector('#form-position')
const companyDOM = document.querySelector('#form-company')
const statusDOM = document.querySelector('#status')
const profilebtnDOM = document.querySelector('.profile-btn')
const logoutDOM = document.querySelector('.logout')
const usernameDOM = document.querySelector('.username')
const backhomebtn = document.querySelector('.btn-home')
const alertDOM = document.querySelector('.alert')
const params = window.location.search
const id = new URLSearchParams(params).get('id')
const token = JSON.parse(localStorage.getItem('token'))
const username = JSON.parse(localStorage.getItem('name'))
usernameDOM.innerHTML =username

const getSingleJob = async(token)=>{
    try{
        const res = await fetch(`http://localhost:3000/api/v1/jobs/${id}`,{
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                'Accept': "application/json"
            }
        })
        if(res.status != 200){
            const error = await res.json()
            throw new Error(error.msg)
        }

        console.log(res)
        const {job} = await res.json()
        console.log(job)
        positionDOM.value = job.position
        companyDOM.value = job.company
        statusDOM.value = job.status 
        document.querySelector('body').classList.remove('hide')
    }
    catch(error){
        console.log(error)
        alertDOM.innerHTML = error.message
        alertDOM.classList.add('alert-danger')
        setTimeout(()=>{
            alertDOM.classList.remove('alert-danger')
        },2000)
    }
}

const editJob = async(token)=>{
    try{
        const res = await fetch(`http://localhost:3000/api/v1/jobs/${id}`,{
           method: 'PATCH',
           headers: {
               'Authorization': `Bearer ${token}`,
               'Content-type': 'application/json',
               'Accept': 'application/json'
           },
           body: JSON.stringify({
             "position": positionDOM.value,
             "company": companyDOM.value,
             "status": statusDOM.value  
           }) 
        })
        // console.log(res)
        if(res.status != 200){
            const error = await res.json()
            throw new Error(error.msg)
        }
        const data = await res.json()
        // console.log(data)
        alertDOM.innerHTML = `Edit successful !`
        alertDOM.classList.add('alert-success')
        setTimeout(()=>{
            alertDOM.classList.remove('alert-success')
        },2000)

    }
    catch(error){
        console.log(error)
        alertDOM.innerHTML = error.message
        alertDOM.classList.add('alert-danger')
        setTimeout(()=>{
            alertDOM.classList.remove('alert-danger')
        },2000)
    }
}


getSingleJob(token)


editFormDOM.addEventListener('submit', (e)=>{
    e.preventDefault()

    editJob(token)
})



profilebtnDOM.addEventListener('click', (e)=>{
    logoutDOM.classList.toggle('show')
})

logoutDOM.addEventListener('click', (e)=>{
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    window.location.replace('index.html')
})

backhomebtn.addEventListener('click', ()=>{
    // window.location.href ='dashboard.html';
    window.location.replace('dashboard.html');
})