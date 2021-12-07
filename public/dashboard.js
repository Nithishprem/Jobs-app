const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
 const tableBodyDOM = document.querySelector('.table-body')
 const usernameDOM = document.querySelector('.username')
 const positionInputDOM = document.querySelector('#form-position')
 const companyInputDOM = document.querySelector('#form-company')
 const alertDOM = document.querySelector('.alert')
 const profilebtnDOM = document.querySelector('.profile-btn')
 const logoutDOM = document.querySelector('.logout')
 const bodyDOM = document.querySelector('body')
 const token = JSON.parse(localStorage.getItem('token'))
 const username = JSON.parse(localStorage.getItem('name'))
 usernameDOM.innerHTML =username
 

 const showJobs = async(token)=>{
    try{
        const res = await fetch('https://jobs-app-v8.herokuapp.com/api/v1/jobs',{
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

        // console.log(res)
        const data = await res.json()
        // console.log(data)
        let jobs = []
        data.jobs.map((job)=>{
           let date = job.createdAt.split('T')[0].split('-')
           let monthNum = Number(date[1])-1
           date= `${monthNames[monthNum]} ${date[2]}, ${date[0]}`
           jobs.push(`
           <div class="table-row">
                <div class="position">${job.position}</div>
                <div class="company">${job.company}</div>
                <div class="date">${date}</div>
                <div class="status">${job.status}</div>
                <div class="action">
                    <a href="edit.html?id=${job._id}">
                        <i class="fas fa-edit"></i>
                    </a>
                    <i class="fas fa-trash delete-job" data-id="${job._id}"></i>
                </div>
            </div>
        `)
        })
        tableBodyDOM.innerHTML =jobs.join('')
        bodyDOM.classList.remove('hide')

    }
    catch(error){
        console.log(error)
    }
 }

 const createFormJob = async(token)=>{
    try{
        const res = await fetch('https://jobs-app-v8.herokuapp.com/api/v1/jobs',{
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "company": companyInputDOM.value,
                "position": positionInputDOM.value
            })
        })
        if(res.status != 201){
            const error = await res.json()
            throw new Error(error.msg)
        }
        // console.log(res)
        const data = await res.json()
        alertDOM.innerHTML = `Job Added successfully !`
        alertDOM.classList.add('alert-success')
        setTimeout(()=>{
            alertDOM.classList.remove('alert-success')
        },2000)
        // console.log(data)
        showJobs(token)
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

const deleteDashboardJob = async(token,id)=>{
    try{
        const res = await fetch(`https://jobs-app-v8.herokuapp.com/api/v1/jobs/${id}`,{
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": 'application/json'
        }
        })
        console.log(res)
        if(res.status != 200){
            const error = await res.json()
            console.log(error)
            throw new Error(error.msg)
        }
        const data = await res.text()
        console.log(data)
        showJobs(token)
    }
    catch(error){
        console.log(error)
    }
}





 
 
 document.addEventListener('DOMContentLoaded', ()=>{
    showJobs(token) 
 })

 document.querySelector('.job-form').addEventListener('submit', (e)=>{
     e.preventDefault()
     createFormJob(token)
 })

 tableBodyDOM.addEventListener('click', (e)=>{
     if(e.target.classList.contains('delete-job')){
        const id = e.target.dataset.id
        // console.log(id)
        deleteDashboardJob(token,id)
     }
     
 })

 

profilebtnDOM.addEventListener('click', (e)=>{
    logoutDOM.classList.toggle('show')
})

logoutDOM.addEventListener('click', (e)=>{
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    window.location.replace('index.html')
})