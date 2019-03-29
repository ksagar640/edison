var mongoose  = require("mongoose");

var UserSchema=new mongoose.Schema({
									Id 				: String,
									Name 			: String,
									Address 		: String,
									Phone 			: Number,
									Adhar_id		: Number,
									Pan_id			: String
								  });
module.export =mongoose.model("user",UserSchema);