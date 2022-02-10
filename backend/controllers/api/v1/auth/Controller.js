'use strict';
const { Response, HttpCodes } = require('../../../../helpers/response');
const log4js = require('../../../../common/logger');
const logger = log4js.getLogger('AuthController');
const { createUser, getUserBySocailId, getUserByEmail,getUserById,UpdateOtp,VerifedAccount,updatePassword,upadtedevicedeatils,createSocailUser} = require('../../../../services/AuthService');
const SimpleCrypto = require('simple-crypto-js').default;
const { sendMail } = require('../../../../services/MailService');

var { signAccessToken, signRefreshToken } = require('../../../../helpers/JwtHelper');
const meta = require('../../../../config/meta.json');
const tesseract = require("node-tesseract-ocr");
const configs = {
    lang: "eng", // default
    oem: 3,
    psm: 3,
  }
module.exports = {

    socialAuth: async (req, res) => {
        let response = new Response(req, res);
        const bodyData = req.body;
        let checkUser = await getUserBySocailId(bodyData.social_id)
        console.log(checkUser);
        if (checkUser.success) {
            if (checkUser.data.length > 0) {
                    let update =await upadtedevicedeatils(checkUser.data[0].user_id,bodyData.device_token,bodyData.device_type);
                    let token = await signAccessToken(checkUser.data[0].user_id)
                    let refreshToken = await signRefreshToken(checkUser.data[0].user_id)
                    let checkUsers = await getUserBySocailId(bodyData.social_id)
                    checkUsers.data[0].type = 'login'
                    checkUsers.data[0].token = token.token
                    checkUsers.data[0].refreshToken = refreshToken.token
                    response.status(HttpCodes.OK).data(true, checkUsers.message, checkUsers.data[0]).send();
            } else {
                        let user = await createSocailUser(bodyData)
                        if (user.success) {
                            let dbResponse = await getUserById(user.data)
                            let token = await signAccessToken(dbResponse.data.id)
                            let refreshToken = await signRefreshToken(dbResponse.data.id)
                            dbResponse.data.type = 'signup'
                            dbResponse.data.token = token.token
                            dbResponse.data.refreshToken = refreshToken.token
                            response.status(HttpCodes.OK).data(true, dbResponse.message, dbResponse.data).send();
                        } else {
                            response.status(HttpCodes.OK).error(meta.Error).send();
                        }
                }
        } else {
            response.status(HttpCodes.OK).error(meta.INVALIDFACEBOOKTOKEN).send();
        }
    },

    login: async (req, res) => {
        let response = new Response(req, res);
        const bodyData = req.body;
        let simpleCrypto = new SimpleCrypto(meta.ENCRYPTIONKEY);
        let user = await getUserByEmail(bodyData.email)
        console.log(user);
        if (user.success) {
            if (user.data.length > 0) {
                let update =await upadtedevicedeatils(user.data[0].user_id,bodyData.device_token,bodyData.device_type);
                let password = simpleCrypto.decrypt(user.data[0].password);
                let token = await signAccessToken(user.data[0].user_id)
                let refreshToken = await signRefreshToken(user.data[0].user_id)
                let userdata = await getUserById(user.data[0].user_id)
                // /console.log(userdata);
                userdata.data.token = token.token
                userdata.data.refreshToken = refreshToken.token
                if (bodyData.password == password) {
                        response.status(HttpCodes.OK).data(true, user.message, userdata.data).send();
                }else{
                    response.status(HttpCodes.OK).error(meta.INVALIDPASSWORD).send();    
                }
            } else {
                response.status(HttpCodes.OK).error(meta.INVALIDEMAILPASSWORD).send();
            }
        } else {
            response.status(HttpCodes.OK).error(meta.INVALIDEMAILPASSWORD).send();
        }
    },
    signup: async (req, res) => {
        let response = new Response(req, res);
        const bodyData = req.body;
        console.log(bodyData);
        let simpleCrypto = new SimpleCrypto(meta.ENCRYPTIONKEY);
        bodyData.password= simpleCrypto.encrypt(bodyData.password)
        let user = await getUserByEmail(bodyData.email)
        if (user.success) {
            if (user.data.length == 0) {
            let dbResponse = await createUser(bodyData)
                if (dbResponse.success) {
                    console.log(dbResponse.data);
                    let users = await getUserById(dbResponse.data)
                    //console.log(user);
                    let token = await signAccessToken(users.data.user_id)
                    let refreshToken = await signRefreshToken(users.data.user_id)
                    // let userdata = await getUserById(user.data[0].user_id)
                    users.data.token = token.token
                    users.data.refreshToken = refreshToken.token
                    response.status(HttpCodes.OK).data(true, dbResponse.message, users.data).send();
                }
            }else {
                response.status(HttpCodes.OK).error(meta.EMAILEXIST).send();
            }
        } else {
            response.status(HttpCodes.OK).error(meta.EMAILEXIST).send();
        }
    },

    refreshToken: async (req, res) => {
        let response = new Response(req, res);
        let token = await signAccessToken(req.userId)
        let refreshToken = await signRefreshToken(req.userId)
        let data = {
            "token": token.token,
            "refreshToken": refreshToken.token
        }
        response.status(HttpCodes.OK).data(true, meta.TOKENREFRESHED, data).send();
    },

    forgotMail:async(req,res)=>{
        var pass= Math.floor(100000 + Math.random() * 900000).toString().substr(0, 6)
        let response = new Response(req, res);
        const bodyData = req.body;
        let user = await getUserByEmail(bodyData.email)
        if (user.success) {
            if (user.data.length > 0) {
                // console.log('sdadsa'+ user.data.id);
                let users = await UpdateOtp(bodyData.email,pass)
                let name=user.data[0].name;
                let email=bodyData.email;
                let html='<html><head><title>Merto</title><h2>Hello '+ name +' </h2><h4>We got a request to update your password, before update your password need to verify, your verification code is :'+ pass + '</h4><h2>Kind Regards</h2><h4>Merto</h4></html>';
                let subject= "Forgot Password| Merto" ;
                let mail =await sendMail(email,html,subject)
                response.status(HttpCodes.OK).data(true, meta.FORGOTMAIL).send(); 
            }else {
                response.status(HttpCodes.OK).error(meta.EMAILNOTEXIST).send();
            }
        } else {
            response.status(HttpCodes.OK).error(meta.EMAILNOTEXIST).send();
        }
    },
    verifyAccount:async(req,res)=>{
        let response = new Response(req, res);
        const bodyData = req.body;
        let user = await getUserByEmail(bodyData.email)
        if (user.success) {
            if (user.data.length > 0) {
                let otp=user.data[0].otp;
                let id=user.data[0].id;
                console.log(id);
                if(otp==bodyData.otp){
                    let time=user.data[0].otp_expired;
                    let milliseconds2 = Date.now();
                    let diff = milliseconds2 - time;
                    let diffMinutes = diff / (60 * 1000);
                    console.log(diffMinutes);
                    if(diffMinutes > 5){
                        response.status(HttpCodes.OK).error(meta.OTPEXPIRED).send();
                    }
                    else{
                        let users = await VerifedAccount(id)
                        let userdata = await getUserById(id)
                        let token = await signAccessToken(userdata.data.id)
                        let refreshToken = await signRefreshToken(userdata.data.id)
                        userdata.data.token = token.token
                        userdata.data.refreshToken = refreshToken.token
                        response.status(HttpCodes.OK).data(true, meta.OTPVERIFY,userdata.data).send();
                    }
                }
                else{
                    response.status(HttpCodes.OK).error(meta.OTPINVALID).send();
                }
            }else {
                response.status(HttpCodes.OK).error(meta.EMAILNOTEXIST).send();
            }
        } else {
            response.status(HttpCodes.OK).error(meta.EMAILNOTEXIST).send();
        }
    },
    updatePassword:async(req,res)=>{
        let response = new Response(req, res);
        let simpleCrypto = new SimpleCrypto(meta.ENCRYPTIONKEY);
        const bodyData = req.body;
        let user = await getUserByEmail(bodyData.email)
        if (user.success) {
            if (user.data.length > 0) {
                bodyData.password= simpleCrypto.encrypt(bodyData.password)
                let updateuser= updatePassword(bodyData)
                response.status(HttpCodes.OK).data(true, meta.PASSWORDUPDATED).send();
            }else {
                response.status(HttpCodes.OK).error(meta.EMAILNOTEXIST).send();
            }
        } else {
            response.status(HttpCodes.OK).error(meta.EMAILNOTEXIST).send();
        }
    }

    
}