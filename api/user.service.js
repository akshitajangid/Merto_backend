const pool =require('../config/db');

var FCM = require('fcm-node');
var serverKey = 'AAAAzX-Io3w:APA91bFQj6V2X5lfUht-f6CggrN0ymvhuypTLqgUJIT7Xqvp1KZyUJzMlPuDVtwjMUtq7IafDAQKYiQEXuEBJGO0DvOVim8drnLfJhGoJjo9RH4_g-YXFfmPQPp3yYv_ZMxd8TyCbvyU'; //put your server key here
var fcm = new FCM(serverKey);
module.exports={
	signupService:(data,callback)=>{
		pool.query(`INSERT INTO merto_tbl_users (name,email,device_token,device_type,password,login_type,language,active_time) values (?,?,?,?,?,?,?,?)`,
			[
				data.name,
				data.email,
				data.device_token,
				data.device_type,
				data.password,
				"Email",
				data.language,
				Date.now()
			],(error,results,fields)=>{
				if(error){
					return callback(null);
				}
				var user_id=results.insertId;
				pool.query(
				`INSERT INTO merto_tbl_match_setting (user_id,show_postponed_match,poll,off_the_woodwork,injuries,substitutions,penalties,yellow_cards,red_cards) values (?,?,?,?,?,?,?,?,?)`,
				[
					user_id,
					'1',
					'1',
					'1',
					'1',
					'1',
					'1',
					'1',
					'1'
				],
				(error,results,fields)=>{
					if(error){
						return callback(null)
					}
					pool.query(`select * from merto_tbl_users where user_id= ?`,[user_id],
					(error,user,fields)=>{
						if(error){
							return callback(null);
						}
						return callback(null,user[0]);	
					});
				})
			});
	},
	getUser:(data,callback)=>{
		pool.query(`select * from merto_tbl_users where user_id= ?`,[data.user_id],
			(error,results,fields)=>{
			if(error){
					return callback(null);
				}
				return callback(null,results);	
		})
	},
	checkEmail:(data,callback)=>{
		pool.query(`select * from merto_tbl_users where email= ?`,[data.email],
			(error,results,fields)=>{
			if(error){
					return callback(null);
				}
			return callback(null,results[0]);	
		});
	},
	checkSocial:(data,callback)=>{
		pool.query(`select * from merto_tbl_users where social_id= ?`,[data.social_id],
			(error,results,fields)=>{
			if(error){
					return callback(null);
				}
			return callback(null,results[0]);	
		});
	},
	createSocial:(data,callback)=>{
		pool.query(`INSERT INTO merto_tbl_users (name,email,device_token,device_type,social_id,login_type,language) values (?,?,?,?,?,?,?)`,
			[
				data.name,
				data.email,
				data.device_token,
				data.device_type,
				data.social_id,
				data.login_type,
				data.language
			],(error,results,fields)=>{
				if(error){
					return callback(null);
				}
				var user_id=results.insertId;
				//console.log(user_id);
				pool.query(
				`INSERT INTO merto_tbl_match_setting (user_id,show_postponed_match,poll,off_the_woodwork,injuries,substitutions,penalties,yellow_cards,red_cards) values (?,?,?,?,?,?,?,?,?)`,
				[
					user_id,
					'1',
					'1',
					'1',
					'1',
					'1',
					'1',
					'1',
					'1'
				],
				(error,results,fields)=>{
					if(error){
						return callback(null)
					}
					pool.query(`select * from merto_tbl_users where user_id= ?`,[user_id],
					(error,user,fields)=>{
						if(error){
							return callback(null);
						}
						return callback(null,user[0]);	
					});
				})
			});
			
	},
	favTeamService:(data,callback)=>{
		pool.query(
		`INSERT INTO merto_tbl_fav_team (user_id,team_id,timestamp) values (?,?,?)`,
		[
			data.user_id,
			data.team_id,
			Date.now()

		],
		(error,results,fields)=>{
			if(error){
				return callback(null)
			}
			return callback(null,results);
		})
	},
	checkFavService:(data,callback)=>{
		pool.query(
		`select * from merto_tbl_fav_team where team_id=? AND user_id=?`,
		[
			data.team_id,
			data.user_id
		],
		(error,results,fields)=>{
			if(error){
				return callback(null)
			}
			return callback(null,results);
		})
	},
	removeFavTeamService:(data,callback)=>{
		pool.query(
			`delete from merto_tbl_fav_team where team_id=? AND user_id=?`,
			[
				data.team_id,
				data.user_id	
			],
			(error,results,fields)=>{
				if(error){
					return callback(null);
				}
				return callback(null,results);
			})
	},
	favLeaguesService:(data,callback)=>{
		pool.query(
		`INSERT INTO merto_tbl_fav_leagues (user_id,leagues_id,timestamp) values (?,?,?)`,
		[
			data.user_id,
			data.leagues_id,
			Date.now()

		],
		(error,results,fields)=>{
			if(error){
				return callback(null)
			}
			return callback(null,results);
		})
	},
	checkFavLeaguesService:(data,callback)=>{
		pool.query(
		`select * from merto_tbl_fav_leagues where leagues_id=? AND user_id=?`,
		[
			data.leagues_id,
			data.user_id
		],
		(error,results,fields)=>{
			if(error){
				return callback(null)
			}
			return callback(null,results);
		})
	},
	removeFavLeaguesService:(data,callback)=>{
		pool.query(
			`delete from merto_tbl_fav_leagues where leagues_id=? AND user_id=?`,
			[
				data.leagues_id,
				data.user_id	
			],
			(error,results,fields)=>{
				if(error){
					return callback(null);
				}
				return callback(null,results);
			})
	},
	favCompetitionService:(data,callback)=>{
		pool.query(
		`INSERT INTO merto_tbl_fav_competition (user_id,competition_id,timestamp) values (?,?,?)`,
		[
			data.user_id,
			data.competition_id,
			Date.now()

		],
		(error,results,fields)=>{
			if(error){
				return callback(null)
			}
			return callback(null,results);
		})
	},
	checkFavCompetitionService:(data,callback)=>{
		pool.query(
		`select * from merto_tbl_fav_competition where competition_id=? AND user_id=?`,
		[
			data.competition_id,
			data.user_id
		],
		(error,results,fields)=>{
			if(error){
				return callback(null)
			}
			return callback(null,results);
		})
	},
	removeFavCompetitionService:(data,callback)=>{
		pool.query(
			`delete from merto_tbl_fav_competition where competition_id=? AND user_id=?`,
			[
				data.competition_id,
				data.user_id	
			],
			(error,results,fields)=>{
				if(error){
					return callback(null);
				}
				return callback(null,results);
			})
	},
	followTeamService:(data,callback)=>{
		pool.query(
		`INSERT INTO merto_tbl_follow_teams (user_id,team_id,timestamp) values (?,?,?)`,
		[
			data.user_id,
			data.team_id,
			Date.now()

		],
		(error,results,fields)=>{
			if(error){
				return callback(null)
			}
			return callback(null,results);
		})
	},
	checkFollowTeamService:(data,callback)=>{
		pool.query(
		`select * from merto_tbl_follow_teams where team_id=? AND user_id=?`,
		[
			data.team_id,
			data.user_id
		],
		(error,results,fields)=>{
			if(error){
				return callback(null)
			}
			return callback(null,results);
		})
	},
	removeFollowTeamService:(data,callback)=>{
		pool.query(
			`delete from merto_tbl_follow_teams where team_id=? AND user_id=?`,
			[
				data.team_id,
				data.user_id	
			],
			(error,results,fields)=>{
				if(error){
					return callback(null);
				}
				return callback(null,results);
			})
	},
	insertTeamDataService:(data,callback)=>{
		var id =data.id;
		var request = require("request");
		var options = { method: 'GET',
			url: 'http://www.goalserve.com/getfeed/69a39912a09b45a2f60e08d8f941eccb/soccerstats/team/'+id,
			qs: { json: '1' },
			headers: 
			{'cache-control': 'no-cache'} };
			request(options, function (error, response, body) {
			if (error) throw new Error(error);
				var dj=JSON.parse(body);
				var teams=dj.teams.team;
				var tdata=Object.values(teams);

				//console.log(teams);
				var id=tdata[0];
				var is_national_team=tdata[1];
				var name=tdata[2];
				var fullname=tdata[3];
				var country=tdata[4];
				var venue_name =tdata[7];
				var venue_id =tdata[8];
				var venue_image =tdata[13];
				var image =tdata[14];
				pool.query(
				`INSERT INTO merto_tbl_team (id,is_national_team,name,fullname,country,venue_name,venue_id,venue_image,image) values(?,?,?,?,?,?,?,?,?)`,
				[
					id,
					is_national_team,
					name,
					fullname,
					country,
					venue_name,
					venue_id,
					venue_image,
					image
				],
				(error,results,fields)=>{
					if(error){
						return callback(null);
					}
					// return callback(null,results);
				})
			});		
	},

	insertPlayerService:(data,callback)=>{
		var request = require("request");
			var options = { method: 'GET',
			url: 'https://www.goalserve.com/getfeed/69a39912a09b45a2f60e08d8f941eccb/soccerstats/player/updated_list',
			qs: { json: '1' },
			headers: 
			{'cache-control': 'no-cache'} };

			request(options, function (error, response, body) {
			if (error) throw new Error(error);
				var dj=JSON.parse(body);
				var player=dj.players.player;
				for(var i=0 ;i<player.length;i++){
					var id=player[i].id;
					
					pool.query(
						`select *  from merto_tbl_player where id =?`,
						[id],
						(error,results,fields)=>{
							if(error){
								return callback(null);
							}
							
							if(results.length==0){
								pool.query(
								`Insert into  merto_tbl_player (id) VALUES (?)`,
								[id],
								(error,results,fields)=>{
									if(error){
										return callback(null);
									}
									
								});	
							}
						});
				}
				return callback(null);
			});






		// pool.query(
		// 	`select *  from merto_tbl_player where category IS NULL and name IS NULL limit 1`,
		// 	[],
		// 	(error,results,fields)=>{
		// 		if(error){
		// 			return callback(null);
		// 		}
		// 		if(results.length>0){

		// 			var tid=results[0].id;
		// 			var id=results[0].ai;
		// 			var request = require("request");
		// 			var options = { method: 'GET',
		// 			url: 'http://www.goalserve.com/getfeed/69a39912a09b45a2f60e08d8f941eccb/soccerstats/player/'+tid,
		// 			qs: { json: '1' },
		// 			headers: 
		// 			{ 'postman-token': '81c2df80-d63a-ca0f-6806-cc0b602f6c2a',
		// 				'cache-control': 'no-cache' } };
		// 			request(options, function (error, response, body) {
		// 			if (error) throw new Error(error);
		// 				var dj=JSON.parse(body);
		// 				var player=dj.players.player;
		// 				var pdata=Object.values(player);
		// 				var common_name = pdata[0];
		// 				var name = pdata[2];
		// 				var firstname = pdata[3];
		// 				var lastname = pdata[4];
		// 				var team = pdata[5];
		// 				var teamid = pdata[6];
		// 				var position = pdata[12];
		// 				var image = pdata[15];

		// 				if(image==null){
		// 					var img='';
		// 				}else{
		// 					var img = image;
		// 				}
		// 				pool.query(
		// 				`update  merto_tbl_player set category=?,name=?,fname=?,lname=?,image=?,position=?,team=?,team_id=? where id=?`,
		// 				[
		// 					position,
		// 					name,
		// 					firstname,
		// 					lastname,
		// 					img,
		// 					position,
		// 					team,
		// 					teamid,
		// 					id	
		// 				],
		// 				(error,results,fields)=>{	
		// 					if(error){
		// 						console.log(error);
		// 						// return callback(null);
		// 					}
		// 					return callback(null,results);
		// 				});
		// 			});
		// 		}
		// 	})
	},

	totalleagueService:(data,callback)=>{
		var query='';
		if(data.search !=undefined  && data.search !=''){
			query= "where `@name` Like '%"+data.search+"%'";
		}
		
		pool.query(
			`select * from merto_tbl_league `+ query,
			[],
			(error,results,fields)=>{
				if(error){
					return callback(null);
				}
				return callback(null,results);
			})
	},
	leagueService:(data,callback)=>{
		var page = data.page;
		var limit = 10;
		var start = (page * limit) - limit;
		var query='';
		if(data.search !=undefined  && data.search !=''){
			query= "where `@name` Like '%"+data.search+"%'";
		}
		
		pool.query(
			'select * , (select count(*) from  merto_tbl_fav_leagues where leagues_id=merto_tbl_league.`@id` and user_id='+data.user_id+') as is_faviourate from merto_tbl_league '+ query+' limit '+ start+','+limit,
			[],
			(error,results,fields)=>{
				if(error){
					return callback(null);
				}
				return callback(null,results);
			})
	},
	teamsService:(data,callback)=>{
		var page = data.page;
		var limit = 10;
		var start = (page * limit) - limit;
		var query='';
		if(data.search !=undefined  && data.search !=''){
			query= `where name Like '%`+data.search+`%'`;
		}
		
		pool.query(
			`select * , (select count(*) from  merto_tbl_follow_teams where team_id=merto_tbl_team.id and user_id=`+data.user_id+`) as is_following, (select count(*) from  merto_tbl_fav_team where team_id=merto_tbl_team.id and user_id=`+data.user_id+`) as is_faviourate from merto_tbl_team `+ query+` limit `+ start+`,`+limit,
			[],
			(error,results,fields)=>{
				if(error){
					return callback(null);
				}
				return callback(null,results);
			})
	},
	totalteamsService:(data,callback)=>{
		var query='';
		if(data.search !=undefined  && data.search !=''){
			query= `where name Like '%`+data.search+`%'`;
		}
		pool.query(
			`select * from merto_tbl_team `+ query,
			[],
			(error,results,fields)=>{
				if(error){
					return callback(null);
				}
				return callback(null,results);
			})
	},
	playerService:(data,callback)=>{
		pool.query(
			`select * from merto_tbl_player limit 20`,
			[],
			(error,results,fields)=>{
				if(error){
					return callback(null);
				}
				return callback(null,results);
			})
	},
	getUserFavTeamService:(data,callback)=>{
		pool.query(
			`select team_id from merto_tbl_fav_team where user_id=?`,
			[data.user_id],
			(error,results,fields)=>{
				if(error){
					return callback(null);
				}
				return callback(null,results);
			})
	},
	getteamImageService:(data,callback)=>{
		var request = require("request");
		var id=data['@id'];
		var options = { method: 'GET',
		url: 'http://www.goalserve.com/getfeed/69a39912a09b45a2f60e08d8f941eccb/soccerstats/team/'+id,
		qs: { json: '1' },
		headers: 
		{ 'postman-token': '88180739-082c-1fb4-71c3-dcb304780ff1',
		  'cache-control': 'no-cache' } };
		request(options, function (error, response, body) {
			if (error) throw new Error(error);
			var localarray=JSON.parse(body);
			var localarrayteams=localarray.teams;
			var localarrayteam=localarrayteams.team
			var localimage=localarrayteam.image;
			return callback(null,localimage);
			return localimage;
		})
	},
	getplayerimageService:(value,callback)=>{
		var request = require("request");
		var val=[];
		var interval = 0.2 * 1000;
		for(var i=0 ;i< value.length;i++){
			 setTimeout( function (i) {
			var data=value[i];
			var tid=data['@id'];
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
				var playerimage=player.image;
				var res={
							 "@num": data['@num'],
	                         "@name": data['@name'],
	                         "@pos": data['@pos'],
	                          "@isCaptain": data['@isCaptain'],
	                          "@isSubst":data['@isSubst'],
	                          "@shots_total": data['@shots_total'],
	                          "@shots_on_goal": data['@shots_on_goal'],
	                          "@goals": data['@goals'],
	                          "@goals_conceded": data['@goals_conceded'],
	                          "@assists": data['@assists'],
	                          "@offsides": data['@offsides'],
	                          "@fouls_drawn": data['@fouls_drawn'],
	                          "@fouls_commited": data['@fouls_commited'],
	                          "@tackles": data['@tackles'],
	                          "@blocks": data['@blocks'],
	                          "@total_crosses": data['@total_crosses'],
	                          "@acc_crosses": data['@acc_crosses'],
	                          "@interceptions": data['@interceptions'],
	                          "@clearances": data['@clearances'],
	                          "@saves": data['@saves'],
	                          "@savesInsideBox": data['@savesInsideBox'],
	                          "@duelsTotal": data['@duelsTotal'],
	                          "@duelsWon": data['@duelsWon'],
	                          "@dribbleAttempts": data['@dribbleAttempts'],
	                          "@dribbleSucc": data['@dribbleSucc'],
	                          "@dribbledPast": data['@dribbledPast'],
	                          "@yellowcards": data['@yellowcards'],
	                          "@redcards": data['@redcards'],
	                          "@pen_score": data['@pen_score'],
	                          "@pen_miss": data['@pen_miss'],
	                          "@pen_save": data['@pen_save'],
	                          "@pen_committed": data['@pen_committed'],
	                          "@pen_won": data['@pen_won'],
	                          "@hit_woodwork": data['@hit_woodwork'],
	                          "@passes": data['@passes'],
	                          "@passes_acc": data['@passes_acc'],
	                          "@keyPasses": data['@keyPasses'],
	                          "@minutes_played": data['@minutes_played'],
	                          "@rating": data['@rating'],
	                          "@id": data['@id'],
	                          "image":playerimage
	                      }
	                      //console.log(res);
	                      val.push(res);
			});
			var l=value.length-1;
			if(i==l){
				return callback(null,val);
			}
			}, interval * i, i);
		}
		
	},
	getUserByIdService:(data,callback)=>{
		pool.query(`select *,IFNULL(profile,'') as profile from merto_tbl_users where user_id=?`,[data.user_id],
		(error,results,fields)=>{
		if(error){
					return callback(error);
				}
				return callback(null,results);
			});
		
	},
	/************************setting servic*************************/
	profileUpdateService:(data,callback)=>{
		pool.query(
			`update merto_tbl_users set name= ? , email= ?  where user_id=?`,
			[
				data.body.name,
				data.body.email,
				data.body.user_id
			],
			(error,results,fields)=>{
				if(error){
					return callback(error);
				}
				var files=data.files;
				if(files.length > 0){
					console.log(data.files);
					pool.query('update merto_tbl_users set profile = ? where user_id= ?',
					[
						'http://18.188.126.236:3000/public/images/uploads/'+data.files[0].filename,
						data.body.user_id
					],
					(error,results,fields)=>{
								if(error){
									return callback(error);
								}
								pool.query(`select * from merto_tbl_users where user_id=?`,[data.body.user_id],
							(error,results,fields)=>{
								if(error){
									return callback(error);
								}
							return callback(null,results);
							});
						});
				}
				else
				{
					pool.query(`select * from merto_tbl_users where user_id=?`,[data.body.user_id],
						(error,results,fields)=>{
							if(error){
								return callback(error);
							}
						return callback(null,results);
						});
					}
			})
	},
	updateMatchSettingService:(data,callback)=>{
		pool.query(
			`update merto_tbl_match_setting set `+data.key+`= ?   where user_id=?`,
			[
				data.value,
				data.user_id
			],
			(error,results,fields)=>{
				if(error){
					return callback(error);
				}
				pool.query(`select * from merto_tbl_match_setting where user_id=?`,[data.user_id],
						(error,results,fields)=>{
							if(error){
								return callback(error);
							}
						return callback(null,results);
				});
			})
	},
	appContentService:(data,callback)=>{
		pool.query(
			`select * from merto_tbl_app_content`,
				[],
			(error,results,fields)=>{
				if(error){
					return callback(null);
				}
				return callback(null,results);
			});
	},
	getFaqService:(data,callback)=>{
		pool.query(
		`select * from merto_tbl_help`,
		[],
		(error,results,fields)=>{
			if(error){
				return callback(null);
			}
			return callback(null,results);
		});
	},
	sendContactService:(data,callback)=>{
		pool.query(
			`INSERT INTO merto_tbl_contact (name,email,message,user_id) values(?,?,?,?)`,
				[
					data.name,
					data.email,
					data.message,
					data.user_id
				],
				(error,results,fields)=>{
				if(error){
					return callback(null);
				}
				return callback(null,results);
			});
	},
	matchPasswordService:(data,callback)=>{
		pool.query(
		`select * from merto_tbl_users where user_id=?`,
		[
			data.user_id
		],
		(error,results,fields)=>{
			if(error){
				return callback(null);
			}
			return callback(null,results);
		});
	},
	updatePasswordService:(data,callback)=>{
		pool.query(
			`update merto_tbl_users set password =? where user_id=?`,
			[
				data.password,
				data.user_id
			],
			(error,results,fields)=>{
				if(error){
					return callback(null);
				}
				pool.query(
				`select * from merto_tbl_users where user_id=?`,
				[
					data.user_id
				],
				(error,results,fields)=>{
					if(error){
						return callback(null);
					}
					return callback(null,results);
				});
		});
	},
	getMatchSettingService:(data,callback)=>{
		pool.query(
			`select * from merto_tbl_match_setting where user_id=?`,
			[
				data.user_id
			],
			(error,results,fields)=>{
				if(error){
					return callback(null);
				}
				if(results.length>0){
					return callback(null,results);
				}
				else{
					pool.query(
				`INSERT INTO merto_tbl_match_setting (user_id,show_postponed_match,poll,off_the_woodwork,injuries,substitutions,penalties,yellow_cards,red_cards) values (?,?,?,?,?,?,?,?,?)`,
				[
					data.user_id,
					'1',
					'1',
					'1',
					'1',
					'1',
					'1',
					'1',
					'1'
				],
				(error,results,fields)=>{
					if(error){
						return callback(null)
					}
					pool.query(`select * from merto_tbl_match_setting where user_id= ?`,[data.user_id],
					(error,results,fields)=>{
						if(error){
							return callback(null);
						}
						return callback(null,results);	
					});
				})
				}
				
		});
	},
	getNotificationService:(data,callback)=>{
		pool.query(
			`select * from merto_tbl_notification_setting where user_id=?`,
			[
				data.user_id
			],
			(error,results,fields)=>{
				if(error){
					return callback(null);
				}
				if(results.length>0){
					return callback(null,results);
				}
				else{
					pool.query(
				`INSERT INTO merto_tbl_notification_setting (user_id,match_reminder,lineup,match_start,goals,video_highlights,red_card,half_time_result,full_time_result) values (?,?,?,?,?,?,?,?,?)`,
				[
					data.user_id,
					'1',
					'1',
					'1',
					'1',
					'1',
					'1',
					'1',
					'1'
				],
				(error,results,fields)=>{
					if(error){
						return callback(null)
					}
					pool.query(`select * from merto_tbl_notification_setting where user_id= ?`,[data.user_id],
					(error,results,fields)=>{
						if(error){
							return callback(null);
						}
						return callback(null,results);	
					});
				})
				}
				
		});
	},
	updateNotificationSettingService:(data,callback)=>{
		pool.query(
			`update merto_tbl_notification_setting set `+data.key+`= ?  where user_id=?`,
			[
				data.value,
				data.user_id
			],
			(error,results,fields)=>{
				if(error){
					return callback(error);
				}
				pool.query(`select * from merto_tbl_notification_setting where user_id=?`,[data.user_id],
						(error,results,fields)=>{
							if(error){
								return callback(error);
							}
						return callback(null,results);
				});
			})
	},
	updateLanguageService:(data,callback)=>{
		pool.query(
			`update merto_tbl_users set language =? where user_id=?`,
			[
				data.language,
				data.user_id
			],
			(error,results,fields)=>{
				if(error){
					return callback(null);
				}
				pool.query(
				`select * from merto_tbl_users where user_id=?`,
				[
					data.user_id
				],
				(error,results,fields)=>{
					if(error){
						return callback(null);
					}
					return callback(null,results);
				});
		});
	},
	getUsertotalListService:(data,callback)=>{
		var query='';
		var key=data.search;

		if(key !=undefined && key !='' ){
			 query=" and name LIKE '%"+key+"%'";
		}
		
		pool.query(
				`select *,(select id from tbl_chat_room where (user_id=`+data.user_id+` or chat_user_id=`+data.user_id+`) and ( user_id=merto_tbl_users.user_id or chat_user_id=merto_tbl_users.user_id) ) as room_id from merto_tbl_users where user_id != `+data.user_id + query,
				[],
		(error,results,fields)=>{
					if(error){
						return callback(null);
					}
					return callback(null,results);
		});
		
	},
	getUserListService:(data,callback)=>{
		console.log(data);
		var query='';
		var key=data.search;
		if(key !=undefined && key !='' ){
			 query=" and name LIKE '%"+key+"%'";
		}
		var arr=[];
		var page = data.page;
	    var limit = 10;
	    var start = (page * limit) - limit;
		pool.query(
				`select *,IFNULL(profile,'') as profile,(select IF(ISNULL(id), 0, id) from tbl_chat_room where (user_id=`+data.user_id+` or chat_user_id=`+data.user_id+`) and ( user_id=merto_tbl_users.user_id or chat_user_id=merto_tbl_users.user_id) ) as room_id from merto_tbl_users where user_id != `+data.user_id + query+` limit `+ start+`,`+limit,
				[	],
		(error,results,fields)=>{
					if(error){
						return callback(null);
					}
					for(var i=0;i<results.length;i++){
						var room_id=results[i].room_id;
						if(results[i].room_id==null){
							var room_id='';
						}
						 obj={
								user_id:results[i].user_id,
								name:results[i].name,
								email:results[i].email,
								password:results[i].password,
								profile:results[i].profile,
								device_type:results[i].device_type,
								device_token:results[i].device_token,
								social_id:results[i].social_id,
								language:results[i].language,
								login_type:results[i].login_type,
								active_time:results[i].active_time,
								created:results[i].created,
								room_id:room_id,
												
							}
												arr.push(obj);
					}

					return callback(null,arr);
		});
		
	},
	sendMessageService:(data,callback)=>{
				var query='WHERE (user_id='+data.body.user_id+' or chat_user_id='+data.body.user_id+') and ( user_id='+data.body.chat_user_id+' or chat_user_id='+data.body.chat_user_id+')';
				pool.query(
					`select * from tbl_chat_room `+query,
					[
						data.body.user_id,
						data.body.chat_user_id
					],
					(error,results,fields)=>{
						if(error){
							return callback(error);
						}
						if(results.length==0)
						{
							pool.query(
							`insert into tbl_chat_room (user_id,chat_user_id,timestamp) values(?,?,?)`,
							[
								data.body.user_id,
								data.body.chat_user_id,
								Date.now()
							],
							(error,results,fields)=>{
								if(error){
									return callback(error);
								}
								var room_id=results.insertId;
								pool.query(
								`insert into tbl_chat_message (room_id,user_id,chat_user_id,message,timestamp) values(?,?,?,?,?)`,
								[
									room_id,
									data.body.user_id,
									data.body.chat_user_id,
									data.body.message,
									Date.now()
								],
								(error,results,fields)=>{
									if(error){
										return callback(error);
									}
									var files=data.files;
									if(files ==undefined && files==''){
										var files=[];
									}
									if(files.length > 0)
									{
										var type=data.files[0].mimetype;
										var t=type.split('/')
										
										pool.query(
										`update tbl_chat_message set file = ? , file_type = ? where id= ?`,
										[
											data.files[0].filename,
											t[0],
											results.insertId,
										],
										(error,results,fields)=>{
											if(error){
												return callback(error);
											}
											var userd=data.body.chat_user_id+','+data.body.user_id;
										console.log(`select * from merto_tbl_users where user_id in (`+userd+`)`);
										pool.query(
										`select * from merto_tbl_users where user_id in (`+userd+`)`,
										[],(error,results,fields)=>{
											if(error){
												return callback(error);
											}
											if(results[0].user_id==data.body.chat_user_id){
												var name=results[1].name;
												var device_token=results[0].device_token;
											}
											else{
												var name=results[0].name;
												var device_token=results[1].device_token;
											}
											var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
									        to:device_token, 
									        notification: {
									            title: name+' send new message', 
									            body: t[0], 
									        },
									       	type:'chat_message',
						                    data: {  //you can send only notification or only data(or include both)
						                                  type:'chat_message',
						                                  room_id:room_id,
						                                  user_id:data.body.user_id,
														  chat_user_id:data.body.chat_user_id,
						                                  title : name+' send new message',
						                                  file : data.files[0].filename ,
						                                  file_type :t[0],
						                                  message :data.body.message,
						                                  timestamp:Date.now()
						                    },
									    };
									    
									    fcm.send(message, function(err, response){

									        if (err) {
									            console.log("Something has gone wrong!");
									        } else {
									            console.log("Successfully sent with response: ", response);
									        }
									    });
									    pool.query(
										`select * from tbl_chat_message where room_id=? order by id desc`,
										[
											room_id
										],
										(error,results,fields)=>{
											if(error){
													return callback(error);
											}
											var res=results;
											pool.query(
											`update tbl_chat_message set is_read='1' where chat_user_id=? `,
											[
												data.body.user_id
											],
											(error,results,fields)=>{
												if(error){
														return callback(error);
												}
												
												return callback(null,res);

											});
										});
											//return callback(null,results);

										});
										});

										
									}
									else{
										var userd=data.body.chat_user_id+','+data.body.user_id;
										console.log(`select * from merto_tbl_users where user_id in (`+userd+`)`);
										pool.query(
										`select * from merto_tbl_users where user_id in (`+userd+`)`,
										[
											data.body.chat_user_id
										],(error,results,fields)=>{
											if(error){
												return callback(error);
											}
											if(results[0].user_id==data.body.chat_user_id){
												var name=results[1].name;
												var device_token=results[0].device_token;
											}
											else{
												var name=results[0].name;
												var device_token=results[1].device_token;
											}
											var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
									        to:device_token, 
									        notification: {
									            title: name+' send new message', 
									            body: data.body.message, 
									        },
									       	type:'chat_message',
						                    data: {  //you can send only notification or only data(or include both)
						                                  type:'chat_message',
						                                  room_id:room_id,
						                                  user_id:data.body.user_id,
														  chat_user_id:data.body.chat_user_id,
						                                  title : name+' send new message',
						                                  message :data.body.message,
						                                  file :'',
						                                  file_type :'',
						                                  timestamp:Date.now()

						                    },
									    };
									    
									    fcm.send(message, function(err, response){
									        if (err) {
									            console.log("Something has gone wrong!");
									        } else {
									            console.log("Successfully sent with response: ", response);
									        }
									    });
									    pool.query(
										`select * from tbl_chat_message where room_id=? order by id desc`,
										[
											room_id
										],
										(error,results,fields)=>{
											if(error){
													return callback(error);
											}
											var res=results;
											pool.query(
											`update tbl_chat_message set is_read='1' where chat_user_id=? `,
											[
												data.body.user_id
											],
											(error,results,fields)=>{
												if(error){
														return callback(error);
												}
												
												return callback(null,res);

											});
										});
										//	return callback(null,results);

										});
									}
								});
								
							});
						}
						else{
							var room_id=results[0].id;
							pool.query(
							`update tbl_chat_room set timestamp =? where id=?`,
							[
								Date.now(),
								room_id
							],
							(error,results,fields)=>{
								if(error){
									return callback(error);
								}
							});

								pool.query(
								`insert into tbl_chat_message (room_id,user_id,chat_user_id,message,timestamp) values(?,?,?,?,?)`,
								[
									room_id,
									data.body.user_id,
									data.body.chat_user_id,
									data.body.message,
									Date.now()
								],
								(error,results,fields)=>{
									if(error){
										return callback(error);
									}
									var files=data.files;
									if(files ==undefined && files==''){
										var files=[];
									}
									if(files !=undefined && files.length > 0 )
									{
										console.log(files);
										var type=data.files[0].mimetype;
										var t=type.split('/')
										console.log(files);
										pool.query(
										`update tbl_chat_message set file = ? , file_type = ? where id= ?`,
										[
											data.files[0].filename,
											t[0],
											results.insertId,
										],
										(error,results,fields)=>{
											if(error){
												return callback(error);
											}
											var userd=data.body.chat_user_id+','+data.body.user_id;
										console.log(`select * from merto_tbl_users where user_id in (`+userd+`)`);
										pool.query(
										`select * from merto_tbl_users where user_id in (`+userd+`)`,
										[
											data.body.chat_user_id
										],(error,results,fields)=>{
											if(error){
												return callback(error);
											}
											if(results[0].user_id==data.body.chat_user_id){
												var name=results[1].name;
												var device_token=results[0].device_token;
											}
											else{
												var name=results[0].name;
												var device_token=results[1].device_token;
											}
											var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
									        to:device_token, 
									        notification: {
									            title: name+' send new message', 
									            body: t[0], 
									        },
									       	type:'chat_message',
						                    data: {  //you can send only notification or only data(or include both)
						                                  type:'chat_message',
						                                  room_id:room_id,
						                                  user_id:data.body.user_id,
														  chat_user_id:data.body.chat_user_id,
						                                  title : name+' send new message',
						                                  file : data.files[0].filename ,
						                                  file_type :t[0],
						                                  message :data.body.message,
						                                  timestamp:Date.now()
						                    },
									    };
									    console.log(message);
									    fcm.send(message, function(err, response){

									        if (err) {
									            console.log("Something has gone wrong!");
									        } else {
									            console.log("Successfully sent with response: ", response);
									        }
									    });
									    pool.query(
										`select * from tbl_chat_message where room_id=? order by id desc`,
										[
											room_id
										],
										(error,results,fields)=>{
											if(error){
													return callback(error);
											}
											var res=results;
											pool.query(
											`update tbl_chat_message set is_read='1' where chat_user_id=? `,
											[
												data.body.user_id
											],
											(error,results,fields)=>{
												if(error){
														return callback(error);
												}
												
												return callback(null,res);

											});
										});
											//return callback(null,results);

										});

										});
									}
									else{
										var userd=data.body.chat_user_id+','+data.body.user_id;
										console.log(`select * from merto_tbl_users where user_id in (`+userd+`)`);
										pool.query(
										`select * from merto_tbl_users where user_id in (`+userd+`)`,
										[
											data.body.chat_user_id
										],(error,results,fields)=>{
											if(error){
												return callback(error);
											}
											if(results[0].user_id==data.body.chat_user_id){
												var name=results[1].name;
												var device_token=results[0].device_token;
											}
											else{
												var name=results[0].name;
												var device_token=results[1].device_token;
											}
											var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
									        to:device_token, 
									        notification: {
									            title: 'New Message', 
									            body: name+' send new message', 
									        },
									       	type:'chat_message',
						                    data: {  //you can send only notification or only data(or include both)
						                                  type:'chat_message',
						                                  room_id:room_id,
						                                  user_id:data.body.user_id,
														  chat_user_id:data.body.chat_user_id,
						                                  title : name+' send new message',
						                                  message :data.body.message,
						                                  file :'',
						                                  file_type :'',
						                                  timestamp:Date.now()
						                    },
									    };
									    
									    fcm.send(message, function(err, response){
									        if (err) {
									            console.log("Something has gone wrong!");
									        } else {
									            console.log("Successfully sent with response: ", response);
									        }
									    });
									    pool.query(
										`select * from tbl_chat_message where room_id=? order by id desc`,
										[
											room_id
										],
										(error,results,fields)=>{
											if(error){
													return callback(error);
											}
											var res=results;
											pool.query(
											`update tbl_chat_message set is_read='1' where chat_user_id=? `,
											[
												data.body.user_id
											],
											(error,results,fields)=>{
												if(error){
														return callback(error);
												}
												return callback(null,res);
											});
										});

										});
									}
								});
						}
					});
	},
	totalViewMessageService:(data,callback)=>{
				pool.query(
					`select * from tbl_chat_message where room_id=? order by id desc`,
					[
						data.room_id
					],
					(error,results,fields)=>{
						if(error){
								return callback(error);
						}
						return callback(null,results);
					});
	},
	viewMessageService:(data,callback)=>{
				
				pool.query(
					`select * from tbl_chat_message where room_id=? order by id asc`,
					[
						data.room_id
					],
					(error,results,fields)=>{
						if(error){
								return callback(error);
						}
						var res=results;
						pool.query(
						`update tbl_chat_message set is_read='1' where chat_user_id=? `,
						[
							data.user_id
						],
						(error,results,fields)=>{
							if(error){
									return callback(error);
							}
							
							return callback(null,res);

						});
					});
	},
	getTotalUserChatListService:(data,callback)=>{
				pool.query(
					`select * from tbl_chat_room where (user_id =`+data.user_id+` or chat_user_id=`+data.user_id+`) order by timestamp DESC`,
					[],
					(error,results,fields)=>{
						if(error){
								return callback(error);
						}
						return callback(null,results);

				});
	},
	getUserChatListService:(data,callback)=>{
				var page = data.page;
			    var limit = 10;
			    var start = (page * limit) - limit;
				pool.query(
					`select * from tbl_chat_room where (user_id =`+data.user_id+` or chat_user_id=`+data.user_id+`) order by timestamp DESC limit `+ start+`,`+limit,
					[],
					(error,results,fields)=>{
						if(error){
								return callback(error);
						}
						var obj;
						var res=results;
						var arr = [];
						for(var i=0;i<res.length;i++)
						{
								var userid=res[i].user_id;
								if(data.user_id !=userid){
									var id=userid;
									var room_id=res[i].id;
								}
								else{
									var id=res[i].chat_user_id;
									var room_id=res[i].id;
								}
								
								pool.query(
										`select  name,profile,active_time,user_id,(select count('*') from tbl_chat_message where user_id=merto_tbl_users.user_id and chat_user_id=`+data.user_id+` and is_read='0' ) as unread_count , (select id from tbl_chat_room where id =`+room_id+`) as room_id,
										(select message from tbl_chat_message where room_id =`+room_id+` order by id desc limit 1) as message1,(select file from tbl_chat_message where room_id =`+room_id+` order by id desc limit 1) as file1,(select file_type from tbl_chat_message where room_id =`+room_id+` order by id desc limit 1) as file_type1
										from merto_tbl_users where user_id =`+id,
										[ ],
										(error,results,fields)=>{
											if(error){
													return callback(error);
											}
										
											 obj={
												room_id:results[0].room_id,
												user_id:data.user_id,
												chat_user_id:results[0].user_id,
												message:results[0].message1,
												file:results[0].file1,
												file_type:results[0].file_type1,
												user_name:results[0].name,
												active_time:results[0].active_time,
												profile:results[0].profile,
												unread_count:results[0].unread_count
												}
												arr.push(obj);	
												if(res.length==arr.length){
													return callback(null,arr);
												}
												
								});
						}
					});
	},
	deleteChatService:(data,callback)=>{
				pool.query(
						`DELETE tbl_chat_room, tbl_chat_message FROM tbl_chat_room INNER JOIN tbl_chat_message ON tbl_chat_message.room_id = tbl_chat_room.id WHERE tbl_chat_room.id in (`+data.id+`)`,
						[],
						(error,results,fields)=>{
							if(error){
									return callback(error);
							}
							
							return callback(null,results);

						});
	},
	updateDeviceTokenService:(data,callback)=>{
				pool.query(
					`update merto_tbl_users set device_type= ? , device_token= ? , active_time= ? where user_id=? `,
					[
						data.device_type,
						data.device_token,
						Date.now(),
						data.user_id
					],
					(error,results,fields)=>{
						if(error){
							return callback(error);
						}
						return callback(null,results);
					});
	},
	addBetService:(data,callback)=>{
				pool.query(
					`INSERT INTO  merto_tbl_bet (user_id,leadge_id,team1_id,team2_id,bet_name,slip_no,timestamp) values (?,?,?,?,?,?,?)`,
					[
						data.user_id,
						data.leadge_id,
						data.team1_id,
						data.team2_id,
						data.bet_name,
						data.slip_no,
						Date.now()
					],
					(error,results,fields)=>{
						if(error){
							return callback(error);
						}
						return callback(null,results);
					});
	},
	totalBetService:(data,callback)=>{
				pool.query(
					`select * from merto_tbl_bet where user_id=?`,
					[
						data.user_id
					],
					(error,results,fields)=>{
						if(error){
								return callback(error);
						}
						return callback(null,results);
					});
	},
	forgetPasswordService:(data,callback)=>{
		pool.query(
			`select * from merto_tbl_users where email=?`,[data.email],(error,results,fields)=>{
			if(error){
				return callback(null);
			}
			if(results.length >0){
				var pass= Math.floor(100000 + Math.random() * 900000).toString().substr(0, 6)
				//send email
			const sgMail = require('@sendgrid/mail')
			sgMail.setApiKey('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')
			const msg = {
			to: data.email, // Change to your recipient
			from: 'merto.app@gmail.com', // Change to your verified sender
			subject: 'Forget password',
			text: 'Your new password otp is :' + pass,
			}
			sgMail
			.send(msg)
			.then(() => {
			})
			.catch((error) => {
			})

				pool.query(
				`update merto_tbl_users set otp=?,otp_expire_time=? where email=?`,
				[ 
					pass,
					Date.now(),
					data.email
				],
				(error,results,fields)=>{
					if(error){
						return callback(error);
					}
					var res=1;
					return callback(null,res);
				});
			}
			else{
				var res =0;
				return callback(null,res);
			}
			
		});
	},
}

