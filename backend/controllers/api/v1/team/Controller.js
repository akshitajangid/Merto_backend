const { Response, HttpCodes } = require('../../../../helpers/response');
const log4js = require('../../../../common/logger');
const logger = log4js.getLogger('TeamController');
const {getTeam,getTotalTeam,Checkfavouriteteam,addfavouriteteam,removefavouriteteam,getTeamById} = require('../../../../services/TeamService');
const {getLeagugeByTeamId} = require('../../../../services/LeagueService');
const {getMatchByTeamId} = require('../../../../services/HomeService');
const {getTeamPlayer} = require('../../../../services/PlayerService');

var { signAccessToken, signRefreshToken } = require('../../../../helpers/JwtHelper');
const meta = require('../../../../config/meta.json');

module.exports = {

    teamList: async (req, res) => {
        let response = new Response(req, res);
        const bodyData = req.body;
        bodyData.userId=req.userId;
        let result = await getTeam(bodyData)
        let Totalresult = await getTotalTeam(bodyData)
        if (result.success) {
            let limit = 10;
            let total = Totalresult.data.length;
            let page = total / limit + '';
            let explode = page.split('. ');
            let totalpage =  Math.round(explode);
            if(explode > totalpage){
                  totalpage=totalpage+1;
            }
            response.status(HttpCodes.OK).Pagingdata(true, meta.SUCCESS, result.data,total,totalpage).send();

        } else {
            response.status(HttpCodes.OK).error(meta.NODATAFOUND).send();
        }
    },
    favTeam: async (req, res) => {
        let response = new Response(req, res);
        const bodyData = req.body;
        bodyData.user_id=req.userId;
        let result = await Checkfavouriteteam(bodyData)
        if (result.success) {
            if(result.data.length==0){
                let add = await addfavouriteteam(bodyData)
                response.status(HttpCodes.OK).data(true, 'Team added in your faviourate list', 1).send();
            }
            else{
                let result = await removefavouriteteam(bodyData)
                response.status(HttpCodes.OK).data(true, 'Team remove in your faviourate list', 0).send();
            }
        } else {
            response.status(HttpCodes.OK).error(meta.NODATAFOUND).send();
        }
    },
    teamDetail: async (req, res) => {
        let response = new Response(req, res);
        const bodyData = req.body;
        bodyData.user_id=req.userId;
        let result = await getLeagugeByTeamId(bodyData)
        let getMatch = await getMatchByTeamId(bodyData)
        if (result.success) {
            let matcharray=[];
            if(getMatch.success){
                let matchdata=getMatch.data;
                console.log(matchdata);
                for(var i=0;i<matchdata.length;i++){
                    let hometeamid=matchdata[i].home_team_id;
                    let awayteamid=matchdata[i].away_team_id;
                    let hometeamdetails=await getTeamById(req.userId,hometeamid);
                    let hometeam='';
                    let awayteam='';
                    if(hometeamdetails.data.length==0){
                        hometeam={
                           "id": hometeamid,
                           "name":null,
                           "logo": null,
                           "is_favourite": 0
                       }
                   }
                   else{
                        hometeam=hometeamdetails.data[0];
                   }
                    let awayteamdetails=await getTeamById(req.userId,awayteamid);
                    if(awayteamdetails.data.length==0){
                        awayteam={
                           "id": awayteamid,
                           "name":null,
                           "logo": null,
                           "is_favourite": 0
                       }
                   }
                   else{
                        awayteam=awayteamdetails.data[0];
                   }
                    let team= {
                        'home':hometeam,
                        'away':awayteam,
                    }
                    var obj={
                        'team':team,
                        'goals':JSON.parse(matchdata[i].goals),
                        'timestamp':matchdata[i].timestamp
                    }
                    matcharray.push(obj);
                }
            }
            let d=[];
            let team= {
                'league':result.data[0],
                'match':matcharray,
            }
            d.push(team);
            response.status(HttpCodes.OK).Pagingdata(true, meta.SUCCESS, d).send();
        } else {
            response.status(HttpCodes.OK).error(meta.NODATAFOUND).send();
        }
    },
    getTeamPlayer:async (req, res) => {
        let response = new Response(req, res);
        const bodyData = req.body;
        bodyData.user_id=req.userId;
        let getTeamPlayers=await getTeamPlayer(bodyData)
        if (getTeamPlayers.success) {
            let getTeamPlayerdata=getTeamPlayers.data;
            for(var i=0;i<getTeamPlayerdata.length;i++){
                getTeamPlayerdata[i].game=JSON.parse(getTeamPlayerdata[i].game);
            }
            response.status(HttpCodes.OK).Pagingdata(true, meta.SUCCESS, getTeamPlayerdata).send();
        } else {
            response.status(HttpCodes.OK).error(meta.NODATAFOUND).send();
        }
    }
}