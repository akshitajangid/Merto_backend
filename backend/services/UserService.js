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
            queryWrapper.execute(`select * from merto_tbl_users where user_id=? `,[id], function (response) {
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
            queryWrapper.execute(`update merto_tbl_users set password=? where user_id=? `,updatedata, function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response[0] })
                }
            });
        })
    },
    updateName: async (name,email,id) => {
         let updatedata = [name,email,id];
        console.log(updatedata);
        return new Promise((resolve, reject) => {
            queryWrapper.execute(`update merto_tbl_users set name=?,email=? where user_id=? `,updatedata, function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response[0] })
                }
            });
        })
    },
    profileUpdate: async (name,email,profile,id) => {
        let updatedata = [name,email,profile,id];
        console.log(updatedata);
        return new Promise((resolve, reject) => {
           queryWrapper.execute(`update merto_tbl_users set name=?,email=? ,profile=? where user_id=? `,updatedata, function (response) {
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
    checkEmail:async(email,userId) => {
        let updatedata = [userId];
        console.log(updatedata);
        return new Promise((resolve, reject) => {
           queryWrapper.execute(`select email from merto_tbl_users where email='`+email+`' and user_id !=? `,updatedata, function (response) {
               if (response.errno) {
                   resolve({ success: false, message: response.sql })
               } else {
                   resolve({ success: true, message: meta.USERCREATED, data: response })
               }
           });
        })
    },
    updateMatchSetting: async (data) => {
        let updatedata = [data.value,data.userId];
        return new Promise((resolve, reject) => {
           queryWrapper.execute(`update merto_tbl_match_setting set `+data.key+`=? where user_id=? `,updatedata, function (response) {
               if (response.errno) {
                   resolve({ success: false, message: response.sqlMessage })
               } else {
                   resolve({ success: true, message: meta.USERCREATED, data: response[0] })
               }
           });
        })
    },
    insertMatchSetting:async (data) => {
        let updatedata = [data.value,data.userId];
        return new Promise((resolve, reject) => {
           queryWrapper.execute(`Insert Into  merto_tbl_match_setting (`+data.key+`, user_id) values(?,?) `,updatedata, function (response) {
               if (response.errno) {
                   resolve({ success: false, message: response.sqlMessage })
               } else {
                   resolve({ success: true, message: meta.USERCREATED, data: response[0] })
               }
           });
        })
    },
    getMatchSetting:async (data) => {
        let updatedata = [data.userId];
        return new Promise((resolve, reject) => {
           queryWrapper.execute(`select * from  merto_tbl_match_setting where user_id=?`,updatedata, function (response) {
               if (response.errno) {
                   resolve({ success: false, message: response.sqlMessage })
               } else {
                   resolve({ success: true, message: meta.USERCREATED, data: response })
               }
           });
        })
    },
    updateNotificationSetting: async (data) => {
        let updatedata = [data.value,data.userId];
        return new Promise((resolve, reject) => {
           queryWrapper.execute(`update merto_tbl_notification_setting set `+data.key+`=? where user_id=? `,updatedata, function (response) {
               if (response.errno) {
                   resolve({ success: false, message: response.sqlMessage })
               } else {
                   resolve({ success: true, message: meta.USERCREATED, data: response[0] })
               }
           });
        })
    },
    insertNotificationSetting:async (data) => {
        let updatedata = [data.value,data.userId];
        return new Promise((resolve, reject) => {
           queryWrapper.execute(`Insert Into  merto_tbl_notification_setting (`+data.key+`, user_id) values(?,?) `,updatedata, function (response) {
               if (response.errno) {
                   resolve({ success: false, message: response.sqlMessage })
               } else {
                   resolve({ success: true, message: meta.USERCREATED, data: response[0] })
               }
           });
        })
    },
    getNotificationSetting:async (data) => {
        let updatedata = [data.userId];
        return new Promise((resolve, reject) => {
           queryWrapper.execute(`select * from  merto_tbl_notification_setting where user_id=?`,updatedata, function (response) {
               if (response.errno) {
                   resolve({ success: false, message: response.sqlMessage })
               } else {
                   resolve({ success: true, message: meta.USERCREATED, data: response })
               }
           });
        })
    },
    insertNotificationSettingData:async (data) => {
        let updatedata = [data.userId,'1','1','1','1','1','1','1','1'];
        return new Promise((resolve, reject) => {
           queryWrapper.execute(`INSERT INTO merto_tbl_notification_setting (user_id,match_reminder,lineup,match_start,goals,video_highlights,red_card,half_time_result,full_time_result) values (?,?,?,?,?,?,?,?,?)`,updatedata, function (response) {
               if (response.errno) {
                   resolve({ success: false, message: response.sqlMessage })
               } else {
                   resolve({ success: true, message: meta.USERCREATED, data: response[0] })
               }
           });
        })
    },
    insertMatchSettingData:async (data) => {
        let updatedata = [data.userId,'1','1','1','1','1','1','1','1'];
        return new Promise((resolve, reject) => {
           queryWrapper.execute(`INSERT INTO merto_tbl_match_setting (user_id,show_postponed_match,poll,off_the_woodwork,injuries,substitutions,penalties,yellow_cards,red_cards) values (?,?,?,?,?,?,?,?,?)`,updatedata, function (response) {
               if (response.errno) {
                   resolve({ success: false, message: response.sqlMessage })
               } else {
                   resolve({ success: true, message: meta.USERCREATED, data: response[0] })
               }
           });
        })
    },

}