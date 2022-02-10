'use strict';
const log4js = require('../common/logger');
const logger = log4js.getLogger('ChatService');
const queryWrapper = require('../config/database/queryWrapper')
const dbQuery = require('../common/dbQueries')
const meta = require('../config/meta.json');
const SimpleCrypto = require('simple-crypto-js').default;
const helpers = require('../helpers/helper');
var FCM = require('fcm-node');
var serverKey = process.env.firebaseKey; //put your server key here
var fcm = new FCM(serverKey);

//[SERVICE FOR LOGIN]
module.exports = {
    getChat: async (data) => {
        return new Promise((resolve, reject) => {
            let page = data.page;
            let limit = 10;
            let start = (page * limit) - limit;
            let query='';
            if(data.search !=undefined  && data.search !=''){
                query= "and  name Like '%"+data.search+"%'";
            }
            queryWrapper.execute(`select merto_tbl_users.name,merto_tbl_users.profile,tbl_chat_room.id as room_id ,(select message from tbl_chat_message where room_id=tbl_chat_room.id order by id desc limit 1 ) as message,(select timestamp from tbl_chat_message where room_id=tbl_chat_room.id order by id desc limit 1 ) as timestamp,(select count(*) from tbl_chat_message where room_id=tbl_chat_room.id and is_read=0 and chat_user_id =`+data.userId+` ) as unread_count FROM tbl_chat_room inner join merto_tbl_users WHERE  (tbl_chat_room.user_id = `+data.userId+` or tbl_chat_room.chat_user_id=`+data.userId+`) and merto_tbl_users.user_id !=`+data.userId+` and (tbl_chat_room.user_id = merto_tbl_users.user_id or tbl_chat_room.chat_user_id=merto_tbl_users.user_id)`+ query+` limit `+ start+`,`+limit,[], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
    getTotalChat: async (data) => {
        return new Promise((resolve, reject) => {
            let query='';
            if(data.search !=undefined  && data.search !=''){
                query= " and name Like '%"+data.search+"%'";
            }
            queryWrapper.execute(`select merto_tbl_users.name FROM tbl_chat_room inner join merto_tbl_users WHERE  (tbl_chat_room.user_id = `+data.userId+` or tbl_chat_room.chat_user_id=`+data.userId+`) and merto_tbl_users.user_id !=`+data.userId+` and (tbl_chat_room.user_id = merto_tbl_users.user_id or tbl_chat_room.chat_user_id=merto_tbl_users.user_id) `+ query ,[], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
    getUser: async (data) => {
        return new Promise((resolve, reject) => {
            let page = data.page;
            let limit = 10;
            let start = (page * limit) - limit;
            let query='';
            if(data.search !=undefined  && data.search !=''){
                query= " and  name Like '%"+data.search+"%'";
            }
            queryWrapper.execute(`select user_id,name,profile,IFNULL((select id from tbl_chat_room where (tbl_chat_room.user_id=merto_tbl_users.user_id or tbl_chat_room.chat_user_id=merto_tbl_users.user_id) and (tbl_chat_room.user_id=`+data.userId+` or tbl_chat_room.chat_user_id=`+data.userId+`) limit 1 ),0)as room_id from merto_tbl_users where user_id !=`+data.userId+ query+` limit `+ start+`,`+limit,[], function (response) {
                if (response.errno) {
                    console.log(response);
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
    getTotalUser: async (data) => {
        return new Promise((resolve, reject) => {
            let query='';
            if(data.search !=undefined  && data.search !=''){
                query= "where name Like '%"+data.search+"%'";
            }
            queryWrapper.execute(`select * from merto_tbl_users  `+ query ,[], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
    getMessage: async (data) => {
        await helpers.updateChatMessageStatus(data.room_id,data.userId);
        return new Promise((resolve, reject) => {
            let page = data.page;
            let limit = 10;
            let start = (page * limit) - limit;
            let query='';
            queryWrapper.execute('select * from tbl_chat_message where room_id=? order by id desc limit '+ start+','+limit,[data.room_id], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
    getTotalMessage: async (data) => {
        return new Promise((resolve, reject) => {
            queryWrapper.execute('select * from tbl_chat_message where room_id=?' ,[data.room_id], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
    sendMessage:async (data) => {
        console.log(data);
        let room=await helpers.GetcheckRoomId(data.userId,data.chat_user_id);
        let roomId=room.data;
        return new Promise((resolve, reject) => {
            queryWrapper.execute('insert into tbl_chat_message (room_id,user_id,chat_user_id,message,timestamp) values(?,?,?,?,?)' ,[
                    roomId,
                    data.userId,
                    data.chat_user_id,
                    data.message,
                    Date.now()
                ], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
    sendMessageFile:async (userid,chatuserid,message,file,filetype) => {
        let room=await helpers.GetcheckRoomId(userid,chatuserid);
        let roomId=room.data;
        return new Promise((resolve, reject) => {
            queryWrapper.execute('insert into tbl_chat_message (room_id,user_id,chat_user_id,message,file,file_type,timestamp) values(?,?,?,?,?,?,?)' ,[
                    roomId,
                    userid,
                    chatuserid,
                    message,
                    file,
                    filetype,
                    Date.now()
                ], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },


}