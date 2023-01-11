const express = require("express");
const { CURSOR_FLAGS } = require("mongodb");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.render("./pages/welcome.ejs", { title: "Welcome|PlayGuess" });
});
router.get("/play", async (req, res) => {
  try {
    // res.render("./pages/category");
    res.render("./pages/index", { title: "Play" });
  } catch (error) {
    console.log(error);
  }
});

// to add new data
router.get("/add", (req, res) => {
  res.render("./pages/form", { title: "AddChar" });
});

// send help page view
router.get("/Help", (req, res) => {
  try {
    res.send({
      message: "request received, building view...",
    });
  } catch (error) {}
});
module.exports = router;
