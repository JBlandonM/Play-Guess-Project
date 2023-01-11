const debug = require("debug")("app:Match-Controller");

const checkSelected = async (request, res) => {
  try {
    var { scores, correctAns, wrongAnswers, charDisplayed, optionSelected } =
      request.body;
    let correct = charDisplayed === optionSelected;
    let matched = scores.length === correctAns + wrongAnswers;

    console.log("Matched:", matched);
    res.status(200).json({
      message: "answers received successfully",
      body: {
        wrongAnswers: wrongAnswers,
        correctAns: correctAns,
        correct: correct,
        scores: scores,
      },
    });
  } catch (error) {
    debug(error);
    res.json({
      message: "Answers not received",
      body: {},
    });
  }
};
const startView = (req, res) => {
  try {
    console.log(req.params.category);
    res.render("./partials/matchStart");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const finalView = (req, res) => {
  try {
    pts = req.params.pts;
    console.log(pts);
    res.render("./partials/matchEnd.ejs", { pts: `${pts}` });
  } catch (error) {
    debug("MatchPoint:", error);
  }
};

module.exports.matchController = {
  checkSelected,
  finalView,
  startView,
};
