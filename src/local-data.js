const express = require("express");
const { appendFile } = require("fs");
const path = require("path");

const router = express.Router();
// router to server the characters file
module.exports.DataAPI = (app) => {
  router.get("/", (req, res) => {
    try {
      res.status(200).sendFile(path.join(__dirname + "/characters.json"));
      console.log("Data sended OK");
    } catch (error) {
      res.json({
        message: "Error sending data"
      })
      console.log(error);
    }
  });
  app.use("/char", router);
};
