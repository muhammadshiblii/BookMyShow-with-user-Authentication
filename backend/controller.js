import user_schema from "./model/user.model.js";
import movie_schema from "./model/movie.model.js";
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
const { sign } = pkg;


/////////////////// USER OPERATIONS ///////////////////////

export async function addUser(req, res) {
  try {
    const { username, Password, name } = req.body;
    const usr = await user_schema.findOne({ username });
    if (usr) return res.status(404).send({msg:"Username already exist"});
    if (!(username && Password && name))
      return res.status(404).send({msg:"Fields are empty"});
    bcrypt
      .hash(Password, 10)
      .then((hashedPwd) => {
        return res.status(201).send( user_schema.create({ name, username, Password: hashedPwd }));
      })
      
      .catch((error) => {
        console.log(error);
        res.status(404).send({msg:error});
      });
  } catch (error) {
    console.log(error);
  }
}

export async function login(req, res) {
  const { username, Password } = req.body;
  const usr = await user_schema.findOne({ username });
  if (usr === null)
  {return res.status(404).send({msg:"username doesnt exist"});}
  const success = await bcrypt.compare(Password, usr.Password);
  if (success !== true)return res.status(404).send({msg:"username and password doesnt match"});
  const token = await sign({ usr }, process.env.JWT_KEY, { expiresIn: "1hr" });
  res.status(201).send({ msg: "Successfully loged in", token });
  res.end();
}



export async function home(req, res) {
  try {
    const { name } = req.user.usr;
    res.status(200).send({ msg: `${name}` });
  } catch (error) {
    res.status(404).send;
  }
}




/////////////////// MOVIE OPERATIONS ///////////////////////

export async function AddMovie(req, res) {
  try {
    const { ...Movie } = req.body;
    res.status(201).send(movie_schema.create({ ...Movie }));
  } catch (error) {
    res.status(404).send(error);
  }
}

export async function getMovie(req, res) {
  let Movie = await movie_schema.find();
  res.status(200).send(Movie);
}

export async function getDetails(req, res) {
  const { id } = req.params;
  let Movie = await movie_schema.findOne({ _id: id });
  res.status(200).send(Movie);
}

export function deleteMovie(req, res) {
  const { id } = req.params;
  const data = movie_schema.deleteOne({ _id: id });
  data
    .then((resp) => {
      res.status(200).send(resp);
    })
    .catch((error) => {
      res.status(404).send(error);
    });
}

export async function editDetails(req, res) {
  const { id } = req.params;
  const { ...movie } = req.body;
  await movie_schema.updateOne({ _id: id }, { $set: { ...movie } });
  res.status(201).send("updated");
}

