import { client } from "./index.js";

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
