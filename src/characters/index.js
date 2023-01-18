const express = require("express");
const { CharAPI } = require("./controller");

const router = express.Router();

module.exports.CharactersAPI = (app) => {
  router.get("/", CharAPI.getCharacters);
  router.post("/addOne", CharAPI.addCharacters);
  router.get("/:category", CharAPI.getCharCollection);
  app.use("/char", router);
};
