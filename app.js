var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// import main routes
var indexRouter = require("./routes/index");
// import data routes
const { CharactersAPI } = require("./src/characters/index");
// import users routes
const {UsersAPI}= require('./src/users/index');
// import in match routes
const {MatchAPI} = require('./src/match');
// import the env variables
const { Config } = require("./src/config/index");
// import Database Mongo
var app = express();

// views engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(__dirname, "publicTwo")));

app.use("/", indexRouter);
// module
// DataAPI(app);
CharactersAPI(app);
UsersAPI(app);
MatchAPI(app);

// catch 404 and forward to error handler
// error handler
app.listen(Config.port, () => {
  console.log(`Listening on http://localhost:${Config.port}/`);
});
