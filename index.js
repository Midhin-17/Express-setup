// console.log("express setup");

// const express = require('express')

import express  from "express";
import {MongoClient} from "mongodb";
import dotenv from "dotenv";

dotenv.config();
// console.log(process.env.MONGO_URL);

const app = express()
const PORT= process.env.PORT;

const movies = [{"id":"100","name":"Iron man 2","poster":"https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_FMjpg_UX1000_.jpg","rating":7,"summary":"With the world now aware that he is Iron Man, billionaire inventor Tony Stark (Robert Downey Jr.) faces pressure from all sides to share his technology with the military. He is reluctant to divulge the secrets of his armored suit, fearing the information will fall into the wrong hands. With Pepper Potts (Gwyneth Paltrow) and Rhodes (Don Cheadle) by his side, Tony must forge new alliances and confront a powerful new enemy.","trailer":"https://www.youtube.com/embed/wKtcmiifycU", "language": "english"},{"id":"101","name":"No Country for Old Men","poster":"https://upload.wikimedia.org/wikipedia/en/8/8b/No_Country_for_Old_Men_poster.jpg","rating":8.1,"summary":"A hunter's life takes a drastic turn when he discovers two million dollars while strolling through the aftermath of a drug deal. He is then pursued by a psychopathic killer who wants the money.","trailer":"https://www.youtube.com/embed/38A__WT3-o0", "language": "english"},{"id":"102","name":"Jai Bhim","poster":"https://m.media-amazon.com/images/M/MV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg","summary":"A tribal woman and a righteous lawyer battle in court to unravel the mystery around the disappearance of her husband, who was picked up the police on a false case","rating":8.8,"trailer":"https://www.youtube.com/embed/nnXpbTFrqXA", "language": "tamil"},{"id":"103","name":"The Avengers","rating":8,"summary":"Marvel's The Avengers (classified under the name Marvel Avengers\n Assemble in the United Kingdom and Ireland), or simply The Avengers, is\n a 2012 American superhero film based on the Marvel Comics superhero team\n of the same name.","poster":"https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg","trailer":"https://www.youtube.com/embed/eOrNdBpGMv8", "language": "english"},{"id":"104","name":"Interstellar","poster":"https://m.media-amazon.com/images/I/A1JVqNMI7UL._SL1500_.jpg","rating":8.6,"summary":"When Earth becomes uninhabitable in the future, a farmer and ex-NASA\n pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team\n of researchers, to find a new planet for humans.","trailer":"https://www.youtube.com/embed/zSWdZVtXT7E", "language": "english"},{"id":"105","name":"Baahubali","poster":"https://flxt.tmsimg.com/assets/p11546593_p_v10_af.jpg","rating":8,"summary":"In the kingdom of Mahishmati, Shivudu falls in love with a young warrior woman. While trying to woo her, he learns about the conflict-ridden past of his family and his true legacy.","trailer":"https://www.youtube.com/embed/sOEg_YZQsTI", "language": "telugu"},{"id":"106","name":"Ratatouille","poster":"https://resizing.flixster.com/gL_JpWcD7sNHNYSwI1ff069Yyug=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzLzc4ZmJhZjZiLTEzNWMtNDIwOC1hYzU1LTgwZjE3ZjQzNTdiNy5qcGc=","rating":8,"summary":"Remy, a rat, aspires to become a renowned French chef. However, he fails to realise that people despise rodents and will never enjoy a meal cooked by him.","trailer":"https://www.youtube.com/embed/NgsQ8mVkN8w","language": "english" }];



async function CreateConnection(){
  const client =  new MongoClient(process.env.MONGO_URL);
  await client.connect();
  console.log("mongo is connected");
  return client
}
const client = await CreateConnection()

//Middleware

app.use(express.json());


app.get('/', function (request, response) {
  response.send('Hello Worlddd')
})




//to get the movies data using localStorage

// app.get('/movies', function (request, response) {
//   response.send(movies) //'response.send()' method is used to send the 'movies' data back to the client as the response.
// })


//query for movies using rating from online 
app.get('/movies', async function (request, response) {
  // const { rating } = request.query;

  console.log(request.query);

  const filter=request.query;

  if (filter.rating){

    filter.rating= +filter.rating;
  }

  const allMovies = await client.db("movies").collection("movies").find(filter).toArray();

  response.send(allMovies);
//   if (rating){
//     response.send( movies.filter((mv) => mv.rating == rating)) ;
//   }
//  else{
//   response.send(movies)
//  }
 
// rating ? response.send(movies.find((mv)=> mv.rating == rating)):response.status.send(movies)

});

// using get for given id using local storage

// app.get('/movies/:id', function (request, response) {
//   const{ id }  = request.params;//request.params is a tool that simplifies the process of extracting and working with parameters from HTTP requests in your code. //The 'request' parameter represents the incoming HTTP request made by the client.
//    console.log(id,"id");

//   // const movie =  movies.filter((mv) => mv.id === id ); the find method is used instead of filter since we want to find a single movie with a matching id.

//   const movie =  movies.find((mv) => mv.id === id );

//   if (movie){

//     response.send(movie)
//   }
//   else {
//     response.status(404).send({msg : "No Such Movie Found"});
//   }
//   // movie ?  response.send(movie) : response.status(404).send({msg : "No Such Movie Found"});

//  console.log(request.params);
// })

//find data from online storage

app.get('/movies/:id', async function (request, response) {
   const{ id }  = request.params;

   const movies= await client.db("movies").collection ("movies").findOne({id : id});

   movies ?  response.send(movies) : response.status(404).send({msg : "No Such Movie Found"});

})

//post data from online storage

app.post("/movies",async function (request,response) {
  const addmovie = request.body;
  console.log(addmovie);

  const result = await client.db("movies").collection("movies").insertMany(addmovie);
  response.send(result);
})
// delete data from online storage

app.delete('/movies/:id', async function (request, response) {
  const { id }  = request.params;
  
  const movieResult = await client.db("movies").collection("movies").deleteOne({id : id})
  
  movieResult ?  response.send(movieResult) : response.status(404).send({msg : "No Such Movie Found"});

  // console.log(request.params);
})

//update data from online storage

app.put('/movies/:id', async function (request, response) {
  const{ id }  = request.params;
  const updateData = request.body

  
const result  = await client.db("movies").collection("movies").updateOne({id : id}, {$set:updateData})
  response.send(result);

})


app.listen(PORT,()=>console.log(` Listening on the ${PORT}`));

// app.listen(4000,() => console.log(` Listening on the ${PORT}`));


 