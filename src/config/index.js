const PORT = 3000;
require("dotenv").config();
module.exports.Config = {
  mongoUri: process.env.MONGO_URI,
  mongoDBname: process.env.MONGO_DBNAME,
  port: process.env.PORT || PORT 
};
