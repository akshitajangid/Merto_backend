'use strict';
const { Response, HttpCodes } = require('../../../../helpers/response');
const log4js = require('../../../../common/logger');
const logger = log4js.getLogger('CronJobController');
const {Storeleague,StoreTeam,StoreFixtures} = require('../../../../services/cronjobService');

const meta = require('../../../../config/meta.json');

module.exports = {

    Storeleague: async (req, res) => {
        let response = new Response(req, res);
        const bodyData = req.body;
        let checkUser = await Storeleague()
        //console.log(checkUser);
        if (checkUser.success) {
            response.status(HttpCodes.OK).data(true, checkUser.message, checkUser.data).send();
        }
        else{

        }
    },
    StoreTeam: async (req, res) => {
        let response = new Response(req, res);
        const bodyData = req.body;
        let checkUser = await StoreTeam()
        response.status(HttpCodes.OK).data(true, checkUser.message, checkUser.data).send();
    },
    StoreFixtures: async (req, res) => {
        let response = new Response(req, res);
        const bodyData = req.body;
        let checkUser = await StoreFixtures(bodyData)
        response.status(HttpCodes.OK).data(true, checkUser.message, checkUser.data).send();
    },
}