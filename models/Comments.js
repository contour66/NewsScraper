var mongoose = require("mongoose");
// var mongojs = require("mongojs");
// var databaseUrl="comments"
// var collections=["commentsData"];
// var db =mongojs(databaseUrl, collections);

var Schema = mongoose.Schema;

var CommentSchema = new Schema ({
	comment: String,
	article:{
		type:mongoose.Schema.Types.ObjectId,
		ref: "Article"
	}
});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;