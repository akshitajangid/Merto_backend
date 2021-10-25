
const pool =require('./config/db');
var request = require("request");

function deleteexistingdata(type){
	return new Promise(function (resolve, reject) {
	pool.query(
		'DELETE merto_tbl_live_score,merto_tbl_live_match_data FROM merto_tbl_live_score INNER JOIN merto_tbl_live_match_data ON `merto_tbl_live_score`.`auto_id`= `merto_tbl_live_match_data`.live_score_id WHERE `merto_tbl_live_score`.type = ? ',
		[
			type,
		],
		(error,results,fields)=>{
			if(error){
				return callback(null);
			}
			resolve(results);
		});
	});
 }


function storecategory(sport,updated,name,gid,id,file_group,iscup,type){
    return new Promise(function (resolve, reject) {
	pool.query(
	'INSERT INTO  merto_tbl_live_score (`@sport`,`@updated`,`@name`,`@gid`,`@id`,`@file_group`,`@iscup`,`type`) values (?,?,?,?,?,?,?,?)',
	[
		sport,
		updated,
		name,
		gid,
		id,
		file_group,
		iscup,
        type
		],
		(error,results,fields)=>{
		if(error){
			return callback(error);
		}
		resolve(results.insertId);
    });
	})
}

function storematch(date,formatted_date,id,visitorteamid,match,insetid){
	return new Promise(function (resolve, reject) {
	pool.query(
		'INSERT INTO  merto_tbl_live_match_data (`@date`,`@formatted_date`,localteam_id,vistiorteam_id,json,live_score_id) values (?,?,?,?,?,?)',
		[
			date,
			formatted_date,
			id,
			visitorteamid,
			JSON.stringify(match),
			insetid
		],
		(error,results,fields)=>{
			if(error){
				//console.log(error);
				reject(error);
			}
			resolve(results.insertId);
		});
	})
}

function storeteam(id){
    return new Promise(function (resolve, reject) {
		pool.query(
			`select *  from merto_tbl_team where id =?`,
			[
				id,
			],
			(error,results,fields)=>{
				if(error){
					reject(error);
				}
			//console.log(results.length);
			if(results.length ==0){
					//console.log(id);
					var options = { method: 'GET',
					url: 'http://www.goalserve.com/getfeed/69a39912a09b45a2f60e08d8f941eccb/soccerstats/team/'+id,
					qs: { json: '1' },
					headers: 
					{'cache-control': 'no-cache'} };
					request(options, async function (error, response, body) {
					if (error) throw new Error(error);
					if(body){
						var isjson=await checkjson(body);
						if (isjson){
							var dj=JSON.parse(body);
							if(dj){
								var team=dj.teams;
								if(team){
										var teams=team.team;
										var tdata=teams;
										var id=tdata['@id'] ? tdata['@id'] : null;
										var is_national_team=tdata['@is_national_team'] ? tdata['@is_national_team'] : null;
										var name=tdata['name'] ? tdata['name'] : null;
										var fullname=tdata['fullname'] ? tdata['fullname'] : null;
										var country=tdata['country'] ? tdata['country'] : null;
										var venue_name =tdata['venue_name'] ? tdata['venue_name'] : null;
										var venue_id =tdata['venue_id'] ? tdata['venue_id'] : null;
										var venue_image =tdata['venue_image'] ? tdata['venue_image'] : null;
										var image =tdata['image'] ? tdata['image'] : null;
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
												reject(error);
											}
											resolve(results);
											
										})
								}
								else{
									resolve(1);
								}
							}
							else{
								resolve(1);
							}
						}
						else{
							resolve(1);
						}
					}
					else{
							resolve(1);
					}
					});
			}
			else{
				resolve(1);
			}
		});
	})
}

function getfaviourateTeam(user_id){
	return new Promise(function (resolve, reject) {
		var team_id=[];
		pool.query(
			`select team_id from merto_tbl_fav_team where user_id=?`,
			[user_id],
			(error,results,fields)=>{
				if(error){
					reject(error);
				}
				for(var i=0;i<results.length;i++ ){
					team_id.push(results[i].team_id);
				}
				resolve(team_id);
		})
	})
}
function getcategoryTotaldata(data){
	return new Promise(function (resolve, reject) {
		
		var team_id=[];
		pool.query(
			'SELECT DISTINCT live_score_id FROM `merto_tbl_fav_team` as fav_team Inner JOIN merto_tbl_live_match_data as match_data on match_data.localteam_id= fav_team.team_id Inner JOIN merto_tbl_live_score as live_score on live_score.auto_id= match_data.live_score_id WHERE user_id= ? and type =? ',
			[data.user_id,
			 data.type],
			(error,results,fields)=>{
				if(error){
					reject(error);
				}
				for(var i=0;i<results.length;i++ ){
					team_id.push(results[i].live_score_id);
				}
				resolve(team_id);
				
		})
	})
}

