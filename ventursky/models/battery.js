var mongoose  = require("mongoose");
const user 	  = require("./user.js");
var BatterySchema=new mongoose.Schema({
										Battery_Id 		: String,
										status			: Number,
									  	user            : [user]
								  });
module.export = mongoose.model("battery",BatterySchema);