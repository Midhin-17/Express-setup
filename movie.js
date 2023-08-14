import express from "express";

import { getAllMovies, getMoviesById, postMovies, deleteMovies, updateMovies } from "./helper.js";

const router= express.Router();

//query for movies using rating from online 
router.get('/', async function (request, response) {
    // const { rating } = request.query;
  
    console.log(request.query);
  
    const filter=request.query;
  
    if (filter.rating){
  
      filter.rating= +filter.rating;
    }
  
    const allMovies = await getAllMovies(filter);
  
    response.send(allMovies);
  //   if (rating){
  //     response.send( movies.filter((mv) => mv.rating == rating)) ;
  //   }
  //  else{
  //   response.send(movies)
  //  }
   
  // rating ? response.send(movies.find((mv)=> mv.rating == rating)):response.status.send(movies)
  
  });

  //find data from online storage

router.get('/:id', async function (request, response) {
    const{ id }  = request.params;
 
    const movies= await getMoviesById(id);
 
    movies ?  response.send(movies) : response.status(404).send({msg : "No Such Movie Found"});
 
 })
 
 //post data from online storage
 
 router.post("/",async function (request,response) {
   const addmovie = request.body;
   console.log(addmovie);
 
   const result = await postMovies(addmovie);
   response.send(result);
 })
 // delete data from online storage
 
 router.delete('/:id', async function (request, response) {
   const { id }  = request.params;
   
   const movieResult = await deleteMovies(id)
   
   movieResult ?  response.send(movieResult) : response.status(404).send({msg : "No Such Movie Found"});
 
   // console.log(request.params);
 })
 
 //update data from online storage
 
 router.put('/:id', async function (request, response) {
   const{ id }  = request.params;
   const updateData = request.body
 
   
 const result  = await updateMovies(id, updateData)
   response.send(result);
 
 })









export const movieRouter = router;