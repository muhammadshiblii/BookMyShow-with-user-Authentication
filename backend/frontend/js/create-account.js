document.getElementById("btn-submit").addEventListener("click",()=>{
    
    let name=document.getElementById("name").value
    let username=document.getElementById("username").value
    let Password=document.getElementById("password").value


    fetch("http://localhost:3004/BookMyShow/adduser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        name,username,Password
    })
  })
    .then(async(res) => {
      const data=await res.json();
      if(res.status!==404)
      {
        alert("Registration Succesfull")
        window.location.href="../index.html"
      }
      else
      {
        alert(data.msg)
      }
    })
    .catch((error)=>{alert("server not connected")})


})