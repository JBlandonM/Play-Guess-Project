const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.render("./pages/welcome.ejs", { title: "Welcome|PlayGuess"});
});
router.get("/play", async (req, res) => {
  try {
    res.render("./pages/index", { title: "PlayGuess" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/Help", (req,res)=>{
  try {
    res.send({
      message: "request received, building view..."
    })
  } catch (error) {
    
  }
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
// to add new data
router.get("/add",(req,res)=>{
  res.render("./pages/form");
});
module.exports = router;
