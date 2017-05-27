var mongoose = require ("mongoose");
// var mongojs = require("mongojs");
// var databaseUrl = "scraper";
// var collections = ["scrapedData"];
// var db = mongojs(databaseUrl, collections);

var Schema = mongoose.Schema;

var ArticleSchema = new Schema ({
	title: String,
	link: String,
	// domain: String,
	// unique: true,
	// comments: [{
	// 	type:Schema.Types.ObjectId,
	// 	ref: "Comment"
	// }]
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports =  Article;