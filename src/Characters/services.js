const { Schema, default: mongoose } = require("mongoose");
const { Database } = require("../database/main");

const COLLECTION = "chars";
const getAll = async () => {
  const result = await Database.connectMongoose(COLLECTION);
  return await result.find({}).toArray();
};
// schema for characters
const charSchema = new Schema({
  name: String,
  imageUrl:String,
  MOO: String,
});
const Chars= mongoose.model("Chars", charSchema); 
// to add new data on given collection with above schema
const addChar = async(newData)=>{
  const charData = await Database.connectMongoose(COLLECTION);
  const newOne = new Chars({
    name:newData.name,
    imageUrl:newData.imageUrl,
    MOO:newData.MOO,
  })
  const result = await newOne.save();
  return result;
};

module.exports.CharServices = {
  getAll,
  addChar,
};
