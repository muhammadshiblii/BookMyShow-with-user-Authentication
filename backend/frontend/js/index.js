async function getMovies() {
  const Movie = await fetch("http://localhost:3004/BookMyShow/movies");
  const data = await Movie.json();
  s = "";
  data.map((dt) => {
    s += `<div class="card">
    <a href="./pages/Details.html?id=${dt._id}"><img class="card-img" src="${dt.Movie_Poster}" alt=""></a>
    <div class="discription">
        <div class="film"><span class="film-name">${dt.Movie_Title}</span></div>
        <div><span class="genre">${dt.Genre}</span></div>
    </div>
</div>`;
  });
  document.getElementById("show").innerHTML = s;

  function check_localstorage() {
    const value = JSON.parse(localStorage.getItem("token"));
    v = "";
    if (!value) {
      v += `<a href="./pages/login.html"><button class="sign-in">Login</button></a>`;
      document.getElementById("name").innerHTML = v;
    } else {
      fetch("http://localhost:3004/BookMyShow/home", {
        headers: { Authorization: `Bearer ${value}` },
      })  
        .then((res) => res.json())
        .then((data) => {
          const { msg } = data;

          document.getElementById("name").innerHTML = msg
            ? `${msg}<button class="sign-in" onclick="del()">Logout</button> <button class="sign-in">
            <a href="./pages/registration.html">Register</a></button>`
            : `<h6>Session Expired <a href="./pages/login.html"><button class="sign-in">Login</button></a></h6>`;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  check_localstorage();
}

function del(){
  localStorage.clear();
  location.reload()
}

getMovies();