function getcategorydata(data){
	return new Promise(function (resolve, reject) {
		var page = data.page;
	    var limit = 10;
	    var start = (page * limit) - limit;
		var team_id=[];
		pool.query(
			'SELECT DISTINCT live_score_id FROM `merto_tbl_fav_team` as fav_team Inner JOIN merto_tbl_live_match_data as match_data on match_data.localteam_id= fav_team.team_id Inner JOIN merto_tbl_live_score as live_score on live_score.auto_id= match_data.live_score_id WHERE user_id= ? and type =? limit '+ start+`,`+limit,
			[data.user_id,
			 data.type],
			(error,results,fields)=>{
				if(error){
					reject(error);
				}
				for(var i=0;i<results.length;i++ ){
					team_id.push(results[i].live_score_id);
				}
				resolve(team_id);
				
		})
	})
}
function getmatch(id,team_id){
	return new Promise(function (resolve, reject) {
		var arr=[];
		pool.query(
			'SELECT *  from merto_tbl_live_match_data where live_score_id= ? and localteam_id In ('+ team_id+') ',
			[id],
			async (error,results,fields)=>{
				if(error){
					reject(error);
				}
				var date=''; var formatted_date='';
				for(var i=0;i<results.length;i++ ){
					var localteam_id=results[i].localteam_id;
					var locateanimage= await getTeamimage(localteam_id)
					var vistiorteam_id=results[i].vistiorteam_id;
					var vistiorteamimage=await getTeamimage(vistiorteam_id)
					var re=JSON.parse(results[i].json);
					var matcharray={
						'@status':re['@status'],
						'@timer':re['@timer'],
						'@date':re['@date'],
						'@formatted_date':re['@formatted_date'],
						'@time':re['@time'],
						'@commentary_available':re['@commentary_available'],
						'@venue':re['@venue'],
						'@v':re['@v'],
						'@static_id':re['@static_id'],
						'@fix_id':re['@fix_id'],
						'@id':re['@id'],
						'localteam':re['localteam'],
						'localteam_image': locateanimage,
						'visitorteam':re['visitorteam'],
						'visitorteam_image':vistiorteamimage,
						'events':re['events'],
						'ht':re['ht'],
						'ft':re['ft'],
					};
					date=results[i]['@date'];
					formatted_date=results[i]['@formatted_date'];
					arr.push(matcharray);
				}
				var obj={
					'@date':date,
					'@formatted_date':formatted_date,
					'match':arr
				}
				
				resolve(obj);
		})
	});
}

function getTeamimage(teamid){
	return new Promise(function (resolve, reject) {
		pool.query(
			'SELECT * from merto_tbl_team where id =?',
			[teamid],
			(error,results,fields)=>{
				if(error){
					reject(error);
				}
			if(results.length>0)
			{
				resolve(results[0].image);
			}else{
				resolve('');
			}	
			
		})
	});
}

