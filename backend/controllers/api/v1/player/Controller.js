const { Response, HttpCodes } = require('../../../../helpers/response');
const log4js = require('../../../../common/logger');
const logger = log4js.getLogger('PlayerController');
const {getplayerDetails,getplayer,getTotalplayer} = require('../../../../services/PlayerService');
const meta = require('../../../../config/meta.json');

module.exports = {

    getplayerDetails: async (req, res) => {
        let response = new Response(req, res);
        const bodyData = req.body;
        bodyData.userId=req.userId;
        let result = await getplayerDetails(bodyData)
        if (result.success) {
            let playerdetails=result.data[0];
            playerdetails.birth=JSON.parse(playerdetails.birth);
            playerdetails.statistics=JSON.parse(playerdetails.statistics);
            response.status(HttpCodes.OK).data(true, meta.SUCCESS, result.data).send();

        } else {
            response.status(HttpCodes.OK).error(meta.NODATAFOUND).send();
        }
    },
    PlayersList: async (req, res) => {
        let response = new Response(req, res);
        const bodyData = req.body;
        bodyData.userId=req.userId;
        let result = await getplayer(bodyData)
        console.log(result);
        let Totalresult = await getTotalplayer(bodyData)
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
}