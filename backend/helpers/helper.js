const queryWrapper = require('../config/database/queryWrapper')
var request = require("request");
const meta = require('../config/meta.json');

module.exports = {
    updateChatMessageStatus: async (room_id,userid) => {
        return new Promise((resolve, reject) => {
            queryWrapper.execute(`UPDATE tbl_chat_message SET is_read=1 WHERE chat_user_id=? and room_id=?`,[room_id,userid], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response.insertId })
                }
            });
        })
    },
    GetcheckRoomId: async (userid,chatUserid) => {
        console.log('userid'+userid);
        console.log('chatUserid'+chatUserid);
        return new Promise((resolve, reject) => {
            let query='WHERE (user_id='+userid+' or chat_user_id='+userid+') and ( user_id='+chatUserid+' or chat_user_id='+chatUserid+')';
            queryWrapper.execute(`select * from tbl_chat_room `+query,[], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    if(response.length==0){
                        queryWrapper.execute(`insert into tbl_chat_room (user_id,chat_user_id,timestamp) values(?,?,?)`,[userid,chatUserid,Date.now()], function (response) {
                        if (response.errno) {
                                resolve({ success: false, message: response.sqlMessage })
                        } else {
                                console.log(response.insertId);
                                resolve({ success: true, message: 'msg', data: response.insertId })
                            }
                        });
                    }else{
                        resolve({ success: true, message:  'msg', data: response[0].id })
                    }
                    
                }
            });
        })
    },
  
}