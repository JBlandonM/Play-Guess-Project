const express = require('express');
const router= express.Router();
const {matchController}=require('./controller');

module.exports.MatchAPI = (app)=>{
  router.post("/send", matchController.checkSelected)
  .get("/point/:pts", matchController.finalView)
  
  app.use("/match", router);
};

