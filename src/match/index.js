const express = require("express");
const router = express.Router();
const { matchController } = require("./controller");

module.exports.MatchAPI = (app) => {
  router
    .get("/point/:pts", matchController.finalView)
    .get("/startView", matchController.startView);
  app.use("/match", router);
};
