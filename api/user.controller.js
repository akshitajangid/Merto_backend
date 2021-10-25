var express = require('express');
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./public/images/uploads");
    },
    filename: function(req, file, callback) {
        callback(null, Math.floor(1000 + Math.random() * 9000) + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({storage: Storage}).array("image", 3); 
const pool =require('../config/db');
const {
	signupService,
	getUser,
	checkEmail,
	checkSocial,
	createSocial,
	favTeamService,
	checkFavService,
	removeFavTeamService,
	favLeaguesService,
	checkFavLeaguesService,
	removeFavLeaguesService,
	favCompetitionService,
	checkFavCompetitionService,
	removeFavCompetitionService,
	followTeamService,
	checkFollowTeamService,
	removeFollowTeamService,
	insertTeamDataService,
	insertPlayerService,
	teamsService,
	playerService,
	getUserFavTeamService,
	getteamImageService,
	getplayerimageService,
	profileUpdateService,
	updateMatchSettingService,
	appContentService,
	getFaqService,
	sendContactService,
	matchPasswordService,
	updatePasswordService,
	getMatchSettingService,
	getNotificationService,
	updateNotificationSettingService,
	updateLanguageService,
	getUserListService,
	getUsertotalListService,
	sendMessageService,
	viewMessageService,
	getUserChatListService,
	deleteChatService,
	updateDeviceTokenService,
	getUserByIdService,
	totalViewMessageService,
	getTotalUserChatListService,
	addBetService,
	homedataServive,
	totalBetService,
	forgetPasswordService,
	totalteamsService,
	leagueService,
	totalleagueService
}=require("./user.service");

const {
	storeLiveDataService,
	getMatchService,
	getTotalMatchService,
	getcompetitionService,
	getTotalcompetitionService,
	updateMatchDataService,
	matchdetailsDataService,
	gettotalmatchteamservice,
	getmatchteamservice,
	storeleagueService

}=require("./merto.service");
// const { count } = require('node:console');
// const { body,checkSchema, validationResult } = require('express-validator');


module.exports={
	get_token:(req,res)=>{
		if(process.env.API_KEY==req.body.api_key){
			const jsontoken =sign({result:process.env.API_SECRET},req.body.api_key,{
						// expiresIn:"1h"
					});
			return res.status(200).json({
				success:1,
				message:"New Token",
				token:jsontoken,
			});
		}else{
			return res.status(500).json({
				success:0,
				message:"Api key incorrect",
			});
		}	
	},
	signupUserController:(req,res)=>{
		const data=req.body;

		checkEmail(data,(err,users)=>{
			if(err){
				console.log(err);
					return res.status(500).json({
					success:0,
					message:"error connection"	
				});
			}

			if(users){
				return res.status(500).json({
					success:0,
					message:'Email already exist',
				});
			}else{
				signupService(data,(err,results)=>{
					if(err){
						console.log(err);
							return res.status(500).json({
								success:0,
								message:"error connection"	
							});
					}	
						results.login_signup_status='signup';
						return res.status(200).json({
							success:1,
							message:'Your create account successfully!!',
							results:results,
						});
				});
			}
		});	
	},
	userLoginController:(req,res)=>{
		const data=req.body;
		checkEmail(data,(err,results)=>{
			if(err){
				console.log(err);
					return res.status(500).json({
					success:0,
					message:"error connection"	
				});
			}
			if(results){
				
				if(results.password==data.password){
				results.login_signup_status='login';
				return res.status(200).json({
					success:1,
					message:'User login',
					results:results
				});

				}else{
					return res.status(500).json({
					success:0,
					message:"Email or password is invalid"	
					});
				}

			}else{
				console.log(err);
					return res.status(500).json({
					success:0,
					message:"Email not found"	
				});
			}

		});		
	},
	isSocailController:(req,res)=>{
		const data =req.body;
		checkSocial(data,(err,results)=>{
		if(err){
			return res.status(500).json({
				success:0,
				message:"error connection"	
			});
		}
		if(results){
			return res.status(200).json({
				success:1,
				status:1,
			});
		}
		else{
			return res.status(200).json({
				success:1,
				status:0
			});
		}
		});
	},
	userSocialController:(req,res)=>{
		const data =req.body;
		checkSocial(data,(err,results)=>{
			if(err){
				console.log(err);
					return res.status(500).json({
					success:0,
					message:"error connection"	
				});
			}
			if(results){
				results.login_signup_status='login';
				return res.status(200).json({
					success:1,
					message:'User login',
					results:results
				});
			}else{
				createSocial(data,(err,results)=>{
					if(err){
						console.log(err);
							return res.status(500).json({
							success:0,
							message:"error connection"	
						});
					}
					results.login_signup_status='signup';
					return res.status(200).json({
						success:1,
						message:'User login',
						results:results
					});
				});

			}
		})
	},
	favTeamsController:(req,res)=>{
		const data =req.body;
		checkFavService(data,(err,results)=>{
			if(err){
				console.log(err);
					return res.status(500).json({
					success:0,
					message:"error connection"	
				});
			}
			if(results.length==0){
				favTeamService(data,(err,results)=>{
					if(err){
						console.log(err);
							return res.status(500).json({
							success:0,
							message:"error connection"	
						});
					}
					return res.status(200).json({
						success:1,
						message:'Team added to favourite'
					});
				})
			}else{
				removeFavTeamService(data,(err,results)=>{
					if(err){
						console.log(err);
							return res.status(500).json({
							success:0,
							message:"error connection"	
						});
					}
					return res.status(200).json({
						success:1,
						message:'Team removed to favourite'
					});
				})
			}
		});
	},
	favLeaguesController:(req,res)=>{
		const data =req.body;
		checkFavLeaguesService(data,(err,results)=>{
			if(err){
				console.log(err);
					return res.status(500).json({
					success:0,
					message:"error connection"	
				});
			}
			if(results.length==0){
				favLeaguesService(data,(err,results)=>{
					if(err){
						console.log(err);
							return res.status(500).json({
							success:0,
							message:"error connection"	
						});
					}
					return res.status(200).json({
						success:1,
						message:'Added to favourite'
					});
				})
			}else{
				removeFavLeaguesService(data,(err,results)=>{
					if(err){
						console.log(err);
							return res.status(500).json({
							success:0,
							message:"error connection"	
						});
					}
					return res.status(200).json({
						success:1,
						message:'Removed to favourite'
					});
				})
			}
		});
	},
	favCompetitionController:(req,res)=>{
		const data =req.body;
		checkFavCompetitionService(data,(err,results)=>{
			if(err){
				console.log(err);
					return res.status(500).json({
					success:0,
					message:"error connection"	
				});
			}
			if(results.length==0){
				favCompetitionService(data,(err,results)=>{
					if(err){
						console.log(err);
							return res.status(500).json({
							success:0,
							message:"error connection"	
						});
					}
					return res.status(200).json({
						success:1,
						message:'Added to favourite'
					});
				})
			}else{
				removeFavCompetitionService(data,(err,results)=>{
					if(err){
						console.log(err);
							return res.status(500).json({
							success:0,
							message:"error connection"	
						});
					}
					return res.status(200).json({
						success:1,
						message:'Removed to favourite'
					});
				})
			}
		});
	},
	followTeamController:(req,res)=>{
		const data =req.body;
		checkFollowTeamService(data,(err,results)=>{
			if(err){
				//console.log(err);
					return res.status(500).json({
					success:0,
					message:"error connection"	
				});
			}
			if(results.length==0){
				followTeamService(data,(err,results)=>{
					if(err){
						//console.log(err);
							return res.status(500).json({
							success:0,
							message:"error connection"	
						});
					}
					return res.status(200).json({
						success:1,
						message:'Follow team'
					});
				})
			}else{
				removeFollowTeamService(data,(err,results)=>{
					if(err){
						//console.log(err);
							return res.status(500).json({
							success:0,
							message:"error connection"	
						});
					}
					return res.status(200).json({
						success:1,
						message:'Unfollow Team'
					});
				})
			}
		});
	},
	InsertTeams:(req,res)=>{
		var request = require("request");
		var options = { method: 'GET',
		url: 'https://www.goalserve.com/getfeed/69a39912a09b45a2f60e08d8f941eccb/soccerleague/1204',
		qs: { json: '1' },
			headers: 
			{'cache-control': 'no-cache' } };
			request(options, function (error, response, body) {
			if (error) throw new Error(error);
			// console.log(body);
			var dj=JSON.parse(body);
			var teams=dj.league.team;
			var tdata=Object.values(teams[0]);	

			//console.log("name"+tdata[0])
			//console.log("id"+tdata[1])
			var venue=Object.values(tdata[2]);
			//console.log("venue"+venue[0]);
			//console.log("id"+venue[1]);	

			return res.status(200).json({
				success:1,
				message:'Follow team',
				results:teams
			});
		});

	},
	getTeams:(req,res)=>{
		var data = req.body; 
		insertTeamDataService(data,(err,results)=>{
			if(err){
				//console.log(err);
					return res.status(500).json({
					success:0,
					message:"error connection"	
				});
			}

			return res.status(200).json({
				success:1,
				message:'Team Added'
			});
		})		
	},
	insertPlayer:(req,res)=>{
		var data =req.body;
		insertPlayerService(data,(err,results)=>{
			if(err){
				//console.log(err);
					return res.status(500).json({
					success:0,
					message:"error connection"	
				});
			}
			res.status(200).json({
				success:1,
				message:'player Added',
				results:results
			});
		});
	},
	playerController:(req,res)=>{
		var data = req.body;
		playerService(data,(err,results)=>{
				if(err){
					//console.log(err);
						return res.status(500).json({
						success:0,
						message:"error connection"	
					});
				}
				return	res.status(200).json({
					success:1,
					message:'teams',
					results:results
				});
			})

	},
	playerDetails:(req,res)=>{
		var request = require("request");
		var tid=req.body.id;
		var options = { method: 'GET',
		url: 'http://www.goalserve.com/getfeed/69a39912a09b45a2f60e08d8f941eccb/soccerstats/player/'+tid,
		qs: { json: '1' },
		headers: 
		{ 'postman-token': '81c2df80-d63a-ca0f-6806-cc0b602f6c2a',
			'cache-control': 'no-cache' } };

		request(options, function (error, response, body) {
		if (error) throw new Error(error);
		// console.log(body)
			var dj=JSON.parse(body);
			var player=dj.players.player;

			return res.status(200).json({
				success:1,
				message:'player',
				results:player
			});

		});
	},
	teamDetails:(req,res)=>{
		var request = require("request");
		var tid=req.body.id;
		var options = { method: 'GET',
		url: 'http://www.goalserve.com/getfeed/69a39912a09b45a2f60e08d8f941eccb/soccerstats/team/'+tid,
		qs: { json: '1' },
		headers: 
		{'cache-control': 'no-cache'} };

		request(options, function (error, response, body) {
		if (error) throw new Error(error);

		var dj=JSON.parse(body);

		var teams=dj.teams.team;
		return res.status(200).json({
			success:1,
			message:'teams',
			results:teams
		});

		});
	},

	
	todaysMatchOrScore:(req,res)=>{
		var data = req.body;
		var team_id=[];
		var arr=[];

		

		getUserFavTeamService(data,(err,results)=>{
				if(err){
						return res.status(500).json({
						success:0,
						message:"error connection"	
					});
				}
				for(var i=0;i<results.length;i++ ){
					team_id.push(results[i].team_id);
				}
				//console.log(team_id);

				var page = data.page;
				var limit = 10;
				var start = (page * limit) - limit;
			// 	var request = require("request");
			// 	var options = { method: 'GET',
			// 	url: 'http://www.goalserve.com/getfeed/69a39912a09b45a2f60e08d8f941eccb/soccernew/'+data.key,
			// 	qs: { json: '1' },
			// 	headers: 
			// 	{ 'postman-token': '88180739-082c-1fb4-71c3-dcb304780ff1',
			// 		'cache-control': 'no-cache' } };
			// 	request(options, function (error, response, body) {
		
			// 	if (error) throw new Error(error);
			// 	var localimage='';
			// 	var vistorimage=''
			// 	var dj=JSON.parse(body);
			// 	var today=dj.scores;
			// 	var category=today.category;

			// 	for(var i=0; i < category.length ; i++)
			// 	{
			// 		var match_a=[];
			// 		var c=category[i];
			// 		var matches=category[i].matches;
			// 		var match=matches.match;
			// 		var matchlength=match.length;
			// 		if(matchlength == undefined){
			// 			match_a.push(match);
			// 		}
			// 		else{
			// 			match_a=match;
			// 		}
			// 		var m=[];
			// 		for(var j=0;j < match_a.length;j++)
			// 		{

			// 			var localteam=match_a[j].localteam;
			// 			var visitorteam=match_a[j].visitorteam;
			// 			var events=match_a[j]['events'];
			// 			var ft=match_a[j]['ft'];
			// 			var ht=match_a[j]['ht'];
			// 			var mat=match_a[j];
			// 			var localteam=match_a[j].localteam;
			// 			if(localteam)
			// 			{
			// 				var id=localteam['@id'];
			// 				var vistorid=visitorteam['@id'];
			// 				// console.log(team_id);
			// 				// console.log(id);
			// 				if(team_id.indexOf(id) !== -1){
			// 					console.log(id,vistorid);
			// 					var options = { method: 'GET',
			// 					url: 'http://www.goalserve.com/getfeed/69a39912a09b45a2f60e08d8f941eccb/soccerstats/team/'+id,
			// 					qs: { json: '1' },
			// 					headers: 
			// 					{ 'postman-token': '88180739-082c-1fb4-71c3-dcb304780ff1',
			// 						'cache-control': 'no-cache' } };
			// 					request(options, function (error, response, body) {
			// 					if (error) throw new Error(error);
			// 						var localarray=JSON.parse(body);
			// 						var localarrayteams=localarray.teams;
			// 						var localarrayteam=localarrayteams.team
			// 						var localimage=localarrayteam.image;
			// 						console.log(localimage);
			// 					var options = { method: 'GET',
			// 					url: 'http://www.goalserve.com/getfeed/69a39912a09b45a2f60e08d8f941eccb/soccerstats/team/'+vistorid,
			// 					qs: { json: '1' },
			// 					headers: 
			// 					{ 'postman-token': '88180739-082c-1fb4-71c3-dcb304780ff1',
			// 						'cache-control': 'no-cache' } };

			// 					request(options, function (error, response, body) {
			// 					if (error) throw new Error(error);



			// 					var visitorarray=JSON.parse(body);
			// 					var visitorarrayteams=visitorarray.teams;
			// 					var visitorarrayteam=visitorarrayteams.team
			// 					var vistorimage=visitorarrayteam.image;
								

			// 					var matcharray={
			// 						'@status':mat['@status'],
			// 						'@timer':mat['@timer'],
			// 						'@date':mat['@date'],
			// 						'@formatted_date':mat['@formatted_date'],
			// 						'@time':mat['@time'],
			// 						'@commentary_available':mat['@commentary_available'],
			// 						'@venue':mat['@venue'],
			// 						'@v':mat['@v'],
			// 						'@static_id':mat['@static_id'],
			// 						'@fix_id':mat['@fix_id'],
			// 						'@id':mat['@id'],
			// 						'localteam':localteam,
			// 						'localteam_image':localimage,
			// 						'visitorteam':visitorteam,
			// 						'visitorteam_image':vistorimage,
			// 						'events':events,
			// 						'ht':ht,
			// 						'ft':ft,
			// 					};
			// 				 	m.push(matcharray);
			// 				 	var matchs ={
			// 						'@date':matches['@date'],
			// 						'@formatted_date':matches['@formatted_date'],
			// 						'match':m
			// 					}
			// 					var re={
			// 					'@name':c['@name'],
			// 					'@gid':c['@gid'],
			// 					'@id':c['@id'],
			// 					'@file_group':c['@file_group'],
			// 					'@iscup':c['@iscup'],
			// 					'matches':matchs,
			// 					}
			// 					arr.push(re);
			// 					});
			// 					});
			// 				}
			// 			}
						
			// 		}
			// 	}
			// 	setTimeout(() => {
			// 	var obj={
			// 			'@sport':today['@sport'],
			// 			'@updated':today['@updated'],
			// 			'category':arr
			// 		}
			// 	return res.status(200).json({
			// 		success:1,
			// 		message:'today matches and live score',
			// 		results:obj
			// 	});
			//  }, 3000);
			// });

		});
	},

	liveGames:(req,res)=>{
		var request = require("request");

		var options = { method: 'GET',
		url: 'http://www.goalserve.com/getfeed/69a39912a09b45a2f60e08d8f941eccb/soccernew/live',
		qs: { json: '1' },
		headers: 
		{ 'postman-token': '88180739-082c-1fb4-71c3-dcb304780ff1',
			'cache-control': 'no-cache' } };

		request(options, function (error, response, body) {
		if (error) throw new Error(error);

		var dj=JSON.parse(body);
			var match_a=[];
			var today=dj.scores;
			var category=today.category;
			if(category){
				var categorylength=category.length;
				if(categorylength == undefined){
							match_a.push(category);
				}
				else{
							match_a=category;
				}
				var obj={
							'@sport':today['@sport'],
							'@updated':today['@updated'],
							'category':match_a
				}
				return res.status(200).json({
					success:1,
					message:'live game score',
					results:obj
				});
			}
			else{
				return res.status(200).json({
					success:0,
					message:'data not available'
				});
			}
			
		});

	},
	
	
	getLeaugeData:(req,res)=>{
		var request = require("request");
		var data = req.body;
		var url='https://www.goalserve.com/getfeed/69a39912a09b45a2f60e08d8f941eccb/soccerfixtures/leagueid/'+data.league_id;
		//console.log(url);
		var options = { method: 'GET',
		url: url,
		qs: { json: '1' },
		headers: 
		{ 'postman-token': '88180739-082c-1fb4-71c3-dcb304780ff1',
			'cache-control': 'no-cache' } };

		request(options, function (error, response, body) {
		if (error) throw new Error(error);
		var dj=JSON.parse(body);
		
			return res.status(200).json({
				success:1,
				message:'leauge data',
				results:dj
			});
		});
	},
	getWheatherController:(req,res)=>{
		var data = req.body;
		var request = require("request");
		var options = { method: 'GET',
		url: 'https://api.openweathermap.org/data/2.5/onecall?lat='+data.lat+'&lon='+data.lon+'&exclude=daily&units='+data.units+'&appid='+data.appid,
		qs: { json: '1' },
		headers: 
		{ 'postman-token': '88180739-082c-1fb4-71c3-dcb304780ff1',
		  'cache-control': 'no-cache' } };
		request(options, function (error, response, body) {
			if (error) throw new Error(error);
			var localarray=JSON.parse(body);
			return res.status(200).json({
				success:1,
				message:'Wheather data',
				results:localarray
			});
		})
	},
	getCompetition:(req,res)=>{
		var data = req.body;
		var team_id=[];
		var arr=[];
		getUserFavTeamService(data,(err,results)=>{
				if(err){
						return res.status(500).json({
						success:0,
						message:"error connection"	
					});
				}
				for(var i=0;i<results.length;i++ ){
					team_id.push(results[i].team_id);
				}
				var request = require("request");
				var options = { method: 'GET',
				url: 'http://www.goalserve.com/getfeed/69a39912a09b45a2f60e08d8f941eccb/soccernew/home',
				qs: { json: '1' },
				headers: 
				{ 'postman-token': '88180739-082c-1fb4-71c3-dcb304780ff1',
					'cache-control': 'no-cache' } };
				request(options, function (error, response, body) {
		
				if (error) throw new Error(error);
				var dj=JSON.parse(body);
				var today=dj.scores;
				var category=today.category;
				for(var i=0; i< category.length ; i++)
				{
					var match_a=[];
					var c=category[i];
					var matches=category[i].matches;
					var match=matches.match;
					var matchlength=match.length;
					if(matchlength == undefined){
						match_a.push(match);
					}
					else{
						match_a=match;
					}
					var m=[];
					for(var j=0;j < match_a.length;j++)
					{
						var localteam=match_a[j].localteam;
						var visitorteam=match_a[j].visitorteam;
						var events=match_a[j]['events'];
						var ft=match_a[j]['ft'];
						var ht=match_a[j]['ht'];
						var mat=match_a[j];
						var localteam=match_a[j].localteam;
						if(localteam)
						{
							var id=localteam['@id'];
							if(team_id.indexOf(id) !== -1)
							{
								var matcharray={
									'@status':mat['@status'],
									'@timer':mat['@timer'],
									'@date':mat['@date'],
									'@formatted_date':mat['@formatted_date'],
									'@time':mat['@time'],
									'@commentary_available':mat['@commentary_available'],
									'@venue':mat['@venue'],
									'@v':mat['@v'],
									'@static_id':mat['@static_id'],
									'@fix_id':mat['@fix_id'],
									'@id':mat['@id'],
									'localteam':localteam,
									'visitorteam':visitorteam,
									'events':events,
									'ht':ht,
									'ft':ft,
								};
							 	m.push(matcharray);
							 	var matchs ={
									'@date':matches['@date'],
									'@formatted_date':matches['@formatted_date'],
									'match':m
								}
								var re={
								'@name':c['@name'],
								'@gid':c['@gid'],
								'@id':c['@id'],
								'@file_group':c['@file_group'],
								'@iscup':c['@iscup'],
								'matches':matchs,
								}
								arr.push(re);
							}
						}
						
					}
					var l=category.length-1;
					if(i==l){
						return res.status(200).json({
							success:1,
							message:'today matches and live score',
							results:arr
						});
					}

				}
			});

		});
	},
	updateProfileController:(req,res)=>{
		upload(req,res,function(err){
			if(err){
				return res.status(500).json({
					success:0,
					message:'Error in image upload',
				});
			}else{
				profileUpdateService(req,(err,results)=>{
					if(err){
						//console.log(err);
						return res.status(500).json({
						success:0,
						message:'Oops !! Inputs can not be null.',
						});
					}
					return res.status(200).json({
						success:1,
						message:'Profile Updated successfully',
						results:results
					});
				});
			}
		});
	},
	updateMatchSettingController:(req,res)=>{
		var data = req.body; 
		updateMatchSettingService(data,(err,results)=>{
			if(err){
				//console.log(err);
					return res.status(500).json({
					success:0,
					message:"error connection"	
				});
			}

			return res.status(200).json({
				success:1,
				message:'Match setting Updated Succesfully',
				results:results
			});
		})		
	},
	appContentControll:(req,res)=>{
		var body =req.body;
		appContentService(body,(err,results)=>{
			if(err){
				//console.log(err);
				return res.status(500).json({
					success:0,
					message:'Something went wrong.',
				});
			}
			return res.status(200).json({
				success:1,
				message:'Get data successfully!!',
				results:results
			});
		});
	},
	getFaqControll:(req,res)=>{
		var body = req.body;
		getFaqService(body,(err,results)=>{
			if(err){
				//console.log(err);
				return res.status(500).json({
					success:0,
					message:'Something went wrong.',
				});
			}
			return res.status(200).json({
				success:1,
				message:'Get Faq successfully!!',
				results:results
			});
		});
	},
	sendContactControll:(req,res)=>{
		var body = req.body;
		sendContactService(body,(err,results)=>{
			if(err){
				//console.log(err);
				return res.status(500).json({
					success:0,
					message:'Something went wrong.',
				});
			}
			return res.status(200).json({
				success:1,
				message:'Submit contact successfully!!',
			});
		});
	},
	ChangePasswordControll:(req,res)=>{
		var body = req.body;
		matchPasswordService(body,(err,results)=>{
			if(err){
				//console.log(err);
				return res.status(500).json({
					success:0,
					message:'Something went wrong.',
				});
			}

			if(results[0]){
				if(body.old_password==results[0].password){
						updatePasswordService(body,(err,results1)=>{
							if(err){
								//console.log(err);
								return res.status(500).json({
									success:0,
									message:'Something went wrong.',
								});
							}
							return res.status(200).json({
								success:1,
								message:'password updated',
								results:results1
							});
						});
				}else{
					return res.status(500).json({
						success:0,
						message:'Old password didn\'t match'
					});
				}
			}else{
					return res.status(500).json({
						success:0,
						message:'User not found'
					});
			}	
		});
	},
	updateLanguageController:(req,res)=>{
		var data = req.body; 
		updateLanguageService(data,(err,results)=>{
			if(err){
				//console.log(err);
					return res.status(500).json({
					success:0,
					message:"error connection"	
				});
			}

			return res.status(200).json({
				success:1,
				message:'Language Updated Succesfully',
				results:results
			});
		})		
	},
	updateNotificationSettingController:(req,res)=>{
		var data = req.body; 
		updateNotificationSettingService(data,(err,results)=>{
			if(err){
				//console.log(err);
					return res.status(500).json({
					success:0,
					message:"error connection"	
				});
			}

			return res.status(200).json({
				success:1,
				message:'Notification data',
				results:results
			});
		})		
	},
	getNotificationController:(req,res)=>{
		var data = req.body; 
		getNotificationService(data,(err,results)=>{
			if(err){
				//console.log(err);
					return res.status(500).json({
					success:0,
					message:"error connection"	
				});
			}

			return res.status(200).json({
				success:1,
				message:'Notification data',
				results:results
			});
		})		
	},
	getMatchSettingController:(req,res)=>{
		var data = req.body; 
		getMatchSettingService(data,(err,results)=>{
			if(err){
				//console.log(err);
					return res.status(500).json({
					success:0,
					message:"error connection"	
				});
			}

			return res.status(200).json({
				success:1,
				message:'MatchSetting data',
				results:results
			});
		})		
	},
	getUserListController:(req,res)=>{
		var body =req.body;
		getUsertotalListService(body,(err,counts)=>{
			if(err){
				//console.log(err);
				return res.status(500).json({
					success:0,
					message:"something went wrong"
				});
			}
				//get total page
			var limit = 10;
			var total = counts.length;
			var page = total / limit + '';
			//console.log(page);
			var explode = page.split('. ');
			var page1 =  Math.round(explode);
			if(explode > page1){
				var page1=page1+1;
			}
			getUserListService(body,(err,results)=>{
				if(err){
							//console.log(err);
							return res.status(500).json({
							success:0,
							message:'Error',
							});
						}
	
						return res.status(200).json({
							success:1,
							message:'Data Retrive successfully',
							results:results,
							total:total,
							total_page:page1
	
				});
			});
		});
	},
	sendMessageController:(req,res)=>{

		upload(req,res,function(err){
			if(err){
				return res.status(500).json({
					success:0,
					message:'Error in image upload',
				});
			}else{
				//validation part----------------------------------------
					
					// var er = errors.array();
					// var report=[];
					// for(var i=0;i<er.length;i++){
					// 	report.push(er[i].msg);
					// }
			  //       if (!errors.isEmpty()) {
			  //           return res.status(500).json({
			  //               success: 0,
			  //               message: report.toString()
			  //           });
			  //       }
		        //validation part----------------------------------------
				sendMessageService(req,(err,results)=>{
					if(err){
						return res.status(500).json({
						success:0,
						message:'Oops !! Inputs can not be null.',
						});
					}
					return res.status(200).json({
						success:1,
						message:'Message send successfully',
						results:results
					});
				})
			}
		})	
	},

	viewMessageControler:(req,res)=>{
		var body =req.body;
		
			viewMessageService(body,(err,results)=>{
				if(err){
							//console.log(err);
							return res.status(500).json({
							success:0,
							message:'Error',
							});
						}
	
						return res.status(200).json({
							success:1,
							message:'Data Retrive successfully',
							results:results
						});	
				});
			
	},
	getUserChatListController:(req,res)=>{
		var body =req.body;
		getTotalUserChatListService(body,(err,counts)=>{
			if(err){
				//console.log(err);
				return res.status(500).json({
					success:0,
					message:"something went wrong"
				});
			}
				//get total page
			var limit = 10;
			var total = counts.length;
			var page = total / limit + '';
			//console.log(page);
			var explode = page.split('. ');
			var page1 =  Math.round(explode);
			if(explode > page1){
				var page1=page1+1;
			} 
			getUserChatListService(body,(err,results)=>{
				if(err){
							//console.log(err);
							return res.status(500).json({
							success:0,
							message:'Error',
							});
						}
	
						return res.status(200).json({
							success:1,
							message:'Data Retrive successfully',
							results:results,
							total:total,
							total_page:page1
	
				});
			});
		});
		
	},
	deleteChatController:(req,res)=>{
		var body =req.body;
		deleteChatService(body,(err,results)=>{
					if(err){
						return res.status(500).json({
						success:0,
						message:'Oops !! Inputs can not be null.',
						});
					}
					return res.status(200).json({
						success:1,
						message:'delete chat  successfully'
					});
		})
	},

	getUserByIdController:(req,res)=>{
		var body =req.body;
		getUserByIdService(body,(err,results)=>{
					if(err){
						//console.log(err);
						return res.status(500).json({
						success:0,
						message:'Oops !! Inputs can not be null.',
						});
					}
					return res.status(200).json({
						success:1,
						message:'data get succesfully',
						results:results
					});
		})
	},

	updateDeviceTokenController:(req,res)=>{
		var body =req.body;
		updateDeviceTokenService(body,(err,results)=>{
					if(err){
						return res.status(500).json({
						success:0,
						message:'Oops !! Inputs can not be null.',
						});
					}
					return res.status(200).json({
						success:1,
						message:'data updated succesfully'
					});
		})
	},

	addBetController:(req,res)=>{
		var body =req.body;
		//console.log(body);
		addBetService(body,(err,results)=>{
					if(err){
						//console.log(err);
						return res.status(500).json({
						success:0,
						message:'Oops !! Inputs can not be null.',
						});
					}
					return res.status(200).json({
						success:1,
						message:'data added succesfully'
					});
		})
	},
	
	getHomedataController:(req,res)=>{
		const data =req.body;
		getUserByIdService(data,(err,results)=>{
			if(err){
				//console.log(err);
					return res.status(500).json({
					success:0,
					message:"error connection"	
				});
			}
			var user=results[0];
			totalBetService(data,(err,totalbeats)=>{
			if(err){
				//console.log(err);
					return res.status(500).json({
					success:0,
					message:"error connection"	
				});
			}

			return res.status(200).json({
					success:1,
					message:'data retrive succesfully',
					totalbets:totalbeats.length,
					bets:totalbeats,
					user:user,
			});
			})
		})
	},
	verifyOTPController:(req,res)=>{
		var body = req.body;
		checkEmail(body,(err,results)=>{
			if(err){
				//console.log(err);
				return res.status(200).json({
					success:0,
					message:'Something went wrong.',
				});	
			}

		if(!results){

			return res.status(500).json({
					success:0,
					message:'Email not exists.',
				});
		}else{

			var time=results.otp_expire_time;
			var milliseconds2 = Date.now();

  			var diff = milliseconds2 - time;
  			var diffMinutes = diff / (60 * 1000);
  			//console.log(diffMinutes);
			var otp=results.otp;

			if(body.otp==otp){
				if(diffMinutes > 5){
					return res.status(200).json({
					success:1,
					message:"OTP expired",
					});
				}
				else{
					return res.status(200).json({
						success:1,
						message:"OTP verify successfully",
						results:results
					});
				}
				
			}else{
				return res.status(500).json({
					success:0,
					message:'Invalid OTP',
				});
			}
			}	
		});
	},
	forgetPasswordController:(req,res)=>{
		var body =req.body;
		forgetPasswordService(body,(err,results)=>{
			if(err){
					//console.log(err);
					return res.status(500).json({
					success:0,
					message:'Something went wrong.',
				});
			}
			if(results==1){
				return res.status(200).json({
					success:1,
					message:'Send OTP to your email address.'
				});
			}else{
				return res.status(200).json({
					success:0,
					message:'Oops !! Email is not register with us.',
				});
			}

		});
	},
	updatePasswordController:(req,res)=>{
		var body =req.body;
		// const salt =genSaltSync(10);
		// body.password=hashSync(body.password,salt);

		updatePasswordService(body,(err,results)=>{
			if(err){
				//console.log(err);
				return res.status(200).json({
					success:0,
					message:'Something went wrong.',
				});
			}

		getUserByIdService(body,(err,user)=>{
			
			if(err){
				//console.log(err);
				return res.status(200).json({
					success:0,
					message:'Something went wrong.',
				});
			}
			if(user)
			{
				return res.status(200).json({
				success:1,
				message:"password updated successfully",
				results:user
				});
			}
			else
			{
				return res.status(200).json({
					success:0,
					message:'user not available.',
				});
			}
			
		});	
	});
	},

	//store live score data in local database
	storeMatchController:(req,res)=>{
		var data = req.query;
		//console.log(data);

		storeLiveDataService(data,(err,results)=>{
				if(err){
					//console.log(err);
						return res.status(500).json({
						success:0,
						message:"error connection"	
					});
				}
				return res.status(200).json({
					success:1,
					message:'data stored succesfully.',
				});
		});
	},
	//get all match data
	getMatchController:(req,res)=>{
		var data = req.body;
		getTotalMatchService(data,(err,counts)=>{
			if(err){
				//console.log(err);
				return res.status(500).json({
					success:0,
					message:"something went wrong"
				});
			}
				//get total page
			if(counts){
				var limit = 10;
				var total = counts.length;
				var page = total / limit + '';
				//console.log(page);
				var explode = page.split('. ');
				var page1 =  Math.round(explode);
				if(explode > page1){
					var page1=page1+1;
				}
			}
			else{
				var total = 0;
				var page1 = 0;
			}

			getMatchService(data,(err,results)=>{
					if(err){
						//console.log(err);
							return res.status(500).json({
							success:0,
							message:"error connection"	
						});
					}
					return res.status(200).json({
						success:1,
						message:'data get succesfully.',
						result:results,
						total:total,
						total_page:page1
					});
			});
		});
	},

	//get all compitions

	getallcompitionController:(req,res)=>{
		var data = req.body;
		getTotalcompetitionService(data,(err,counts)=>{
			if(err){
				//console.log(err);
				return res.status(500).json({
					success:0,
					message:"something went wrong"
				});
			}
				//get total page
			if(counts){
				var limit = 10;
				var total = counts.length;
				var page = total / limit + '';
				//console.log(page);
				var explode = page.split('. ');
				var page1 =  Math.round(explode);
				if(explode > page1){
					var page1=page1+1;
				}
			}
			else{
				var total = 0;
				var page1 = 0;
			}

			getcompetitionService(data,(err,results)=>{
					if(err){
						//console.log(err);
							return res.status(500).json({
							success:0,
							message:"error connection"	
						});
					}
					return res.status(200).json({
						success:1,
						message:'data get succesfully.',
						result:results,
						total:total,
						total_page:page1
					});
			});
		});
	},

	getmatchteamController:(req,res)=>{
		var data = req.body;
		gettotalmatchteamservice(data,(err,counts)=>{
			if(err){
				//console.log(err);
				return res.status(500).json({
					success:0,
					message:"something went wrong"
				});
			}
				//get total page
			if(counts){
				var limit = 10;
				var total = counts.length;
				var page = total / limit + '';
				//console.log(page);
				var explode = page.split('. ');
				var page1 =  Math.round(explode);
				if(explode > page1){
					var page1=page1+1;
				}
			}
			else{
				var total = 0;
				var page1 = 0;
			}

			getmatchteamservice(data,(err,results)=>{
					if(err){
						//console.log(err);
							return res.status(500).json({
							success:0,
							message:"error connection"	
						});
					}
					return res.status(200).json({
						success:1,
						message:'data get succesfully.',
						result:results,
						total:total,
						total_page:page1
					});
			});
		});
	},


	//store live score data in local database
	updateMatchController:(req,res)=>{
		var data = req.query;
		//console.log(data);

		updateMatchDataService(data,(err,results)=>{
				if(err){
					//console.log(err);
						return res.status(500).json({
						success:0,
						message:"error connection"	
					});
				}
				return res.status(200).json({
					success:1,
					message:'data updated succesfully.',
				});
		});
	},
	matchdetail:(req,res)=>{
		var data = req.body;
		matchdetailsDataService(data,(err,results)=>{
			if(err){
				//console.log(err);
					return res.status(500).json({
					success:0,
					message:"error connection"	
				});
			}
			return res.status(200).json({
				success:1,
				message:'data stored succesfully.',
				results:results
			});
		});
	},
	
	teamsController:(req,res)=>{
		var data = req.body;
		totalteamsService(data,(err,counts)=>{
			if(err){
				//console.log(err);
				return res.status(500).json({
					success:0,
					message:"something went wrong"
				});
			}
				//get total page
			if(counts){
				var limit = 10;
				var total = counts.length;
				var page = total / limit + '';
				//console.log(page);
				var explode = page.split('. ');
				var page1 =  Math.round(explode);
				if(explode > page1){
					var page1=page1+1;
				}
			}
			else{
				var total = 0;
				var page1 = 0;
			}

			teamsService(data,(err,results)=>{
					if(err){
						//console.log(err);
							return res.status(500).json({
							success:0,
							message:"error connection"	
						});
					}
					return res.status(200).json({
						success:1,
						message:'data get succesfully.',
						result:results,
						total:total,
						total_page:page1
					});
			});
		});
	},

	storeleagueController:(req,res)=>{
		storeleagueService(req,(err,results)=>{
				if(err){
					//console.log(err);
						return res.status(500).json({
						success:0,
						message:"error connection"	
					});
				}
				return res.status(200).json({
					success:1,
					message:'data stored succesfully.',
				});
		});
	},

	leagueList:(req,res)=>{
		var data = req.body;
		totalleagueService(data,(err,counts)=>{
			if(err){
				//console.log(err);
				return res.status(500).json({
					success:0,
					message:"something went wrong"
				});
			}
				//get total page
			if(counts){
				var limit = 10;
				var total = counts.length;
				var page = total / limit + '';
				//console.log(page);
				var explode = page.split('. ');
				var page1 =  Math.round(explode);
				if(explode > page1){
					var page1=page1+1;
				}
			}
			else{
				var total = 0;
				var page1 = 0;
			}

			leagueService(data,(err,results)=>{
					if(err){
						//console.log(err);
							return res.status(500).json({
							success:0,
							message:"error connection"	
						});
					}
					//console.log(results);
					return res.status(200).json({
						success:1,
						message:'data get succesfully.',
						result:results,
						total:total,
						total_page:page1
					});
			});
		});

	},

}