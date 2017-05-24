var express = require("express");
var router = express.Router();
var cheerio = require ("cheerio");
var Article = require("../models/Articles.js");
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
	// console.log("This element " + element);
	if (title && link){
		var articleObj = new Article({
			title: title,
			link: link
		});
		articleObj.save(function(err, doc){
			if (error){
	   			console.log(error);
	  		}
	  		else {
	   			console.log("Document added: " + doc );
	  		}
		 
		});	 
		// res.send(doc);
	}
  });
 });
});

router.get("/home", function (req,res) {
	Article.find({}, function (error, doc) {
		if (error) {
			res.send(error);
		}
		else {
			// res.send(doc);
			var artObj = {
				data: doc
			};
			console.log("no error" + artObj);
			res.render("index", artObj);
		}
	});
});

// router.get("articles/comments", function (req,res) {
// 	Comment.find({}, function (err, data){
// 		if (error) {
// 			res.send(error);
// 		}
// 		else {
// 			res.send(data);
// 		}
// 	});
// })

module.exports = router;