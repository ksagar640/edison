var  express 			=  require("express"),
	 bodyParser  		=  require("body-parser"),
	 mongoose 			=  require('mongoose');

//const  Battery 			=  require("./models/battery");	 
//const  user				=  require("./models/user");
var app = express();
mongoose.connect('mongodb://localhost/v1DataBase');

var UserSchema=new mongoose.Schema({
									Id 				: String,
									Name 			: String,
									Address 		: String,
									Phone 			: Number,
									Adhar_id		: Number,
									Pan_id			: String
								  });

var BatterySchema=new mongoose.Schema({
										Battery_Id 		:   {
															type    : String,
															required:true,
															unique  :true
															},
										status			: Number,
									  	user            : [UserSchema]
								  });
const user = mongoose.model("user",UserSchema);
const battery = mongoose.model("battery",BatterySchema);


app.use(bodyParser.urlencoded({extended: true}));
//var methodOverride = require("method-override");
//app.use(methodOverride("_method"));

//ROUTES =============//
app.get("/",function(req,res){
	res.render("form.ejs");
});


app.get("/find/:batteryid" , function(req,res){
	var i = req.params.batteryid;
	battery.findOne({"Battery_Id": i},function(err,valid_user){
			if (err)
				console.log("Error");
			else
				res.send(valid_user);
	});
});
app.get('/update/:rfid/:batteryid',function(req,res){
	var rid   = req.params.rfid;
	var battid = req.params.batteryid;
	var freebattery=new battery();
	freebattery.status =1;
	battery.findOne({"Battery_Id": battid},function(err,currbatt){
		if (err)
			{
				console.log("Error 1");
				res.statusCode =0;
			}
		else
		{
			 console.log(currbatt);
			freebattery.user = currbatt.user;
			currbatt.remove({},function(err){
				if (err)
				{
					console.log(err);
					res.statusCode=0;
				}
				else{
		battery.findOne({"status" : 2},function(err,newUser){
		if (err)
			{
				console.log("Error 2");
				res.statusCode =0;
			}
		else
		{
			freebattery.Battery_Id=newUser.Battery_Id;
			newUser.remove();
		}
			});
			freebattery.save(function(err,value){
				if (err)
					{
						console.log("Error 3");
						//res.statusCode=0;
					}
				else
					console.log(value);
				
					});
			var newBattery = new battery();
			newBattery.Battery_Id=battid;
			newBattery.user = undefined;
			newBattery.status = 0;			//in charging
			newBattery.save(function(err,value){
				if (err)
					{
						console.log("Error 4");
						//res.statusCode=0;
					}
				else
					console.log(value);
			});



				}
			});
		}
	});
	

	
	res.statusCode=freebattery.Battery_Id;
	res.redirect("/");
});



app.post("/form_submit",function(req,res){
var user_id         = req.body.user_id;
var user_name       = req.body.user_name;
var user_address    = req.body.user_address;
var user_phone      = req.body.user_phone;
var user_adharId    = req.body.user_adharId;
var user_panId      = req.body.user_panId;
var user_battery_id = req.body.user_battery_id;
var newBatteryUser    = new battery({
												Battery_Id 		:   user_battery_id,
												status 			:   1,
									            user :{
													Id 				: user_id,
													Name 			: user_name,
													Address 		: user_address,
													Phone 			: user_phone,
													Adhar_id 		: user_adharId,
													Pan_id 			: user_panId
													}					
						});
	newBatteryUser.save(function(err,value){
										if (err)
											console.log(err);
										else
											{
												console.log (value);
												res.redirect('/');
											}
	 								});
});


app.post("/battery_form_submit",function(req,res){
	var id = req.body.new_battery_id;
	var newBattery = new battery({
									Battery_Id : id,
									status	   : 2,
									user       :undefined
								});
	newBattery.save(function(err,value){
		if (err)
			console.log(err);
		else
		{
			console.log(value);
			res.redirect("/");
		}
	});
});


app.listen(4040,function(){
	console.log("Server Started");
});



/*
app.get("/checkUser/:rfid/:batteryid",function(req,res){
				var checkId = req.param.batteryid;
				battery.find({ Battery_Id : checkId } , function(err,valid_user){
						if (err)
							console.log(err);
						else
							{
								
								console.log(valid_user);
							}
				});
});
*/
	// battery.updateOne({"status" : 2},{$set: {"status" : 1}}).then(function(err,value){
	// 	if (err)
	// 		console.log(err);
	// 	else
	// 	{
	// 		 freebattery.value=JSON.parse(value);
	// 	}
	// });
	// console.log(freebattery);

/*
app.get('/charged/:rfid',function(req,res){
	var rfid = req.params.rfid;
	User.updateOne({Id : rfid},{$set: {"isAvailable" : true}}).then(function(result){
		if (result)
		{
			console.log(result);
			console.log("Battery is Available");			
		}
	});
});
*/