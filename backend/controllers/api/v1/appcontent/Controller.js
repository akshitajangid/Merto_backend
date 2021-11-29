'use strict';
const { Response, HttpCodes } = require('../../../../helpers/response');
const log4js = require('../../../../common/logger');
const logger = log4js.getLogger('AppController');
const {getcontent,gethelp,getcategorytabledata,getformtabledata,getforminputtabledata,getinputtabledata,getoptionstabledata} = require('../../../../services/AppContentService');
const meta = require('../../../../config/meta.json');

module.exports = {
    getContent:async(req,res)=>{
        let response = new Response(req, res);
        let user = await getcontent()
        if (user.success) {
            response.status(HttpCodes.OK).data(true, meta.DATAFATCH, user.data).send();
        }
        else{
            response.status(HttpCodes.OK).error(meta.USERNOTFOUND).send();
        }
    },
    getHelp:async(req,res)=>{
        let response = new Response(req, res);
        let user = await gethelp()
        console.log(user);
        if (user.success) {
            response.status(HttpCodes.OK).data(true, meta.DATAFATCH, user.data).send();
        }
        else{
            response.status(HttpCodes.OK).error(meta.USERNOTFOUND).send();
        }
    }
    
}