function getteammatchlist(data,livescoreid,teamid){
			return new Promise(function (resolve, reject) {
				var page = data.page;
				var limit = 10;
				var start = (page * limit) - limit;
				var arr=[];
				if(livescoreid !='' && teamid !=''){
					pool.query(
						'SELECT *  from merto_tbl_live_match_data where live_score_id In('+livescoreid+') and localteam_id In ('+ teamid+') limit '+ start+','+limit,
						[],
						async (error,results,fields)=>{
							if(error){
								reject(error);
							}
							var date=''; var formatted_date='';
							if(results){
								for(var i=0;i<results.length;i++ ){
									var localteam_id=results[i].localteam_id;
									var locateanimage= await getTeamimage(localteam_id)
									var vistiorteam_id=results[i].vistiorteam_id;
									var vistiorteamimage=await getTeamimage(vistiorteam_id)
									var re=JSON.parse(results[i].json);
									var matcharray={
										'@status':re['@status'],
										'@timer':re['@timer'],
										'@date':re['@date'],
										'@formatted_date':re['@formatted_date'],
										'@time':re['@time'],
										'@commentary_available':re['@commentary_available'],
										'@venue':re['@venue'],
										'@v':re['@v'],
										'@static_id':re['@static_id'],
										'@fix_id':re['@fix_id'],
										'@id':re['@id'],
										'localteam':re['localteam'],
										'localteam_image': locateanimage,
										'visitorteam':re['visitorteam'],
										'visitorteam_image':vistiorteamimage,
										'events':re['events'],
										'ht':re['ht'],
										'ft':re['ft'],
									};
									date=results[i]['@date'];
									formatted_date=results[i]['@formatted_date'];
									arr.push(matcharray);
								}
							}
							var obj={
								'@date':date,
								'@formatted_date':formatted_date,
								'match':arr
							}
							resolve(obj);
					})
				}
				else{
					var obj={
						'@date':'',
						'@formatted_date':'',
						'match':arr
					}
					resolve(obj);
				}
			});
}

function getmatchdata(livescoreid,team_id){
	return new Promise(function (resolve, reject) {
		var arr=[];
		if(livescoreid !=''){
			pool.query(
				'SELECT* from merto_tbl_live_score where auto_id In ('+livescoreid+')',
				[],
				async (error,results,fields)=>{
					if(error){
						reject(error);
					}
					var sport=''; var updated='';
					if(results){
						for(var i=0;i<results.length;i++ ){
							var matchs='';
							var matchs= await getmatch(results[i].auto_id,team_id);
							
							var re={
								'@name':results[i]['@name'],
								'@gid':results[i]['@gid'],
								'@id':results[i]['@id'],
								'@file_group':results[i]['@file_group'],
								'@iscup':results[i]['@iscup'],
								'matches':matchs,
							}
							arr.push(re);
							sport=results[i]['@sport'];
							updated=results[i]['@updated'];
						}
						var obj={
							'@sport':sport,
							'@updated':updated,
							'category':arr
						}
						resolve(obj);
					}
					else{
						var obj={
							'@sport':sport,
							'@updated':updated,
							'category':arr
						}
						resolve(obj);
					}
			})
		}
		else{
			var obj={
				'@sport':'',
				'@updated':'',
				'category':arr
			}
			resolve(obj);
		}
	})
}

function getcompetitionmatch(id,user_id){
	return new Promise(function (resolve, reject) {
		var arr=[];
		pool.query(
			'SELECT *  from merto_tbl_live_match_data where live_score_id= ?',
			[id],
			async (error,results,fields)=>{
				if(error){
					reject(error);
				}
				var date=''; var formatted_date='';
				for(var i=0;i<results.length;i++ ){
					var localteam_id=results[i].localteam_id;
					var locateanimage= await getTeamimage(localteam_id)
					var vistiorteam_id=results[i].vistiorteam_id;
					var vistiorteamimage=await getTeamimage(vistiorteam_id)
					var re=JSON.parse(results[i].json);
					if(localteam_id){
						var localteamobj={
							"@name": re['localteam']['@name'],
							"@goals": re['localteam']['@goals'],
							"@id": re['localteam']['@id'],
							"image" : await getTeamimage(id),
							"is_follow":await getfollowteam(user_id,localteam_id),
							"is_faviourate":await getfavteam(user_id,localteam_id)
						}
					}
					else{
						var localteamobj={}
					}
					if(vistiorteam_id){
						var visitorteamobj={
							"@name": re['visitorteam']['@name'],
							"@goals": re['visitorteam']['@goals'],
							"@id": re['visitorteam']['@id'],
							"image" : await getTeamimage(id),
							"is_follow":await getfollowteam(user_id,vistiorteam_id),
							"is_faviourate":await getfavteam(user_id,vistiorteam_id)
						}
					}
					else{
						var visitorteamobj={}
					}

					var matcharray={
						'@status':re['@status'],
						'@timer':re['@timer'],
						'@date':re['@date'],
						'@formatted_date':re['@formatted_date'],
						'@time':re['@time'],
						'@commentary_available':re['@commentary_available'],
						'@venue':re['@venue'],
						'@v':re['@v'],
						'@static_id':re['@static_id'],
						'@fix_id':re['@fix_id'],
						'@id':re['@id'],
						'localteam':localteamobj,
						'visitorteam':visitorteamobj,
						'events':re['events'],
						'ht':re['ht'],
						'ft':re['ft'],
					};
					date=results[i]['@date'];
					formatted_date=results[i]['@formatted_date'];
					arr.push(matcharray);
				}
				var obj={
					'@date':date,
					'@formatted_date':formatted_date,
					'match':arr
				}
				//console.log(results);
				resolve(obj);
		})
	});
}


