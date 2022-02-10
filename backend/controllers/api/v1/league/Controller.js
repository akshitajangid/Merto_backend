const { Response, HttpCodes } = require('../../../../helpers/response');
const log4js = require('../../../../common/logger');
const logger = log4js.getLogger('LeagueController');
const {getleague,getTotalleague,Checkfavouriteleague,addfavouriteleague,removefavouriteleague,leagueStanding} = require('../../../../services/LeagueService');
var { signAccessToken, signRefreshToken } = require('../../../../helpers/JwtHelper');
const meta = require('../../../../config/meta.json');

module.exports = {

    leagueList: async (req, res) => {
        let response = new Response(req, res);
        const bodyData = req.body;
        bodyData.userId=req.userId;
        let result = await getleague(bodyData)
        let Totalresult = await getTotalleague(bodyData)
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
            response.status(HttpCodes.OK).error(meta.INVALIDFACEBOOKTOKEN).send();
        }
    },
    favLeague: async (req, res) => {
        let response = new Response(req, res);
        //console.log(req);
        const bodyData = req.body;
        bodyData.user_id=req.userId;
        console.log(bodyData);
        let result = await Checkfavouriteleague(bodyData)
        if (result.success) {
            if(result.data.length==0){
                let add = await addfavouriteleague(bodyData)
                console.log(add);
                response.status(HttpCodes.OK).data(true, 'league added in your faviourate list', 1).send();
            }
            else{
                let result = await removefavouriteleague(bodyData)
                response.status(HttpCodes.OK).data(true, 'league remove in your faviourate list', 0).send();
            }
        } else {
            response.status(HttpCodes.OK).error(meta.INVALIDFACEBOOKTOKEN).send();
        }
    },
    leagueStanding: async (req, res) => {
        let response = new Response(req, res);
        const bodyData = req.body;
        bodyData.user_id=req.userId;
        let result = await leagueStanding(bodyData)
        if (result.success) {
            if(result.data.length > 0){
                let resd=result.data
                let leagueres=[]
                for(var i=0;i<resd.length;i++){
                    var all=JSON.parse(resd[i].all);
                    let newobj={
                        "rank": resd[i].rank,
                        "team_id": resd[i].team_id,
                        "team_name": resd[i].team_name,
                        "team_logo": resd[i].team_logo,
                        "points":resd[i].points,
                        "goalsDiff":resd[i].goalsDiff,
                        "pld":all.played,
                        "win":all.win,
                        "draw":all.draw,
                        "lose":all.lose,
                        "GF":all.goals.for,
                        "GA":all.goals.against
                    }
                    leagueres.push(newobj);	
                }
                response.status(HttpCodes.OK).data(true, meta.SUCCESS, leagueres).send();
            }
            else{
                response.status(HttpCodes.OK).error(meta.NODATAFOUND).send();
            }
        } else {
            response.status(HttpCodes.OK).error(meta.NODATAFOUND).send();
        }
    }
}