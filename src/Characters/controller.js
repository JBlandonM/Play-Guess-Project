const { CharServices } = require("./services");
const debug = require("debug")("app:Characters:Controller");
const createError = require("http-errors");

module.exports.CharAPI = {
  getCharacters: async (req, res) => {
    try {
      const dataArray = await CharServices.getAll("Characters");
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
};
