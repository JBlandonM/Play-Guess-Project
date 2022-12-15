const { requestLocalData } = require("../src/local-data");
const express = require("express");
const router = express.Router();
const path = require('path');

/* GET home page. */
router.get("/", (req, res) => {
  res.render("welcome", { option: "Express" });
});
router.get("/play", async (req, res) => {
  try {
    res.render("index", { option: "Express" });
  } catch (error) {
    console.log(error);
  }
});
router.get("/character", (req, res) => {
  try {
    res.json("../public/character/characters.json");
  } catch (error) {
    console.log(error);
  }
  console.log();
});


router.post("/send", (request, res) => {
  try {
    let answers = request.body;
    let correct = answers.charDisplayed === answers.optionSelected;
    res.status(200).json({
      message: "answers received successfully",
      body: {
        charDisplayed: answers.charDisplayed,
        optionSelected: answers.optionSelected,
        correct: correct,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Answers not received",
      body: {},
    });
  }
});

module.exports = router;
