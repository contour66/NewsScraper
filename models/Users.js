var mongoose = require("mongoose");
// var mongojs = require("mongojs");
// var databaseUrl="comments"
// var collections=["commentsData"];
// var db =mongojs(databaseUrl, collections);

var Schema = mongoose.Schema;

var UserSchema = new Schema ({
	
	comment: String,
	article:[{
		type:mongoose.Schema.Types.ObjectId,
		ref: "Article"
	}]
});

var User = mongoose.model("User", UserSchema);

module.exports = User;