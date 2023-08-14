import express from "express";
import { createUser, genPassword, getUserByName, verifyPassword } from "./helper.js";



const router= express.Router();


 //new user login function
 
 router.post("/signup",async function (request,response) {
   const {username,password} = request.body;
   
   const hashPassword= await genPassword(password)

   const isUserExist = await getUserByName(username )
   console.log(isUserExist);

   if (isUserExist){
    response.send({message : "User already exists"});
   }else if(password.length<7){
    response.send({message : "Password  is too short"});
   }   else{
    const newUser= {username:username,password:hashPassword}
    const result = await createUser(newUser);
    
    response.send(result);
   }

   
 })
 
 ///signup 


router.post("/login",async function (request,response) {
   const {username,password} = request.body;

const userFromDB= await getUserByName(username);
console.log(userFromDB);

if(!userFromDB){

    response.send({message: "invalid credentials"});
}
else{
    const storePassword = userFromDB.password;
    const isPasswordMatch = await verifyPassword(password, storePassword);

    if(isPasswordMatch){
        response.send({message: "logged in successfully"});
    }
    else{
        response.send({message: "invalid credentials"});
    }
}

});


export const usersRouter = router;