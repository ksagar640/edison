var argv = require('minimist')(process.argv.slice(1));
console.dir(argv);
var app=require('express')();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Database');
var UserSchema=new mongoose.Schema({
									Id 				: String,
									Name 			: String,
									Address 		: String,
									Phone 			: Number,
									Adhar_id		: Number,
									Pan_id			: String,
									Battery_Id 		: String,
									Balance 		: Number
								  });
var User = mongoose.model("User",UserSchema);
var methodOverride = require("method-override");
app.use(methodOverride("_method"));
var user_id_provided=argv.a;
console.log(user_id_provided);
// User.find({ID:user_id_provided},function(err,user){
// 		if (err)
// 			console.log(err);
// 		else
// 			{
// 				console.log(user);
// 				console.log("Current Battery Id is - >");
// 				console.log(user.Battery_Id);
// 				console.log("New Battery Id being allocated is -> ");
// 				console.log(argv[1]);
				User.updateOne({ Id : user_id_provided }, {$set: { "Battery_Id": "1" }})
			.then(function(result) {
			  	if (result)
			  		console.log(result);
				})

				User.find({ Id : user_id_provided } , function(err,updated_user){
						if (err)
							console.log(err);
						else
							console.log(updated_user);
				})
// 			}
// });
