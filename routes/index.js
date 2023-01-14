const express = require("express");
const { CURSOR_FLAGS } = require("mongodb");
const router = express.Router();

/* GET home page. */
// router.get("/",(req,res)=>{
//   try {
//     res.redirect("/game")
//   } catch (error) {
//     console.log(error);
//   }
// })
router.get("/", (req, res) => {
  res.render("./pages/welcome.ejs", { title: "Welcome|PlayGuess" });
});

router.get("/game", async (req, res) => {
  try {
    // res.render("./pages/category");
    res.render("./pages/index", { title: "Play" });
  } catch (error) {
    console.log(error);
  }
});
router.get("/game/*", async (req, res) => {
  try {
    res.redirect("/game")
  } catch (error) {
    console.log(error);
  }
});



// send help page view
router.get("/Help", (req, res) => {
  try {
    res.send({
      message: "request received, building view...",
    });
  } catch (error) {}
});

// to add new data
// router.get("", (req, res) => {
//   res.render("./pages/form", { title: "AddChar" });
// });
module.exports = router;
