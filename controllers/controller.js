var express = require("express");
var router = express.Router();
var cheerio = require ("cheerio");
var Article = require("../models/Articles.js");
var Comments = require("../models/Comments.js");
var request = require("request");

router.get("/", function (req,res){
	res.redirect("/scrape");
})

router.get("/scrape", function(req,res) {
 request("https://www.reddit.com/r/worldnews/", function(error, response, html){
  var $ = cheerio.load(html);
  $(".title").each(function(i,element){
	var title = $(this).children("a").text();
	var link = $(this).children("a").attr("href");
	// var domain = $(this).children("span").children("domain").children("a").text();
	// console.log("This element " + domain);
	if (title && link ){
		Article.count({ link: link}, function(err, count){
			if (count === 0) {
				var articleObj = new Article({
					title: title,
					link: link,
					// domain: domain
				});
			
			articleObj.save(function(err, doc){
				if (error){
		   			console.log(error);
		  		}
		  		else {
		   			console.log("Document added: " + doc );
		  		}
			 });
			}
			else { console.log("Already added!")}
		  	
		}); 
		
	}
  });
    res.redirect("article");
 });
});

router.get("/article", function (req,res) {
	Article.find({}, function (error, doc) {
		if (error) {
			res.send(error);
		}
		else {
			// res.send(doc);
			var artObj = {
				data: doc
			};
			console.log("no error");
			res.render("index", artObj);
		}
	});
});


// router.post("add/comments/:id", function (req, res){
// 	var articleId = req.params.id;
// 	var commentObj = {
// 		comment: req.body.comment,
// 		article: req.params.id,
// 	};
// 	var comment = new Comment (commentObj);
// 	if(req.body.comment && req.params.id){
// 		comment.save(function (err, doc){
// 			if (error){
// 				res.send(error);
// 			}
// 			else{
// 				Article.findOneAndUpdate(
// 					{'id': articleId}, 
// 					{$push: {"comments": doc.id}}, 
// 					{new: true}, 
// 					function(err, comment){
// 						if (err){
// 							res.send(err);
// 						}
// 						else{
// 							console.log("New comment: ");				
// 							console.log(comment);
// 							res.json(comment);
// 						}
// 					});
				
// 			};
// 		});
// 	};
// 	// res.redirect("/");
// });


// Grab an article by it's ObjectId
router.get("/article/:id", function(req, res) {
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

router.post("/article/:id", function(req, res) {
  // Create a new note and pass the req.body to the entry
  // var newComment = new Comment(req.body);
  // // And save the new note the db
  // newComment.save(function(error, doc) {
    // Log any errors

    var newComment = {
      article: req.params.id,
      comment: req.body
  };
  Comment.create(newComment, function(err, doc) {
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


	//post user comment to new document
	//push comment id into article collection
	//display comment

// })
// router.get("articles/comments", function (req,res) {
// 	Comment.find({}, function (err, data){
// 		if (error) {
// 			res.send(error);
// 		}
// 		else {
// 			res.send(data);
// 		}
// 	});
// });

module.exports = router;