const { DataBase } = require("../database");
const COLLECTION = "Characters";
const getAll = async () => {
  const data = await DataBase(COLLECTION);
  return await data.find({}).toArray();
};

module.exports.CharServices = {
  getAll,
};
