const e = require('express');
const express = require('express');

const router = express.Router();

module.exports.UsersAPI = (app)=>{
  router.get("/signUp", (req,res)=>{
    try {
      res.render("./pages/signUp.ejs")
    } catch (error) {
      
    }
  });
  router.post("/register", (req,res)=>{
    try {
      let {body}= req;
      res.send({
        message: "New User Received",
        body: body
      })
    } catch (error) {
      console.log(error);
      
    }
  });
  // above is send the form, and then we receive it data.

  router.get("/SignIn", (req,res)=>{
    try {
      res.render("./pages/signIn");
      // res.send({
      //   message: "request received, building view sign..."
      // })
    } catch (error) {
      
    }
  });
  router.post("/login", (req,res)=>{
    try {
      let {body}= req;
      res.send({
        message: "Data to LogIn received",
        body: body
      })
    } catch (error) {
      console.log(error);      
    }

  });
  
  app.use("/", router);
} 