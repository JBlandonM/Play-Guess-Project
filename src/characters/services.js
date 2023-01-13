const { Schema, default: mongoose, mongo } = require("mongoose");
const { Database } = require("../database/main");
// const COLLECTION = "pixars";
const COLLECTION = "Disney";
// const COLLECTION = "cartoon networks";
const getAll = async () => {
  // get match (collection==match)
  const result = await Database.connectMongoose(COLLECTION);
  return await result.find({}).toArray();
};
// schema for characters
const charSchema = new Schema({
  name: String,
  imageUrl: String,
  MOO: String,
});
const Chars = mongoose.model(COLLECTION, charSchema, COLLECTION);
// to add new data on given collection with above schema
const addChar = async (newData) => {
  const charData = await Database.connectMongoose(COLLECTION);
  const newOne = new Chars({
    name: newData.name,
    imageUrl: newData.imageUrl,
    MOO: newData.MOO,
  });
  const result = await newOne.save();
  return result;
};
const getCollection = async (COLLECTION) => {
  let charCollection = await Database.connectMongoose(COLLECTION);
  return await charCollection.find({}).toArray();
};

module.exports.CharServices = {
  getAll,
  addChar,
  getCollection,
};
