'use strict';
var jwt = require('jsonwebtoken');
const { Router } = require('express');
const meta = require('../../config/meta.json');
const appConst = require('../../common/appConstants')
const { Response, HttpCodes } = require('../../helpers/response');

class ApiBase {
	constructor() {
		this.router = new Router();
		this.router.use((req, res, next) => {
			//console.log(req._parsedUrl.href);
			let href=req._parsedUrl.href;
			let url=req.originalUrl;
			let s=url.split("/v1");
			//console.log(s);
			let response = new Response(req, res);
			if(s[1]==href){
				if(req.originalUrl === "/v1/login" || req.originalUrl === "/v1/socialLogin" || req.originalUrl === "/v1/signup" || req.originalUrl === "/v1/Storeleague" || req.originalUrl === "/v1/StoreTeam" || req.originalUrl === "/v1/forgotMail" || req.originalUrl === "/v1/updatePassword" || req.originalUrl === "/v1/help" || req.originalUrl === "/v1/getContent" || req.originalUrl === "/v1/StoreFixtures"){
					next();
				}else{
					var token = req.headers['x-access-token'];
					if (!token) {
						response.status(HttpCodes.UNAUTHORIZED).error(meta.UNAUTHORIZED).send();
					} else {
						if(req.originalUrl === "/v1/refreshToken"){
							jwt.verify(token, appConst.SECRETREFRESHKEY, function (err, decoded) {
								if (err) {
									response.status(HttpCodes.UNAUTHORIZED).error(meta.INVALIDREFRESHTOKEN).send();
								} else {
									req.userId = decoded.id;
									next();
								}
							});
						}else{
							jwt.verify(token, appConst.SECRETKEY, function (err, decoded) {
								if (err) {
									response.status(HttpCodes.UNAUTHORIZED).error(meta.UNAUTHORIZED).send();
								} else {
									req.userId = decoded.id;
									console.log(decoded);
									next();
								}
							});
						}
					}
				}
			}
			else{
				response.status(HttpCodes.UNAUTHORIZED).error(meta.INVALIDURL).send();
			}
		});
	}
}

module.exports = ApiBase;
