const log4js = require('../common/logger');
const logger = log4js.getLogger('playerService');
const queryWrapper = require('../config/database/queryWrapper')
const dbQuery = require('../common/dbQueries')
const meta = require('../config/meta.json');
const fs = require('fs');
//[SERVICE FOR LOGIN]
module.exports = {
    getplayerDetails: async (data) => {
        return new Promise((resolve, reject) => {
            queryWrapper.execute(`SELECT * FROM merto_tbl_player_detail where player_id=?`,[data.player_id], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
    getTeamPlayer: async (data) => {
        return new Promise((resolve, reject) => {
            queryWrapper.execute(`SELECT team_id,name,photo,game FROM merto_tbl_player where team_id=?`,[data.team_id], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
    getplayer: async (data) => {
        return new Promise((resolve, reject) => {
            let page = data.page;
            let limit = 10;
            let start = (page * limit) - limit;
            let query='';
            if(data.search !=undefined  && data.search !=''){
                query= "where `name` Like '%"+data.search+"%'";
            }
            queryWrapper.execute(`select player_id,name,nationality,photo from merto_tbl_player_detail `+ query+` limit `+ start+`,`+limit,[data.userId], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
    getTotalplayer: async (data) => {
        return new Promise((resolve, reject) => {
            let query='';
            if(data.search !=undefined  && data.search !=''){
                query= "where `name` Like '%"+data.search+"%'";
            }
            queryWrapper.execute(`select player_id,name,photo from merto_tbl_player_detail `+ query ,[], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
}