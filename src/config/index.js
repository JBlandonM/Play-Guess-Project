const PORT = 3000;
require("dotenv").config();
module.exports.Config = {
  mongoUri: process.env.MONGO_URI,
  mongoDBname: process.env.MONGO_DBNAME,
  port: process.env.PORT || PORT 
};

module.exports.MONGO_URI = process.env.MONGO_URI
module.exports.MONGO_DBNAME= process.env.MONGO_DBNAME
// export const PORT= process.env.PORT || PORT 
