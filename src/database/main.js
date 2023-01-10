const { Schema, default: mongoose } = require("mongoose");
const debug = require("debug")("appModule-MongooseConnection");
const { Config } = require("../config");
const dataBase = Config.mongoUri;
var connection = null;
const connectMongoose = async (COLLECTION) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!connection) {
        mongoose.set("strictQuery", false);
        await mongoose.connect(dataBase, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          dbName: Config.mongoDBname,
        });
        // get the connection object to operate the results
        connection = await mongoose.connection;
        connection.on("error", console.error.bind(console, "Error connecting"));
        connection.on("open", async () => {
          debug("DB connected Successfully");
        });
      }
      debug("Connection Already exist");
      resolve(await connection.collection(COLLECTION));
    } catch (error) {
      reject(error);
      debug(error);
    }
  });
module.exports.Database = {
  connectMongoose,
};
