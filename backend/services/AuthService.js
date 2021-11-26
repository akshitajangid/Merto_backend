'use strict';
const log4js = require('../common/logger');
const logger = log4js.getLogger('AuthService');
const queryWrapper = require('../config/database/queryWrapper')
const dbQuery = require('../common/dbQueries')
const meta = require('../config/meta.json');
const SimpleCrypto = require('simple-crypto-js').default;

//[SERVICE FOR LOGIN]
module.exports = {
    createUser: async (data) => {
        let insertData = [ data.name,data.email,data.device_token,data.device_type,data.password,"Email",data.language,Date.now()];
        return new Promise((resolve, reject) => {
            queryWrapper.execute(`INSERT INTO merto_tbl_users (name,email,device_token,device_type,password,login_type,language,active_time) values (?,?,?,?,?,?,?,?)`,insertData, function (response) {
                if (response.errno) {
                    logger.error(`ERROR : ${response.sqlMessage}`);
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    logger.info(`User Registered : ${response.insertId}`);
                    resolve({ success: true, message: meta.USERCREATED, data: response.insertId })
                }
            });
        })
    },
    
    getUserByEmail: async (email) => {
        let emails = [email];
        return new Promise((resolve, reject) => {
            queryWrapper.execute(`select * from merto_tbl_users where email=? `,emails, function (response) {
                if (response.errno) {
                    //logger.error(`ERROR : ${response.sqlMessage}`);
                    resolve({ success: false, message: response.sqlMessage })
                } else {

                    //logger.info(`User Registered : ${response[0]}`);
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
    getUserBySocailId : async (socialId) => {
        return new Promise((resolve, reject) => {
            queryWrapper.execute(`select * from merto_tbl_users where social_id=?`, [[[socialId]]], function (response) {
                if (response.errno) {
                    logger.error(`ERROR : ${response.sqlMessage}`);
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    logger.info(`User Registered : ${response[0]}`);
                    resolve({ success: true, message: meta.USERCREATED, data: response})
                }
            });
        })
    },
    getUserById: async (id) => {
        return new Promise((resolve, reject) => {
            queryWrapper.execute(`select * from merto_tbl_users where user_id=? `,[id], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response[0] })
                }
            });
        })
    },
    UpdateOtp: async (email,otp) => {
        let updatedata = [otp, Date.now(),email];
        console.log(updatedata);
        return new Promise((resolve, reject) => {
            queryWrapper.execute(`update merto_tbl_users set otp=?,otp_expired=? where email=? `,updatedata, function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response[0] })
                }
            });
        })
    },
    VerifedAccount: async (id) => {
        let updatedata = [0, '',1,id];
        console.log(updatedata);
        return new Promise((resolve, reject) => {
            queryWrapper.execute(`update merto_tbl_users set otp=?,otp_expired=? ,isVerified =? where id=? `,updatedata, function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response[0] })
                }
            });
        })
    },
    updatePassword: async (data) => {
        let updatedata = [data.password,data.email];
        console.log(updatedata);
        return new Promise((resolve, reject) => {
            queryWrapper.execute(`update merto_tbl_users set password=? where email=? `,updatedata, function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response[0] })
                }
            });
        })
    },
    upadtedevicedeatils: async (id,token,type) => {
        let updatedata = [token,type,id];
        return new Promise((resolve, reject) => {
            queryWrapper.execute(`update merto_tbl_users set device_token=?,device_type=? where user_id=? `,updatedata, function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response[0] })
                }
            });
        })
    },
    createSocailUser: async (data) => {
        let insertData =[data.name,data.email,data.device_token,data.device_type,data.social_id,data.login_type,data.language,Date.now()]
        return new Promise((resolve, reject) => {
            queryWrapper.execute(`INSERT INTO merto_tbl_users (name,email,device_token,device_type,social_id,login_type,language,active_time) values (?,?,?,?,?,?,?,?)`,insertData, function (response) {
                if (response.errno) {
                    logger.error(`ERROR : ${response.sqlMessage}`);
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    console.log('dsa'+response);
                    logger.info(`User Registered : ${response.insertId}`);
                    resolve({ success: true, message: meta.USERCREATED, data: response.insertId })
                }
            });
        })
    },
}