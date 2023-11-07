document.getElementById("btn-login").addEventListener("click",()=>{
    
    let username=document.getElementById("username").value
    let Password=document.getElementById("password").value


    try {
      
          if(!(username&&Password))
          {
              alert("Fields are empty")
          }
          else
          {
            fetch("http://localhost:3004/BookMyShow/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        username,Password
    })
  })
    .then(async (res) => {
      
      const  data=await res.json()
     console.log(data);
      let token=data.token
      if(res.status!==404)
      {
        localStorage.setItem("token",JSON.stringify(token))
        window.location.href="../index.html"
      }
      else
      {
        alert(data.msg)
      }
    })
    .catch((error)=>{alert("server not connected")})
          }

    } catch (error) {
      console.log(error);
    }


})