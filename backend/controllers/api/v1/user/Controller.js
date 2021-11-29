'use strict';
const { Response, HttpCodes } = require('../../../../helpers/response');
const log4js = require('../../../../common/logger');
const logger = log4js.getLogger('UserController');
const {getUserById,changePassword,profileUpdate,updateName} = require('../../../../services/UserService');
const SimpleCrypto = require('simple-crypto-js').default;

const { sendMail } = require('../../../../services/MailService');
const meta = require('../../../../config/meta.json');
var { uploadFile } = require('../../../../helpers/imageUpload');

var multer = require('multer');
var aws = require('aws-sdk');
var multerS3 = require('multer-s3');
var path = require('path');
var { signAccessToken, signRefreshToken } = require('../../../../helpers/JwtHelper');


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
        console.log('sdfdsfdsf')
        console.log(req.files)
        if(req.files.length==0){
            let user = await updateName(req.body.name,req.userId)
        }
        else{
            let user = await profileUpdate(req.body.name,req.files[0].location,req.userId)
        }
        let user = await getUserById(req.userId)
        let token = await signAccessToken(req.userId)
        let refreshToken = await signRefreshToken(req.userId)
        user.data.token = token.token
        user.data.refreshToken = refreshToken.token
        response.status(HttpCodes.OK).data(true, meta.PROFILEUPDATED,user.data).send();

    }

    
}