let loginform=document.querySelector("#loginform")
loginform.addEventListener("submit",handleForm)
function handleForm(event){
    event.preventDefault()
    let username=document.querySelector("#u_name").value
    let password=document.querySelector("#pwd").value
    // console.log(username,password);
    let bodystring={
        username,password
    }
    console.log(bodystring);
    let option={
        method:"POST",
        headers:{
            "Content-Type":"application/JSON"
        },
        body:JSON.stringify(bodystring)
    }
    fetch("http://127.0.0.1:8002/api/v1/token/",option).then(res=>res.json()).then(data=>settoLocalstorage(data))

}
function settoLocalstorage(data){
    console.log(data);
    localStorage.setItem("access",data.access)
    localStorage.setItem("refresh",data.refresh)
    fetchTodos()

    
}
function fetchTodos(){
    let authToken=localStorage.getItem("access")
    let option={
        method:"GET",
        headers:{
            "Content-Type":"application/JSON",
            "Authorization":`Bearer ${authToken}`
        },
    
    }

    fetch("http://127.0.0.1:8002/api/v1/modeltodos",option).then(res=>res.json()).then(data=>populateTodos(data))

}
function populateTodos(todos){
    let htmlData=``
    todos.forEach(todo=>{
        htmlData+=`
        <tr>
        <td>${todo.id}</td>
        <td>${todo.task_name}</td>
        <td>${todo.completed_status}</td>
        </tr>
        `
    })
    document.querySelector("#result").innerHTML=htmlData

}


