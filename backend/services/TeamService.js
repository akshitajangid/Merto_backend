const log4js = require('../common/logger');
const logger = log4js.getLogger('TeamService');
const queryWrapper = require('../config/database/queryWrapper')
const dbQuery = require('../common/dbQueries')
const meta = require('../config/meta.json');
const fs = require('fs');
//[SERVICE FOR LOGIN]
module.exports = {
    getTeam: async (data) => {
        return new Promise((resolve, reject) => {
            let page = data.page;
            let limit = 10;
            let start = (page * limit) - limit;
            let query='';
            if(data.search !=undefined  && data.search !=''){
                query= "where `name` Like '%"+data.search+"%'";
            }
            queryWrapper.execute(`select id,name,country,founded,national,logo,(select count(id) from merto_tbl_fav_team where user_id =? and team_id=merto_tbl_team.id) as is_favourite from merto_tbl_team `+ query+` limit `+ start+`,`+limit,[data.userId], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
    getTotalTeam: async (data) => {
        return new Promise((resolve, reject) => {
            let query='';
            if(data.search !=undefined  && data.search !=''){
                query= "where `name` Like '%"+data.search+"%'";
            }
            queryWrapper.execute(`select * from merto_tbl_team `+ query ,[], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
    Checkfavouriteteam:async (data) => {
        let checkdata=[data.team_id,data.user_id];
        return new Promise((resolve, reject) => {
            queryWrapper.execute(`select * from merto_tbl_fav_team where team_id=? and  user_id=?` ,checkdata, function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
    addfavouriteteam:async (data) => {
        let checkdata=[data.team_id,data.user_id,Date.now()];
        console.log(checkdata);
        return new Promise((resolve, reject) => {
            queryWrapper.execute(`insert into merto_tbl_fav_team (team_id,user_id,timestamp) VALUES (?,?,?)`,checkdata, function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
    removefavouriteteam:async (data) => {
        let checkdata=[data.team_id,data.user_id];
        return new Promise((resolve, reject) => {
            queryWrapper.execute(`DELETE FROM merto_tbl_fav_team WHERE team_id=? and user_id=?` ,checkdata, function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
    getTeamById:async (user_id,team_id) => {
        let checkdata=[user_id,team_id];
        return new Promise((resolve, reject) => {
            queryWrapper.execute(`select id,name,logo,(select count(id) from merto_tbl_fav_team where user_id =? and team_id=merto_tbl_team.id) as is_favourite from merto_tbl_team where id=?` ,checkdata, function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
}