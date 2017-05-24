 //URI: mongodb://heroku_7ph4zqlc:plcdepbl2ogi34beo5lrmktptu@ds149501.mlab.com:49501/heroku_7ph4zqlc

var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require ("mongoose");
var exphbs = require("express-handlebars");
var request = require("request");
var Promise = require("bluebird");
mongoose.Promise = Promise;

var app = express();
var routes = require ("./controllers/controller.js");


app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
var PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/myapp');
var db = mongoose.connection;

db.on("error", function(error){
	console.log("Mongoose Error: ", error);
});

db.once("open", function() {
	console.log("Mongoose connection succesful.");
});


app.use(bodyParser.urlencoded({ extended: false}));
app.use("/", routes);
app.listen(PORT, function(){
	console.log("App running on port 3000!");
});

