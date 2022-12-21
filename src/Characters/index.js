const express = require("express");
const { CharAPI } = require("./controller");

const router = express.Router();

module.exports.CharactersAPI = (app) => {
  router.get("/", CharAPI.getCharacters);
  router.post("/addOne", CharAPI.addCharacters)
  app.use("/char", router);
};
