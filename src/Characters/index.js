const express = require("express");
const { CharAPI } = require("./controller");

const router = express.Router();

module.exports.CharactersAPI = (app) => {
  router.get("/", CharAPI.getCharacters);
  app.use("/char", router);
};
