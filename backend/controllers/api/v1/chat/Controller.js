'use strict';
const { Response, HttpCodes } = require('../../../../helpers/response');
const log4js = require('../../../../common/logger');
const logger = log4js.getLogger('ChatController');
const {getChat,getTotalChat,getMessage,getTotalMessage,getUser,getTotalUser,sendMessage,sendMessageFile} = require('../../../../services/ChatService');

const meta = require('../../../../config/meta.json');
var { uploadFile } = require('../../../../helpers/imageUpload');

var multer = require('multer');
var aws = require('aws-sdk');
var multerS3 = require('multer-s3');
var path = require('path');

module.exports = {
    ChatList: async (req, res) => {
        let response = new Response(req, res);
        const bodyData = req.body;
        bodyData.userId=req.userId;
        let result = await getChat(bodyData)
        let Totalresult = await getTotalChat(bodyData)
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
            response.status(HttpCodes.OK).error(meta.ERRORMSG).send();
        }
    },
    UserList: async (req, res) => {
        let response = new Response(req, res);
        const bodyData = req.body;
        bodyData.userId=req.userId;
        let result = await getUser(bodyData)
        let Totalresult = await getTotalUser(bodyData)
        console.log(result);
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
            response.status(HttpCodes.OK).error(meta.ERRORMSG).send();
        }
    },
    viewChat: async (req, res) => {
        let response = new Response(req, res);
        const bodyData = req.body;
        bodyData.userId=req.userId;
        let result = await getMessage(bodyData)
        let Totalresult = await getTotalMessage(bodyData)
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
            response.status(HttpCodes.OK).error(meta.ERRORMSG).send();
        }
    },
    sendMessage: async (req, res) => {
        let response = new Response(req, res);
        const bodyData = req.body;
        bodyData.userId=req.userId;
        if(req.files.length==0){
            let result = await sendMessage(bodyData)
            if (result.success) {
            response.status(HttpCodes.OK).Pagingdata(true, meta.SUCCESS, []).send();
            } else {
                response.status(HttpCodes.OK).error(meta.ERRORMSG).send();
            }
        }
        else{
            let result = await sendMessageFile(req.userId,req.body.chat_user_id,req.body.message,req.files[0].location,req.files[0].mimetype);
            if (result.success) {
            response.status(HttpCodes.OK).Pagingdata(true, meta.SUCCESS, []).send();
            } else {
                response.status(HttpCodes.OK).error(meta.ERRORMSG).send();
            }
        }
        
    },
    
}