



async function getMovies() {
  const Movie = await fetch("http://localhost:3004/BookMyShow/movies");
  const data = await Movie.json();
  s = "";
  data.map((dt) => {
    s += `<div class="card">
    <a href="./Details.html?id=${dt._id}"><img class="card-img" src="${dt.Movie_Poster}" alt=""></a>
    <div class="discription">
        <div class="film"><span class="film-name">${dt.Movie_Title}</span></div>
        <div><span class="genre">${dt.Genre}</span></div>
    </div>
</div>`;
  });
  document.getElementById("show").innerHTML = s;




  const key = localStorage.key(0);
const value = JSON.parse(localStorage.getItem(key));
fetch("http://localhost:3004/BookMyShow/home", {
  headers: { Authorization: `Bearer ${value}` },
})
  .then((res) => res.json())
  .then((data) => {
    const { msg } = data;
    document.getElementById("name").innerHTML = msg;
  })
  .catch((error) => {
    console.log(error);
  });





}
getMovies();
