const log4js = require('../common/logger');
const logger = log4js.getLogger('LeagueService');
const queryWrapper = require('../config/database/queryWrapper')
const dbQuery = require('../common/dbQueries')
const meta = require('../config/meta.json');
const fs = require('fs');
//[SERVICE FOR LOGIN]
module.exports = {
    getleague: async (data) => {
        return new Promise((resolve, reject) => {
            let page = data.page;
            let limit = 10;
            let start = (page * limit) - limit;
            let query='';
            if(data.search !=undefined  && data.search !=''){
                query= "where `name` Like '%"+data.search+"%'";
            }
            queryWrapper.execute(`select id,name,logo,(select count(id) from merto_tbl_fav_leagues where user_id =? and leagues_id=merto_tbl_league.id) as is_favourite from merto_tbl_league `+ query+` limit `+ start+`,`+limit,[data.userId], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
    getTotalleague: async (data) => {
        return new Promise((resolve, reject) => {
            let query='';
            if(data.search !=undefined  && data.search !=''){
                query= "where `name` Like '%"+data.search+"%'";
            }
            queryWrapper.execute(`select id,name,logo from merto_tbl_league `+ query ,[], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
    Checkfavouriteleague:async (data) => {
        let checkdata=[data.league_id,data.user_id];
        return new Promise((resolve, reject) => {
            queryWrapper.execute(`select * from merto_tbl_fav_leagues where leagues_id=? and  user_id=?` ,checkdata, function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
    addfavouriteleague:async (data) => {
        console.log(data);
        let checkdata=[data.league_id,data.user_id,Date.now()];

        return new Promise((resolve, reject) => {
            queryWrapper.execute(`insert into merto_tbl_fav_leagues (leagues_id,user_id,timestamp) VALUES (?,?,?)`,checkdata, function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
    removefavouriteleague:async (data) => {
        let checkdata=[data.league_id,data.user_id];
        return new Promise((resolve, reject) => {
            queryWrapper.execute(`DELETE FROM merto_tbl_fav_leagues WHERE leagues_id=? and user_id=?` ,checkdata, function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
    getLeagueById:async (user_id,league_id) => {
        let checkdata=[user_id,league_id];
        return new Promise((resolve, reject) => {
            queryWrapper.execute(`select id,name,logo,(select count(id) from merto_tbl_fav_leagues where user_id =? and leagues_id=merto_tbl_league.id) as is_favourite from merto_tbl_league where id=?` ,checkdata, function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
    getLeagueTeam:async (date,league_id) => {
        let checkdata=[league_id];
        let query= " and `date` Like '%"+date+"%'";
        return new Promise((resolve, reject) => {
            queryWrapper.execute(`select * from merto_tbl_fixture where league_id=? `+query ,checkdata, function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
    leagueStanding:async (data) => {
        
        let checkdata=[data.league_id,data.season];
        return new Promise((resolve, reject) => {
            queryWrapper.execute('select `rank`,`team_id`,`team_name`,`team_logo`,`points`,`goalsDiff`,`all` from merto_tbl_league_standing where league_id=? and season=? ' ,checkdata, function (response) {
                if (response.errno) {
                    console.log(response.sqlMessage);

                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
}