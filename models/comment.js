var mongoose = require("mongoose");
//Comment Schema
var commentSchema = mongoose.Schema({
    text: String,
    author: String
});

module.exports = mongoose.model("Comment", commentSchema);