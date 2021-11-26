const { Response, HttpCodes } = require('../../../../helpers/response');
const log4js = require('../../../../common/logger');
const logger = log4js.getLogger('TeamController');
const {getTeam,getTotalTeam,Checkfavouriteteam,addfavouriteteam,removefavouriteteam} = require('../../../../services/TeamService');
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
            response.status(HttpCodes.OK).error(meta.INVALIDFACEBOOKTOKEN).send();
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
            response.status(HttpCodes.OK).error(meta.INVALIDFACEBOOKTOKEN).send();
        }
    }
}