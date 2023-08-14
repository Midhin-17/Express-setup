import express from "express";
import { genPassword } from "./helper.js";



const router= express.Router();


 //post data from online storage
 
 router.post("/signup",async function (request,response) {
   const {username,password} = request.body;
   console.log(username);
   const hashPassword= await genPassword(password)
   
   response.send(hashPassword);
 })
 
 







export const usersRouter = router;