function getTotalCompetition(data){
	//console.log(data);
	return new Promise(function (resolve, reject) {
		console.log('SELECT * FROM `merto_tbl_live_score` where  type ='+data.type);
		var team_id=[];
		pool.query(
			'SELECT * FROM `merto_tbl_live_score` where  type =? ',
			[ data.type],
			(error,results,fields)=>{
				if(error){
					reject(error);
				}
				for(var i=0;i<results.length;i++ ){
					team_id.push(results[i].live_score_id);
				}
				resolve(team_id);
				
		})
	})
}

function getcompetition(data){
	return new Promise(function (resolve, reject) {
		var page = data.page;
	    var limit = 10;
	    var start = (page * limit) - limit;
		var team_id=[];
		var arr=[];
		pool.query(
			'SELECT * FROM `merto_tbl_live_score` where  type =? limit '+ start+`,`+limit,
			[
			 data.type],
			async (error,results,fields)=>{
				if(error){
					reject(error);
				}
				var sport=''; var updated='';
					if(results){
						for(var i=0;i<results.length;i++ ){
							var matchs='';
							var matchs= await getcompetitionmatch(results[i].auto_id,data.user_id);
							
							var re={
								'@name':results[i]['@name'],
								'@gid':results[i]['@gid'],
								'@id':results[i]['@id'],
								'@file_group':results[i]['@file_group'],
								'@iscup':results[i]['@iscup'],
								'matches':matchs,
							}
							arr.push(re);
							sport=results[i]['@sport'];
							updated=results[i]['@updated'];
						}
						var obj={
							'@sport':sport,
							'@updated':updated,
							'category':arr
						}
						resolve(obj);
					}
					else{
						var obj={
							'@sport':sport,
							'@updated':updated,
							'category':arr
						}
						resolve(obj);
					}
				
		})
	})
}

function updatematchdata(data){
	return new Promise(function (resolve, reject) {
		var team_id=[];
		pool.query(
			'UPDATE merto_tbl_live_score SET type = CASE WHEN type = "d-1" THEN "d-2" WHEN type = "d-2" THEN "d-3" WHEN type = "d-3" THEN "d-4" WHEN type = "d-4" THEN "d-5" WHEN type = "d-5" THEN "d-6" WHEN type = "d-6" THEN "d-7" WHEN type = "d-7" THEN "d-8" WHEN type = "home" THEN "d-1" END',
			[],
			(error,results,fields)=>{
				if(error){
					reject(error);
				}
				resolve(1);
				
		})
	})
}

