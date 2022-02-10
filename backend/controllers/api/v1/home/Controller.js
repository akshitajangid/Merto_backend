const { Response, HttpCodes } = require('../../../../helpers/response');
const log4js = require('../../../../common/logger');
const logger = log4js.getLogger('LeagueController');
const {getCompetition,getTotalCompetition,getFavCompetition,getFavTotalCompetition,getFavTotalTeamCompetition,getFavTeamCompetition,getMatchPlayer,getMatch,getMatchStatistics,getMatchTeam,getMatchsPrediction,getMatchEvent} = require('../../../../services/HomeService');
const {getLeagueById,getLeagueTeam} = require('../../../../services/LeagueService');
const {getTeamById} = require('../../../../services/TeamService');
const {getFaviourateLeague,getFaviourateTeam} = require('../../../../services/UserService');
const {getQuotes} = require('../../../../services/OtherService');

var { signAccessToken, signRefreshToken } = require('../../../../helpers/JwtHelper');
const meta = require('../../../../config/meta.json');

module.exports = {

    getAllCompetition: async (req, res) => {
        let response = new Response(req, res);
        const bodyData = req.body;
        bodyData.userId=req.userId;
        let limit = 10;
        let result = await getCompetition(bodyData,limit)
        let Totalresult = await getTotalCompetition(bodyData)
        if (result.success) {
            let total = Totalresult.data.length;
            let page = total / limit + '';
            let explode = page.split('. ');
            let totalpage =  Math.round(explode);
            if(explode > totalpage){
                  totalpage=totalpage+1;
            }
            let allcompetition=result.data;
            let resultdata = [];
            for(let i=0;i< allcompetition.length;i++){
                let league_id=allcompetition[i].league_id;
                let leauge=await getLeagueById(req.userId,league_id);
                let team=await getLeagueTeam(bodyData.date,league_id);
                let teamdata=team.data;
                var teamarray=[];
                for(let j=0;j< teamdata.length;j++){
                    let home_team_id=teamdata[j].home_team_id;
                    let goals=teamdata[j].goals;
                    let time=teamdata[j].timestamp;
                    let hometeamdetails=await getTeamById(req.userId,home_team_id);
                    let hometeam='';
                    let awayteam='';
                    if(hometeamdetails.data.length==0){
                         hometeam={
                            "id": home_team_id,
                            "name":null,
                            "logo": null,
                            "is_favourite": 0
                        }
                    }
                    else{
                         hometeam=hometeamdetails.data[0];
                    }
                    let away_team_id=teamdata[j].away_team_id;
                    let awayteamdetails=await getTeamById(req.userId,away_team_id);
                    if(awayteamdetails.data.length==0){
                         awayteam={
                            "id": away_team_id,
                            "name":null,
                            "logo": null,
                            "is_favourite": 0
                        }
                    }
                    else{
                         awayteam=awayteamdetails.data[0];
                    }
                    var teams={
                        'home':hometeam,
                        'away':awayteam,
                        'goals':JSON.parse(goals),
                        'time':time
                    }
                    teamarray.push(teams);
                }
                if(leauge.data.length>0){
                    leauge.data[0].team=teamarray;
                    resultdata.push(leauge.data[0]);	
                }
            }
            response.status(HttpCodes.OK).Pagingdata(true, meta.SUCCESS, resultdata,total,totalpage).send();

        } else {
            response.status(HttpCodes.OK).error(meta.NODATAFOUND).send();
        }
    },

    getHome: async (req, res) => {
        let response = new Response(req, res);
        const bodyData = req.body;
        bodyData.userId=req.userId;
        let result = await getCompetition(bodyData,5)
        let favleadguesdata=await getFaviourateLeague(bodyData)
        let favteamdata=await getFaviourateTeam(bodyData)
        let favleadgues= favleadguesdata.data
        let favteams= favteamdata.data
        let favleadgueid=[];
        for(let k=0;k< favleadgues.length;k++){
            favleadgueid.push(favleadgues[k].leagues_id);
        }
        let favteamid=[];
        for(let l=0;l< favteams.length;l++){
            favteamid.push(favteams[l].team_id);
        }

        let allcompetition=result.data;
            let allcompetitiondata = [];
            for(let i=0;i< allcompetition.length;i++){
                let league_id=allcompetition[i].league_id;
                let leauge=await getLeagueById(req.userId,league_id);
                let team=await getLeagueTeam(bodyData.date,league_id);
                let teamdata=team.data;
                var teamarray=[];
                for(let j=0;j< teamdata.length;j++){
                    let home_team_id=teamdata[j].home_team_id;
                    let goals=teamdata[j].goals;
                    let time=teamdata[j].timestamp;
                    let hometeamdetails=await getTeamById(req.userId,home_team_id);
                    let hometeam='';
                    let awayteam='';
                    if(hometeamdetails.data.length==0){
                         hometeam={
                            "id": home_team_id,
                            "name":null,
                            "logo": null,
                            "is_favourite": 0
                        }
                    }
                    else{
                         hometeam=hometeamdetails.data[0];
                    }
                    let away_team_id=teamdata[j].away_team_id;
                    let awayteamdetails=await getTeamById(req.userId,away_team_id);
                    if(awayteamdetails.data.length==0){
                         awayteam={
                            "id": away_team_id,
                            "name":null,
                            "logo": null,
                            "is_favourite": 0
                        }
                    }
                    else{
                         awayteam=awayteamdetails.data[0];
                    }
                    var teams={
                        'home':hometeam,
                        'away':awayteam,
                        'goals':JSON.parse(goals),
                        'time':time
                    }
                    teamarray.push(teams);
                }
                if(leauge.data.length>0){
                    leauge.data[0].team=teamarray;
                    allcompetitiondata.push(leauge.data[0]);    
                }
            }
        let resultdata=[];
        if(favleadgueid.length>0){
            let result = await getFavCompetition(bodyData,favleadgueid,2)
            if (result.success) {
                let allcompetition=result.data;
                for(let i=0;i< allcompetition.length;i++){
                    let league_id=allcompetition[i].league_id;
                    let leauge=await getLeagueById(req.userId,league_id);
                    let team=await getLeagueTeam(bodyData.date,league_id);
                    let teamdata=team.data;
                    var teamarray=[];
                    for(let j=0;j< teamdata.length;j++){
                        let home_team_id=teamdata[j].home_team_id;
                        let goals=teamdata[j].goals;
                        let time=teamdata[j].timestamp;
                        let hometeamdetails=await getTeamById(req.userId,home_team_id);
                        let hometeam='';let awayteam='';
                        if(hometeamdetails.data.length==0){
                            hometeam={
                                "id": home_team_id,
                                "name":null,
                                "logo": null,
                                "is_favourite": 0
                            }
                        }
                        else{
                            hometeam=hometeamdetails.data[0];
                        }
                        let away_team_id=teamdata[j].away_team_id;
                        let awayteamdetails=await getTeamById(req.userId,away_team_id);
                        if(awayteamdetails.data.length==0){
                            awayteam={
                                "id": away_team_id,
                                "name":null,
                                "logo": null,
                                "is_favourite": 0
                            }
                        }
                        else{
                            awayteam=awayteamdetails.data[0];
                        }
                        var teams={
                            'home':hometeam,
                            'away':awayteam,
                            'goals':JSON.parse(goals),
                            'time':time
                        }
                        teamarray.push(teams);
                    }
                    leauge.data[0].team=teamarray;
                    resultdata.push(leauge.data[0]);    
                }
            } 
        }
        let favteamleadges=await getFavTeamCompetition(bodyData,favteamid,2)
        let favdata = [];
        if(favteamid.length>0){
            if (favteamleadges.success) {
                let allfavteam=favteamleadges.data;
                for(let i=0;i< allfavteam.length;i++){
                    let league_id=allfavteam[i].league_id;
                    let leauge=await getLeagueById(req.userId,league_id);
                    let team=await getLeagueTeam(bodyData.date,league_id);
                    let teamdata=team.data;
                    var teamarray=[];
                    for(let j=0;j< teamdata.length;j++){
                        let home_team_id=teamdata[j].home_team_id;
                        let goals=teamdata[j].goals;
                        let time=teamdata[j].timestamp;
                        let hometeamdetails=await getTeamById(req.userId,home_team_id);
                        let hometeam='';
                        let awayteam='';
                        if(hometeamdetails.data.length==0){
                             hometeam={
                                "id": home_team_id,
                                "name":null,
                                "logo": null,
                                "is_favourite": 0
                            }
                        }
                        else{
                             hometeam=hometeamdetails.data[0];
                        }
                        let away_team_id=teamdata[j].away_team_id;
                        let awayteamdetails=await getTeamById(req.userId,away_team_id);
                        if(awayteamdetails.data.length==0){
                             awayteam={
                                "id": away_team_id,
                                "name":null,
                                "logo": null,
                                "is_favourite": 0
                            }
                        }
                        else{
                             awayteam=awayteamdetails.data[0];
                        }
                        let hometeamexist=favteamid.includes(String(home_team_id))
                        let awayteamexist=favteamid.includes(String(away_team_id))
                        if(hometeamexist==true || awayteamexist==true ){
                            var teams={
                                'home':hometeam,
                                'away':awayteam,
                                'goals':JSON.parse(goals),
                                'time':time
                            }
                            teamarray.push(teams);
                        }
                        
                    }
                    leauge.data[0].team=teamarray;
                    favdata.push(leauge.data[0]);   
                }
            } 
        }
        var resd={
            'team':favdata,
            'leauge':resultdata,
            'all_competition':allcompetitiondata
        }
        response.status(HttpCodes.OK).Pagingdata(true, meta.SUCCESS, resd).send();

    },
    getMatchPlayer: async (req, res) => {
        let response = new Response(req, res);
        const bodyData = req.body;
        bodyData.userId=req.userId;
        let getMatchs=await getMatch(bodyData)
        if (getMatchs.success) {
            if(getMatchs.data.length >0){
                let fixtureId=getMatchs.data[0].id;
                console.log("akshita"+fixtureId);
                let hometeam_id=bodyData.home_team_id;
                let awayteam_id=bodyData.away_team_id;
                let homeTeamplayer=await getMatchPlayer(fixtureId,hometeam_id)
                let awayTeamplayer=await getMatchPlayer(fixtureId,awayteam_id)
                if(homeTeamplayer.data){
                    let hometeam=homeTeamplayer.data
                    for(let j=0;j< hometeam.length;j++){
                        hometeam[j].cards=JSON.parse(hometeam[j].cards)
                        hometeam[j].game=JSON.parse(hometeam[j].game)
                    }
                }
                if(awayTeamplayer.data){
                    let awayteam=awayTeamplayer.data
                    for(let j=0;j< awayteam.length;j++){
                        awayteam[j].cards=JSON.parse(awayteam[j].cards)
                        awayteam[j].game=JSON.parse(awayteam[j].game)
                    }
                }
                
                let team={
                    'home':homeTeamplayer.data,
                    'away':awayTeamplayer.data
                }
                response.status(HttpCodes.OK).data(true, meta.SUCCESS, team).send();
            }
            else{
                response.status(HttpCodes.OK).error(meta.NODATAFOUND).send();
            }
        }
    },
    getMatchStatistics: async (req, res) => {
        let response = new Response(req, res);
        const bodyData = req.body;
        bodyData.userId=req.userId;
        let getMatchs=await getMatchStatistics(bodyData)
        if (getMatchs.success) {
            if(getMatchs.data.length >0){
                for(var i=0;i<getMatchs.data.length;i++){
                    let matchsta=getMatchs.data[i];
                    matchsta.team=JSON.parse(matchsta.team)
                    matchsta.statistics=JSON.parse(matchsta.statistics)
                }
                response.status(HttpCodes.OK).data(true, meta.SUCCESS, getMatchs.data).send();
            }
            else{
                response.status(HttpCodes.OK).error(meta.NODATAFOUND).send();
            }
        }
    },
    getMatchEvent:async (req, res) => {
        let response = new Response(req, res);
        const bodyData = req.body;
        bodyData.userId=req.userId;
        let getMatchs=await getMatchEvent(bodyData)
        let getMatchsPredictions=await getMatchsPrediction(bodyData)
        let getQuote=await getQuotes()
        let getMatchTeams=await getMatchTeam(bodyData)
        if(getMatchs.success){
            let getmatchevent=getMatchs.data;
            let getMatchsPredictionsdata=getMatchsPredictions.data;
            for(var i=0;i<getmatchevent.length;i++){
                getmatchevent[i].event=JSON.parse(getmatchevent[i].event);
            }
            for(var i=0;i<getMatchsPredictionsdata.length;i++){
                getMatchsPredictionsdata[i].predictions=JSON.parse(getMatchsPredictionsdata[i].predictions);
                getMatchsPredictionsdata[i].teams=JSON.parse(getMatchsPredictionsdata[i].teams);
                getMatchsPredictionsdata[i].comparison=JSON.parse(getMatchsPredictionsdata[i].comparison);
            }
            console.log(getMatchsPredictions.data);
            var result={
                'event':getmatchevent,
                'prediction':getMatchsPredictionsdata,
                'qutoes':getQuote.data
            }
            response.status(HttpCodes.OK).data(true, meta.SUCCESS, result).send();
        }
        else{
            response.status(HttpCodes.OK).error(meta.NODATAFOUND).send();
        }        
    },

    getAllFavTeamList:async(req, res)=>{
        let response = new Response(req, res);
        const bodyData = req.body;
        bodyData.userId=req.userId;
        let favteamdata=await getFaviourateTeam(bodyData)
        let favteams= favteamdata.data
        let favteamid=[];
        for(let l=0;l< favteams.length;l++){
            favteamid.push(favteams[l].team_id);
        }
        let favdata = [];
        let total=0;
        let totalpage=0;
        if(favteamid.length>0){
            let favteamleadges=await getFavTeamCompetition(bodyData,favteamid,10)
            let Totalresult = await getFavTotalTeamCompetition(bodyData,favteamid)
            let limit = 10;
            total = Totalresult.data.length;
            let page = total / limit + '';
            let explode = page.split('. ');
            totalpage =  Math.round(explode);
            if(explode > totalpage){
                  totalpage=totalpage+1;
            }
            if (favteamleadges.success) {
                let allfavteam=favteamleadges.data;
                for(let i=0;i< allfavteam.length;i++){
                    let league_id=allfavteam[i].league_id;
                    let leauge=await getLeagueById(req.userId,league_id);
                    let team=await getLeagueTeam(bodyData.date,league_id);
                    let teamdata=team.data;
                    var teamarray=[];
                    for(let j=0;j< teamdata.length;j++){
                        let home_team_id=teamdata[j].home_team_id;
                        let goals=teamdata[j].goals;
                        let time=teamdata[j].timestamp;
                        let hometeamdetails=await getTeamById(req.userId,home_team_id);
                        let hometeam='';
                        let awayteam='';
                        if(hometeamdetails.data.length==0){
                             hometeam={
                                "id": home_team_id,
                                "name":null,
                                "logo": null,
                                "is_favourite": 0
                            }
                        }
                        else{
                             hometeam=hometeamdetails.data[0];
                        }
                        let away_team_id=teamdata[j].away_team_id;
                        let awayteamdetails=await getTeamById(req.userId,away_team_id);
                        if(awayteamdetails.data.length==0){
                             awayteam={
                                "id": away_team_id,
                                "name":null,
                                "logo": null,
                                "is_favourite": 0
                            }
                        }
                        else{
                             awayteam=awayteamdetails.data[0];
                        }
                        let hometeamexist=favteamid.includes(String(home_team_id))
                        let awayteamexist=favteamid.includes(String(away_team_id))
                        if(hometeamexist==true || awayteamexist==true ){
                            var teams={
                                'home':hometeam,
                                'away':awayteam,
                                'goals':JSON.parse(goals),
                                'time':time
                            }
                            teamarray.push(teams);
                        }
                        
                    }
                    leauge.data[0].team=teamarray;
                    favdata.push(leauge.data[0]);   
                }
            } 
        }
        response.status(HttpCodes.OK).Pagingdata(true, meta.SUCCESS, favdata,total,totalpage).send();
    },

    getAllFavleaugeList:async(req, res)=>{
        let response = new Response(req, res);
        const bodyData = req.body;
        bodyData.userId=req.userId;
        let favleadguesdata=await getFaviourateLeague(bodyData)
        let favleadgues= favleadguesdata.data
        let favleadgueid=[];
        for(let k=0;k< favleadgues.length;k++){
            favleadgueid.push(favleadgues[k].leagues_id);
        }
        let resultdata=[];
        let total=0;
        let totalpage=0;
        if(favleadgueid.length>0){
            let result = await getFavCompetition(bodyData,favleadgueid,10)
            let Totalresult = await getFavTotalCompetition(bodyData,favleadgueid)
            let limit = 10;
            total = Totalresult.data.length;
            let page = total / limit + '';
            let explode = page.split('. ');
            totalpage =  Math.round(explode);
            if(explode > totalpage){
                  totalpage=totalpage+1;
            }
            if (result.success) {
                let allcompetition=result.data;
                for(let i=0;i< allcompetition.length;i++){
                    let league_id=allcompetition[i].league_id;
                    let leauge=await getLeagueById(req.userId,league_id);
                    let team=await getLeagueTeam(bodyData.date,league_id);
                    let teamdata=team.data;
                    var teamarray=[];
                    for(let j=0;j< teamdata.length;j++){
                        let home_team_id=teamdata[j].home_team_id;
                        let goals=teamdata[j].goals;
                        let time=teamdata[j].timestamp;
                        let hometeamdetails=await getTeamById(req.userId,home_team_id);
                        let hometeam='';let awayteam='';
                        if(hometeamdetails.data.length==0){
                            hometeam={
                                "id": home_team_id,
                                "name":null,
                                "logo": null,
                                "is_favourite": 0
                            }
                        }
                        else{
                            hometeam=hometeamdetails.data[0];
                        }
                        let away_team_id=teamdata[j].away_team_id;
                        let awayteamdetails=await getTeamById(req.userId,away_team_id);
                        if(awayteamdetails.data.length==0){
                            awayteam={
                                "id": away_team_id,
                                "name":null,
                                "logo": null,
                                "is_favourite": 0
                            }
                        }
                        else{
                            awayteam=awayteamdetails.data[0];
                        }
                        var teams={
                            'home':hometeam,
                            'away':awayteam,
                            'goals':JSON.parse(goals),
                            'time':time
                        }
                        teamarray.push(teams);
                    }
                    leauge.data[0].team=teamarray;
                    resultdata.push(leauge.data[0]);    
                }
            } 
        }
        
        response.status(HttpCodes.OK).Pagingdata(true, meta.SUCCESS, resultdata,total,totalpage).send();
    }


}