const debug = require("debug")("app:Module-DataBase");
const { MongoClient } = require("mongodb");
const { Config } = require("../config/index");

let connection = null;
module.exports.DataBase = async (collection) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!connection) {
        const client = await new MongoClient(Config.mongoUri);
        connection = await client.connect();
        debug(connection);
        debug("New Database Connection Established");
      }
      const db = await connection.db(Config.mongoDBname);
      debug("Connection Already Exist");
      resolve(db.collection(collection));
    } catch (error) {
      debug(error);
      reject(error);
    }
  });