function matchdetailsdata(data){
	return new Promise(function (resolve, reject) {
		var user_id=data.user_id;
		var request = require("request");
		var url='http://www.goalserve.com/getfeed/69a39912a09b45a2f60e08d8f941eccb/commentaries/match?id='+data.match_id+'&league='+data.league_id;
		var options = { method: 'GET',
		url: url,
		qs: { json: '1' },
		headers: 
		{  'postman-token': '88180739-082c-1fb4-71c3-dcb304780ff1',
		   'cache-control': 'no-cache' } };

		request(options, async function (error, response, body) {
			if (error) throw new Error(error);
				var dj=JSON.parse(body);
				var commentaries= dj.commentaries;
				
				if(commentaries){
					var localimage='';
					var visitorimage='';
					if(commentaries.tournament){
						var tounaments=commentaries.tournament;
						if(tounaments){
							var match=tounaments.match;
							if(match){
								var localteam=match.localteam;
								var visitorteam=match.visitorteam;
								var player_stats=match.player_stats;
								if(player_stats){
									if(localteam){
										var id=localteam['@id'];
										var localteamobj={
											"@name": localteam['@name'],
											"@goals": localteam['@goals'],
											"@id": localteam['@id'],
											"image" : await getTeamimage(id),
											"is_follow":await getfollowteam(user_id,id),
											"is_faviourate":await getfavteam(user_id,id)
										}
									}
									else{
										var localteamobj={}
									}
									if(visitorteam){
										var id=visitorteam['@id'];
										var visitorteamobj={
											"@name": visitorteam['@name'],
											"@goals": visitorteam['@goals'],
											"@id": visitorteam['@id'],
											"image" : await getTeamimage(id),
											"is_follow":await getfollowteam(user_id,id),
											"is_faviourate":await getfavteam(user_id,id)
										}
										
									}
									else{
										var visitorteamobj={}
									}
									var localteamplayerarray=player_stats.localteam;
									var localteamplayer=localteamplayerarray.player;
					
									var visitorteamteamplayerarray=player_stats.visitorteam;
									var visitorteamplayer=visitorteamteamplayerarray.player;
									
										var localplayer=await getplayerService(localteamplayer);
										var visitorteam=await getplayerService(visitorteamplayer);
										
										var lo={
												'player':localplayer
										}
										var vi={
												'player':visitorteam
										}
										var player_stats={
											'localteam':lo,
											'visitorteam':vi
										}
										var res1={
												"@status": match['@status'],
												"@timer": match['@timer'],
												"@date": match['@date'],
												"@formatted_date": match['@formatted_date'],
												"@time":match['@time'],
												"@static_id": match['@static_id'],
												"@id": match['@id'],
												"localteam": localteamobj,
												"visitorteam": visitorteamobj,
												"matchinfo": match['matchinfo'],
												"summary": match['summary'],
												"stats": match['stats'],
												"teams": match['teams'],
												"substitutes": match['substitutes'],
												"substitutions": match['substitutions'],
												"commentaries": match['commentaries'],
												"coaches": match['coaches'],
												"player_stats": player_stats
											};
											var tournamentobj={
												"@name": tounaments["@name"],
												"@id": tounaments["@id"],
												"match": res1
											};
											var res2={
												"@sport": commentaries["@sport"],
												"tournament": tournamentobj
											};
											resolve(res2);
								}
								else{
									if(localteam){
										var id=localteam['@id'];
										var localteamobj={
											"@name": localteam['@name'],
											"@goals": localteam['@goals'],
											"@id": localteam['@id'],
											"image" : await getTeamimage(id),
											"is_follow":await getfollowteam(user_id,id),
											"is_faviourate":await getfavteam(user_id,id)
										}
									}
									else{
										var localteamobj={}
									}
									if(visitorteam){
										var id=visitorteam['@id'];
										var visitorteamobj={
											"@name": visitorteam['@name'],
											"@goals": visitorteam['@goals'],
											"@id": visitorteam['@id'],
											"image" : await getTeamimage(id),
											"is_follow":await getfollowteam(user_id,id),
											"is_faviourate":await getfavteam(user_id,id)
										}
										
									}
									else{
										var visitorteamobj={}
									}
									var res1={
										"@status": match['@status'],
										"@timer": match['@timer'],
										"@date": match['@date'],
										"@formatted_date": match['@formatted_date'],
										"@time":match['@time'],
										"@static_id": match['@static_id'],
										"@id": match['@id'],
										"localteam": localteamobj,
										"visitorteam": visitorteamobj,
										"matchinfo": match['matchinfo'],
										"summary": match['summary'],
										"stats": match['stats'],
										"teams": match['teams'],
										"substitutes": match['substitutes'],
										"substitutions": match['substitutions'],
										"commentaries": match['commentaries'],
										"coaches": match['coaches'],
										"player_stats": {}
									};
									var tournamentobj={
										"@name": tounaments["@name"],
										"@id": tounaments["@id"],
										"match": res1
									};
									var res2={
										"@sport": commentaries["@sport"],
										"tournament": tournamentobj
									};
									resolve(res2);
								}
							}
							else{
								var tournamentobj={
									"@name": tounaments["@name"],
									"@id": tounaments["@id"],
									"match": res1
								};
								var res2={
									"@sport": commentaries["@sport"],
									"tournament": tournamentobj
								};
								resolve(res2);
							}
						}
						else{
							var res2={
								"@sport": commentaries["@sport"],
								"tournament": {}
							};
							resolve(res2);
						}
					}
					else{
						var res2={
							"@sport": commentaries["@sport"],
							"tournament": {}
						};
						resolve(res2);
					}
				}
				else{
					var res2={
						"@sport": '',
						"tournament": {}
					};
					resolve(res2);
				}

		});
	})	
}

