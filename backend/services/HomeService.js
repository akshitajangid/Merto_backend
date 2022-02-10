const log4js = require('../common/logger');
const logger = log4js.getLogger('HomeService');
const queryWrapper = require('../config/database/queryWrapper')
const dbQuery = require('../common/dbQueries')
const meta = require('../config/meta.json');
const fs = require('fs');
//[SERVICE FOR LOGIN]
module.exports = {
    getCompetition: async (data,limit) => {
        return new Promise((resolve, reject) => {
            let page = data.page;
            let start = (page * limit) - limit;
            let query= "where `date` Like '%"+data.date+"%'";
            queryWrapper.execute(`select merto_tbl_fixture.id,merto_tbl_fixture.league_id from merto_tbl_fixture inner join merto_tbl_league on merto_tbl_league.id=merto_tbl_fixture.league_id  `+ query+` group by league_id limit `+ start+`,`+limit,[data.userId], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
    getTotalCompetition: async (data) => {
        return new Promise((resolve, reject) => {
            let query= "where `date` Like '%"+data.date+"%'";
            
            queryWrapper.execute(`select merto_tbl_fixture.id,merto_tbl_fixture.league_id from merto_tbl_fixture inner join merto_tbl_league on merto_tbl_league.id=merto_tbl_fixture.league_id `+ query + ` group by league_id ` ,[], function (response) {
                if (response.errno) {
                    console.log(response.sqlMessage);
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
    getFavCompetition: async (data,favid,limit) => {
        return new Promise((resolve, reject) => {
            let page = data.page;
            let start = (page * limit) - limit;
            let query= "where `date` Like '%"+data.date+"%' and league_id in ("+favid+")";
            queryWrapper.execute(`select id,league_id from merto_tbl_fixture `+ query+` group by league_id limit `+ start+`,`+limit,[data.userId], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
    getFavTotalCompetition: async (data,favid) => {
        return new Promise((resolve, reject) => {
            let query= "where `date` Like '%"+data.date+"%' and league_id in ("+favid+")";
            queryWrapper.execute(`select id,league_id from merto_tbl_fixture `+ query+` group by league_id  `,[data.userId], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
    getFavTotalTeamCompetition: async (data,favid) => {
        return new Promise((resolve, reject) => {
            let query= "where `date` Like '%"+data.date+"%' and (home_team_id in ("+favid+") or  away_team_id in ("+favid+"))";
            queryWrapper.execute(`select * from merto_tbl_fixture `+ query + ` group by league_id ` ,[], function (response) {
                if (response.errno) {
                    console.log(response.sqlMessage);
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
    getFavTeamCompetition: async (data,favid,limit) => {
        return new Promise((resolve, reject) => {
            let page = data.page;
            let start = (page * limit) - limit;
            let query= "where `date` Like '%"+data.date+"%' and (home_team_id in ("+favid+") or  away_team_id in ("+favid+"))";
            queryWrapper.execute(`select id,league_id from merto_tbl_fixture `+ query+` group by league_id limit `+ start+`,`+limit,[data.userId], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
    getMatch:async (data) => {
        return new Promise((resolve, reject) => {
            let query= "where `date` Like '%"+data.date+"%' and league_id ="+data.league_id+" and home_team_id="+data.home_team_id+" and away_team_id="+ data.away_team_id;
            queryWrapper.execute(`select DISTINCT(id) from merto_tbl_fixture `+ query ,[], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
    getMatchPlayer:async (fixtures_id,team_id) => {
        return new Promise((resolve, reject) => {
            let query= "where fixtures_id ="+fixtures_id+" and team_id="+team_id;
            queryWrapper.execute(`select player_id,fixtures_id,team_id,name,photo,cards,game from merto_tbl_player `+ query ,[], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
    getMatchStatistics:async (data) => {
        return new Promise((resolve, reject) => {
            queryWrapper.execute(`select * from merto_tbl_fixture_statistics where fixture_id=?` ,[data.fixtures_id], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
    getMatchTeam:async (data) => {
        return new Promise((resolve, reject) => {
            queryWrapper.execute(`select league_id,home_team_id,away_team_id from merto_tbl_fixture where id=?` ,[data.fixtures_id], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
    getMatchEvent:async (data) => {
        return new Promise((resolve, reject) => {
            queryWrapper.execute(`select event from merto_tbl_fixture_event where fixture_id=?` ,[data.fixtures_id], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
    getMatchsPrediction:async (data) => {
        return new Promise((resolve, reject) => {
            queryWrapper.execute(`select predictions,teams,comparison from merto_tbl_fixture_predictions where fixture_id=?` ,[data.fixtures_id], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
    getMatchByTeamId:async (data) => {
        return new Promise((resolve, reject) => {
            let query= "where (home_team_id ="+data.team_id+" or away_team_id ="+data.team_id+" )";
            queryWrapper.execute(`select home_team_id, away_team_id, goals, timestamp from merto_tbl_fixture ` +query ,[], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
    
    
}