const { CharServices } = require("./services");
const debug = require("debug")("app:Characters:Controller");
const createError = require("http-errors");

module.exports.CharAPI = {
  getCharacters: async (req, res) => {
    try {
      const dataArray = await CharServices.getAll();
      // console.log(dataArray);
      if (!dataArray) {
        res.send(new createError.NotFound());
        debug("Error getting all data.");
      }
      res.json(dataArray);
      debug("data sended");
    } catch (error) {
      debug(error);
    }
  },
  addCharacters: async (req, res) => {
    try {
      let newData = req.body;
      const result = await CharServices.addChar(newData);
      debug(result);
      res.redirect("back");
      // res.send({
      //   message: "Received OK",
      //   body: newData,
      // });
    } catch (error) {
      console.log(error);
      res.send("Error receiving the data");
    }
  },
};
