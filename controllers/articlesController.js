var express = require("express");
var router = express.Router();

var Article = require("../models/Articles.js");

router.get("/", function(req,res){
	Article.all(function(data){
		var hbsObject = {
			article:data
		};
		console.log(hbsObject);
		res.render('index', hbsObject);
	});
});

module.exports = router;