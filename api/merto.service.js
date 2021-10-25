const pool =require('../config/db');
const helpers = require("../helper");

async function storeLiveDataService(data,callback){
	var type=data.type;
	await helpers.deleteexistingdata(type);
	var request = require("request");
	var options = { method: 'GET',
	url: 'http://www.goalserve.com/getfeed/69a39912a09b45a2f60e08d8f941eccb/soccernew/'+type,
	qs: { json: '1' },
	headers:{ 
		'postman-token': '81c2df80-d63a-ca0f-6806-cc0b602f6c2a',
		'cache-control': 'no-cache' } 
	};
	request(options, async function (error, response, body) {
		if (error) throw new Error(error);
		var dj=JSON.parse(body);
		var today=dj.scores;
		var category=today.category;
		for(var i=0; i < category.length ; i++)
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
			
			 var insetid= await helpers.storecategory(today['@sport'],today['@updated'],category[i]['@name'],category[i]['@gid'],category[i]['@id'],category[i]['@file_group'],category[i]['@iscup'],type);
			for(var j=0;j < match_a.length;j++)
			{		
				var localteam=match_a[j].localteam;
				var visitorteam=match_a[j].visitorteam;
				if(localteam)
				{
					var id=localteam['@id'];
					var visitorteamid='';
					await helpers.storeteam(id);
					if(visitorteam){
						visitorteamid=visitorteam['@id'];
						await helpers.storeteam(visitorteam['@id']);
					}
					
                    await helpers.storematch(matches['@date'],matches['@formatted_date'],id,visitorteamid,match_a[j],insetid);
				}
			}
		}
		return callback(null,1);
	});
 }

function storecategory(name,gid,id,file_group,iscup,type){
    return new Promise(function (resolve, reject) {
	pool.query(
	'INSERT INTO  merto_tbl_live_score (`@name`,`@gid`,`@id`,`@file_group`,`@iscup`,`type`) values (?,?,?,?,?,?)',
	[
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
async function getTotalMatchService(data,callback){
	var totaldata=await helpers.getcategoryTotaldata(data); 
	return callback(null,totaldata);
}
async function getMatchService(data,callback){

	var team_id=await helpers.getfaviourateTeam(data.user_id);
	var livescoreid= await helpers.getcategorydata(data);
	var getdata= await helpers.getmatchdata(livescoreid,team_id);
	return callback(null,getdata);
 }

async function gettotalmatchteamservice(data,callback){
	var totaldata=await helpers.getcategoryTotaldata(data); 
	return callback(null,totaldata);
}
async function getmatchteamservice(data,callback){
	var team_id=await helpers.getfaviourateTeam(data.user_id);
	var livescoreid= await helpers.getcategoryTotaldata(data);
	 var getdata= await helpers.getteammatchlist(data,livescoreid,team_id);
	return callback(null,getdata);
 }


async function getTotalcompetitionService(data,callback){
	var totaldata=await helpers.getTotalCompetition(data); 
	return callback(null,totaldata);
}
async function getcompetitionService(data,callback){

	var getdata= await helpers.getcompetition(data);
	//console.log(getdata);
	return callback(null,getdata);
 }
 async function updateMatchDataService(data,callback){
	var totaldata=await helpers.updatematchdata(data); 
	return callback(null,totaldata);
}

async function matchdetailsDataService(data,callback){
	var matchdetails=await helpers.matchdetailsdata(data); 
	return callback(null,matchdetails);
}

async function storeleagueService(data,callback){
	await helpers.deleteleaguedata();
	var request = require("request");
	var options = { method: 'GET',
	url: 'https://www.goalserve.com/getfeed/69a39912a09b45a2f60e08d8f941eccb/soccerfixtures/data/mapping',
	qs: { json: '1' },
	headers:{ 
		'postman-token': '81c2df80-d63a-ca0f-6806-cc0b602f6c2a',
		'cache-control': 'no-cache' } 
	};
	request(options, async function (error, response, body) {
		if (error) throw new Error(error);
		var dj=JSON.parse(body);
		if(dj){
			var fixtures=dj.fixtures;
			var mapping=fixtures.mapping;
			if(mapping){
				for(var i=0; i < mapping.length ; i++)
				{
					var id=mapping[i]['@id'];
					var country=mapping[i]['@country'];
					var name=mapping[i]['@name'];
					var season=mapping[i]['@season'];
					var date_start=mapping[i]['@date_start'];
					var date_end=mapping[i]['@date_end'];
					var iscup=mapping[i]['@iscup'];
					var live_lineups=mapping[i]['@live_lineups'];
					var live_stats=mapping[i]['@live_stats'];
					var path=mapping[i]['@path'];
					await helpers.storeleaguedata(id,country,name,season,date_start,date_end,iscup,live_lineups,live_stats,path);
					
				}

			}
		}
		return callback(null,1);
		
	});
}
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Completed"), 1000)
});

module.exports = {
	storeLiveDataService,
	storecategory,
	getMatchService,
	getTotalMatchService,
	getcompetitionService,
	getTotalcompetitionService,
	updateMatchDataService,
	matchdetailsDataService,
	gettotalmatchteamservice,
	getmatchteamservice,
	storeleagueService
}
