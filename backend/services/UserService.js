'use strict';
const log4js = require('../common/logger');
const logger = log4js.getLogger('UserService');
const queryWrapper = require('../config/database/queryWrapper')
const dbQuery = require('../common/dbQueries')
const meta = require('../config/meta.json');
const SimpleCrypto = require('simple-crypto-js').default;

//[SERVICE FOR LOGIN]
module.exports = {
    
    getUserById: async (id) => {
        return new Promise((resolve, reject) => {
            queryWrapper.execute(`select * from users where id=? `,[id], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response[0] })
                }
            });
        })
    },
    changePassword: async (data) => {
        let updatedata = [data.password,data.id];
        // console.log(updatedata);
        return new Promise((resolve, reject) => {
            queryWrapper.execute(`update users set password=? where id=? `,updatedata, function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response[0] })
                }
            });
        })
    },
    updateName: async (name,id) => {
         let updatedata = [name,id];
        console.log(updatedata);
        return new Promise((resolve, reject) => {
            queryWrapper.execute(`update users set name=? where id=? `,updatedata, function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response[0] })
                }
            });
        })
    },
    profileUpdate: async (name,profile,id) => {
        let updatedata = [name,profile,id];
        console.log(updatedata);
        return new Promise((resolve, reject) => {
           queryWrapper.execute(`update users set name=? ,profile=? where id=? `,updatedata, function (response) {
               if (response.errno) {
                   resolve({ success: false, message: response.sqlMessage })
               } else {
                   resolve({ success: true, message: meta.USERCREATED, data: response[0] })
               }
           });
        })
    },
    getFaviourateLeague: async (data) => {
        let updatedata = [data.userId];
        return new Promise((resolve, reject) => {
           queryWrapper.execute(`select leagues_id from merto_tbl_fav_leagues where user_id=? `,updatedata, function (response) {
               if (response.errno) {
                   resolve({ success: false, message: response.sqlMessage })
               } else {
                   resolve({ success: true, message: meta.USERCREATED, data: response })
               }
           });
        })
    },
    getFaviourateTeam: async (data) => {
        let updatedata = [data.userId];
        return new Promise((resolve, reject) => {
           queryWrapper.execute(`select team_id from merto_tbl_fav_team where user_id=? `,updatedata, function (response) {
               if (response.errno) {
                   resolve({ success: false, message: response.sqlMessage })
               } else {
                   resolve({ success: true, message: meta.USERCREATED, data: response })
               }
           });
        })
    },


}