function deleteleaguedata(){
	return new Promise(function (resolve, reject) {
		pool.query(
			'DELETE FROM `merto_tbl_league` WHERE 1',
			[],
			(error,results,fields)=>{
				if(error){
					return callback(null);
				}
				resolve(results);
			});
		});
}

function storeleaguedata(id,country,name,season,date_start,date_end,iscup,live_lineups,live_stats,path){
	return new Promise(function (resolve, reject) {
	pool.query(
		'INSERT INTO `merto_tbl_league`(`@id`, `@country`, `@name`, `@season`, `@date_start`, `@date_end`, `@iscup`, `@live_lineups`, `@live_stats`, `@path`) values (?,?,?,?,?,?,?,?,?,?)',
		[
			id,
			country,
			name,
			season,
			date_start,
			date_end,
			iscup,
			live_lineups,
			live_stats,
			path
		],
		(error,results,fields)=>{
			if(error){
				console.log(error);
				reject(error);
			}
			resolve(1);
		});
	})
}
function checkjson(str) {
	return new Promise(function (resolve, reject) {
	try {
        JSON.parse(str);
    } catch (e) {
		resolve(false);
    }
		resolve(true);
	});
}

function getplayerService(value){
	return new Promise(async function (resolve, reject) {
		var val=[];
		for(var i=0 ;i< value.length;i++){
			var data=value[i];
			var tid=data['@id'];
			var image= await getplayerimageService(tid);
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
				"image":image
			}
			val.push(res);		
		}
		resolve(val)
	});
}
function getfollowteam(user_id,id){
	return new Promise(function (resolve, reject) {
		pool.query(
			'select count(*) as total from merto_tbl_follow_teams where user_id = ? and team_id =?',
			[user_id,
			id],
			(error,results,fields)=>{
				if(error){
					return callback(null);
				}
			
				resolve(results[0].total);
		});
		
	});
}
function getfavteam(user_id,id){
	return new Promise(function (resolve, reject) {
		pool.query(
			'select count(*) as total from merto_tbl_fav_team where user_id = ? and team_id =?',
			[user_id,
			id],
			(error,results,fields)=>{
				if(error){
					return callback(null);
				}
				resolve(results[0].total);
		});
		
	});
}
function getplayerimageService(tid){
	return new Promise(function (resolve, reject) {
		var p_image='';
		var request = require("request");
		var options = { method: 'GET',
		url: 'http://www.goalserve.com/getfeed/69a39912a09b45a2f60e08d8f941eccb/soccerstats/player/'+tid,
		qs: { json: '1' },
		headers: 
		{ 'postman-token': '81c2df80-d63a-ca0f-6806-cc0b602f6c2a',
			'cache-control': 'no-cache' } };

		request(options, async function (error, response, body) {
			if (error) throw new Error(error);
				if(body){
					var isjson=await checkjson(body);
					if (isjson){
						var dj=JSON.parse(body);
						if(dj){
							var playerjson=dj.players;
							if(playerjson){
								var player=playerjson.player;
								if(player){
									var playerimage=player.image;
									if(playerimage){
										p_image=playerimage;
										p_image=playerimage;
										resolve(p_image);
									}
									else{
										resolve(p_image);
									}
								}
								else{
									resolve(p_image);
								}
							}
							else{
								resolve(p_image);
							}
						}
						else{
							resolve(p_image);
						}
					}
					else{
						resolve(p_image);
					}
				}
				else{
					resolve(p_image);
				}
		});
		
	});
	
}

module.exports = {
    storecategory,
	storematch,
	storeteam,
	deleteexistingdata,
	getfaviourateTeam,
	getcategorydata,
	getmatchdata,
	getmatch,
	getcategoryTotaldata,
	getTeamimage,
	getcompetition,
	getTotalCompetition,
	getcompetitionmatch,
	updatematchdata,
	matchdetailsdata,
	getteammatchlist,
	deleteleaguedata,
	storeleaguedata,
	checkjson,
	getplayerimageService,
	getplayerService,
	getfavteam,
	getfollowteam
}
//DELETE merto_tbl_live_score,merto_tbl_live_match_data FROM merto_tbl_live_score INNER JOIN merto_tbl_live_match_data ON `merto_tbl_live_score`.`auto_id`= `merto_tbl_live_match_data`.live_score_id WHERE `merto_tbl_live_score`.type = 'home'
