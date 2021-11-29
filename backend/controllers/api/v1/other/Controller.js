const { Response, HttpCodes } = require('../../../../helpers/response');
const log4js = require('../../../../common/logger');
const logger = log4js.getLogger('dataController');
const {getWheatherData,ContactUs} = require('../../../../services/OtherService');
const meta = require('../../../../config/meta.json');

module.exports = {
    getWheatherData: async (req, res) => {
        let response = new Response(req, res);
        const bodyData = req.body;
        bodyData.userId=req.userId;
        let result = await getWheatherData(bodyData)
        if(result.success)
        {
            response.status(HttpCodes.OK).data(true, meta.SUCCESS,result.data).send();
        } else {
            response.status(HttpCodes.OK).error(meta.NODATAFOUND).send();
        }
    },
    ContactUs: async (req, res) => {
        let response = new Response(req, res);
        const bodyData = req.body;
        bodyData.userId=req.userId;
        let result = await ContactUs(bodyData)
        console.log(result);
        if(result.success)
        {
            response.status(HttpCodes.OK).data(true, meta.SUCCESS, result.data).send();
        } else {
            response.status(HttpCodes.OK).error(meta.NODATAFOUND).send();
        }
    },
}