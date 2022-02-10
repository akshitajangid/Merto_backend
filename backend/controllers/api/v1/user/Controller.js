'use strict';
const { Response, HttpCodes } = require('../../../../helpers/response');
const log4js = require('../../../../common/logger');
const logger = log4js.getLogger('UserController');
const {getUserById,changePassword,profileUpdate,updateName,checkEmail,getMatchSetting,insertMatchSetting,updateMatchSetting,insertMatchSettingData,getNotificationSetting,insertNotificationSetting,updateNotificationSetting,insertNotificationSettingData} = require('../../../../services/UserService');
const SimpleCrypto = require('simple-crypto-js').default;

const { sendMail } = require('../../../../services/MailService');
const meta = require('../../../../config/meta.json');
var { uploadFile } = require('../../../../helpers/imageUpload');

var multer = require('multer');
var aws = require('aws-sdk');
var multerS3 = require('multer-s3');
var path = require('path');
var { signAccessToken, signRefreshToken } = require('../../../../helpers/JwtHelper');
const tesseract = require("node-tesseract-ocr");
const configs = {
    lang: "eng", // default
    oem: 3,
    psm: 3,
  }

module.exports = {
    getUser:async(req,res)=>{
        let response = new Response(req, res);
        let user = await getUserById(req.userId)
        if (user.success) {
            let token = await signAccessToken(req.userId)
            let refreshToken = await signRefreshToken(req.userId)
            user.data.token = token.token
            user.data.refreshToken = refreshToken.token
            response.status(HttpCodes.OK).data(true, user.message, user.data).send();
        }
        else{
            response.status(HttpCodes.OK).error(meta.USERNOTFOUND).send();
        }
    },
    changePassword:async(req,res)=>{
        let response = new Response(req, res);
        let simpleCrypto = new SimpleCrypto(meta.ENCRYPTIONKEY);
        const bodyData = req.body;

        console.log(bodyData);
        let user = await getUserById(req.userId)

        // console.log(user);

        if (user.success) {
            let password = simpleCrypto.decrypt(user.data.password);
            if(password==bodyData.old_password){
                bodyData.password= simpleCrypto.encrypt(bodyData.new_password)
                bodyData.id= req.userId
                let updateuser= changePassword(bodyData)
                response.status(HttpCodes.OK).data(true, meta.PASSWORDUPDATED).send();
            }
            else{
                response.status(HttpCodes.OK).error(meta.OLDPASSWORDNOTMATCH).send();
            }
        } else {
            response.status(HttpCodes.OK).error(meta.EMAILNOTEXIST).send();
        }
    },
    updateProfile:async(req,res)=>{
        let response = new Response(req, res);
        const text = await tesseract.recognize(req.files[0].location, configs)
        response.status(HttpCodes.OK).data(true, 'sadsadasdasd', text).send();
       
     




        




        let checkemail = await checkEmail(req.body.email,req.userId)
        console.log(checkemail);
        if(checkemail.success){
            console.log(checkemail.data.length);
            if(checkemail.data.length==0){
                if(req.files.length==0){
                    let user = await updateName(req.body.name,req.body.email,req.userId)
                }
                else{
                    let user = await profileUpdate(req.body.name,req.body.email,req.files[0].location,req.userId)
                }
                let user = await getUserById(req.userId)
                let token = await signAccessToken(req.userId)
                let refreshToken = await signRefreshToken(req.userId)
                user.data.token = token.token
                user.data.refreshToken = refreshToken.token
                response.status(HttpCodes.OK).data(true, meta.PROFILEUPDATED,user.data).send();
            }else{
                response.status(HttpCodes.OK).error(meta.EMAILEXIST).send();
            }
        }else{
            response.status(HttpCodes.OK).error(meta.NODATAFOUND).send();
        }
    },
    updateMatchSetting:async(req,res)=>{
		let response = new Response(req, res);
        const bodyData = req.body;
        bodyData.userId=req.userId;
        let user = await getMatchSetting(bodyData)
        if (user.success) {
            if(user.data.length==0){
                let user = await insertMatchSetting(bodyData)
                let matchsetting = await getMatchSetting(bodyData)
                response.status(HttpCodes.OK).data(true, user.message, matchsetting.data).send();
            }
            else{
                let user = await updateMatchSetting(bodyData)
                let matchsetting = await getMatchSetting(bodyData)
                response.status(HttpCodes.OK).data(true, user.message, matchsetting.data).send();
            }
        }
        else{
            response.status(HttpCodes.OK).error(meta.USERNOTFOUND).send();
        }
	},
    getMatchSetting:async(req,res)=>{
        let response = new Response(req, res);
        const bodyData = req.body;
        bodyData.userId=req.userId;
        let user = await getMatchSetting(bodyData)
        if (user.success) {
            if(user.data.length==0){
                let user = await insertMatchSettingData(bodyData)
                let matchsetting = await getMatchSetting(bodyData)
                response.status(HttpCodes.OK).data(true, user.message, matchsetting.data).send();
            }
            else{
                let matchsetting = await getMatchSetting(bodyData)
                response.status(HttpCodes.OK).data(true, user.message, matchsetting.data).send();
            }
        }
        else{
            response.status(HttpCodes.OK).error(meta.USERNOTFOUND).send();
        }
    },
    updateNotificationSetting:async(req,res)=>{
        let response = new Response(req, res);
        const bodyData = req.body;
        bodyData.userId=req.userId;
        let user = await getNotificationSetting(bodyData)
        if (user.success) {
            if(user.data.length==0){
                let user = await insertNotificationSetting(bodyData)
                let matchsetting = await getNotificationSetting(bodyData)
                response.status(HttpCodes.OK).data(true, user.message, matchsetting.data).send();
            }
            else{
                let user = await updateNotificationSetting(bodyData)
                let matchsetting = await getNotificationSetting(bodyData)
                response.status(HttpCodes.OK).data(true, user.message, matchsetting.data).send();
            }
        }
        else{
            response.status(HttpCodes.OK).error(meta.USERNOTFOUND).send();
        }
    },
    getNotificationSetting:async(req,res)=>{
        let response = new Response(req, res);
        const bodyData = req.body;
        bodyData.userId=req.userId;
        let user = await getNotificationSetting(bodyData)
        if (user.success) {
            if(user.data.length==0){
                let user = await insertNotificationSettingData(bodyData)
                let matchsetting = await getNotificationSetting(bodyData)
                response.status(HttpCodes.OK).data(true, user.message, matchsetting.data).send();
            }
            else{
                let matchsetting = await getNotificationSetting(bodyData)
                response.status(HttpCodes.OK).data(true, user.message, matchsetting.data).send();
            }
        }
        else{
            response.status(HttpCodes.OK).error(meta.USERNOTFOUND).send();
        }
    },
    
}