import { client } from "./index.js";
import bcrypt from "bcrypt";

export async function updateMovies(id, updateData) {
    return await client.db("movies").collection("movies").updateOne({ id: id }, { $set: updateData });
}
export async function deleteMovies(id) {
    return await client.db("movies").collection("movies").deleteOne({ id: id });
}
export async function postMovies(addmovie) {
    return await client.db("movies").collection("movies").insertMany(addmovie);
}
export async function getMoviesById(id) {
    return await client.db("movies").collection("movies").findOne({ id: id });
}
export async function getAllMovies(filter) {
    return await client.db("movies").collection("movies").find(filter).toArray();
}


 export async function genPassword(pwd){

    const No_Of_Rounds = 10;
    const salt =  await bcrypt.genSalt(No_Of_Rounds);
    const hashPassword = await bcrypt.hash(pwd, salt)
    return hashPassword;
  
  }