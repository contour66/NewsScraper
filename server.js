 //URI: mongodb://heroku_7ph4zqlc:plcdepbl2ogi34beo5lrmktptu@ds149501.mlab.com:49501/heroku_7ph4zqlc

var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require ("mongoose");
var cheerio = require ("cheerio");
var exphbs = require("express-handlebars");
// var mongojs = require("mongojs");
var request = require("request");
var Article = require("./models/Articles.js");



var Promise = require("bluebird");
mongoose.Promise = Promise;

var app = express();
var routes = require ("./controllers/articlesController.js");


app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
var port = 3000;

mongoose.connect('mongodb://localhost/myapp');
var db = mongoose.connection;

db.on("error", function(error){
	console.log("Mongoose Error: ", error);
});

db.once("open", function() {
	console.log("Mongoose connection succesful.");
});



app.use("/", routes);
app.listen(3000, function(){
	console.log("App running on port 3000!");
});

