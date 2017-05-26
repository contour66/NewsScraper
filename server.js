 //URI: mongodb://heroku_7ph4zqlc:plcdepbl2ogi34beo5lrmktptu@ds149501.mlab.com:49501/heroku_7ph4zqlc

var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require ("mongoose");
var exphbs = require("express-handlebars");
var request = require("request");
var Promise = require("bluebird");
var Comment = require("./models/Comments.js");
var Article = require("./models/Articles.js");
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

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use("/", routes);
app.listen(PORT, function(){
	console.log("App running on port 3000!");
});



// Grab an article by it's ObjectId
app.get("/articles/:id", function(req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  Article.findOne({ "_id": req.params.id })
  // ..and populate all of the notes associated with it
  .populate("comment")
  // now, execute our query
  .exec(function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Otherwise, send the doc to the browser as a json object
    else {
      res.json(doc);
    }
  });
});

app.post("/home/:id", function(req, res) {
  // Create a new note and pass the req.body to the entry
  var newComment = new Comment(req.body);
  // And save the new note the db
  newComment.save(function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Otherwise
    else {
      // Use the article id to find and update it's note
      Article.findOneAndUpdate({ "_id": req.params.id }, { "comment": doc._id })
      // Execute the above query
      .exec(function(err, doc) {
        // Log any errors
        if (err) {
          console.log(err);
        }
        else {
          // Or send the document to the browser
          console.log(doc);
        }
      });
    }
  });
});

