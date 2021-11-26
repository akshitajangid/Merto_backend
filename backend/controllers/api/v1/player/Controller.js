const { Response, HttpCodes } = require('../../../../helpers/response');
const log4js = require('../../../../common/logger');
const logger = log4js.getLogger('PlayerController');
const {getplayerDetails} = require('../../../../services/PlayerService');
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
    }
}