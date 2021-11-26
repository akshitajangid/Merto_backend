const queryWrapper = require('../config/database/queryWrapper')
var request = require("request");
const meta = require('../config/meta.json');

module.exports = {
    StoreLeadugeData: async (data) => {
        let insertData = [ data.id,data.name,data.type,data.logo];
        return new Promise((resolve, reject) => {
            queryWrapper.execute(`INSERT INTO merto_tbl_league(id,name,type,logo) VALUES (?,?,?,?)`,insertData, function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response.insertId })
                }
            });
        })
    },
    StoreLeadugeCountryData: async (data,league_id) => {
        let insertData = [ league_id,data.name,data.code,data.flag];
        console.log('league_id'+league_id);
        return new Promise((resolve, reject) => {
            queryWrapper.execute(`INSERT INTO merto_league_country(league_id,name,code,flag) VALUES (?,?,?,?)`,insertData, function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response.insertId })
                }
            });
        })
    },
    StoreLeadugeSeasonsData: async (data,league_id) => {
        let insertData = [ league_id,data.year,data.start,data.end,JSON.stringify(data.coverage)];
        return new Promise((resolve, reject) => {
            queryWrapper.execute(`INSERT INTO merto_league_seasons(league_id,year,start,end,coverage) VALUES (?,?,?,?,?)`,insertData, function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response.insertId })
                }
            });
        })
    },
    deleteleaguedata: async (data,league_id) => {
        return new Promise((resolve, reject) => {
            queryWrapper.execute('DELETE merto_tbl_league,merto_league_country,merto_league_seasons FROM merto_tbl_league INNER JOIN merto_league_country ON `merto_tbl_league`.`ai`= `merto_league_country`.`league_id` INNER JOIN merto_league_seasons ON `merto_tbl_league`.`ai`= `merto_league_seasons`.`league_id` WHERE 1',[], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response.insertId })
                }
            });
        })
    },
    getleaguedata: async () => {
        return new Promise((resolve, reject) => {
            queryWrapper.execute('SELECT id FROM merto_tbl_league WHERE 1',[], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
    checkTeamData:async (data) => {
        let insertData = [ data.id];
        return new Promise((resolve, reject) => {
            queryWrapper.execute(`select * from merto_tbl_team where id=?`,insertData, function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
    StoreTeamData: async (data) => {
        let insertData = [ data.id,data.name,data.country,data.founded,data.national,data.logo];
        return new Promise((resolve, reject) => {
            queryWrapper.execute(`INSERT INTO merto_tbl_team(id,name,country,founded,national,logo) VALUES (?,?,?,?,?,?)`,insertData, function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response.insertId })
                }
            });
        })
    },
    StoreVenueData: async (data,team_id) => {
        let insertData = [ team_id,data.id,data.name,data.address,data.city,data.capacity,data.surface,data.image];
        return new Promise((resolve, reject) => {
            queryWrapper.execute(`INSERT INTO merto_team_venue(team_id,id,name,address,city,capacity,surface,image)  VALUES (?,?,?,?,?,?,?,?)`,insertData, function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response.insertId })
                }
            });
        })
    },
    updateTeamData: async (data) => {
        let insertData = [ data.name,data.country,data.founded,data.national,data.logo,data.id];
        return new Promise((resolve, reject) => {
            queryWrapper.execute(`UPDATE merto_tbl_team SET name=?,country=?,founded=?,national=?,logo=? where id=? `,insertData, function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response.insertId })
                }
            });
        })
    },
    updateVenueData: async (data,team_id) => {
        let insertData = [data.id,data.name,data.address,data.city,data.capacity,data.surface,data.image,team_id];
        return new Promise((resolve, reject) => {
            queryWrapper.execute(`UPDATE merto_team_venue SET id=?,name=?,address=?,city=?,capacity=?,surface=?,image=? where team_id=?`,insertData, function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response.insertId })
                }
            });
        })
    },
    deleteleagueteam: async () => {
        return new Promise((resolve, reject) => {
            queryWrapper.execute('DELETE FROM `merto_league_team` WHERE 1',[], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response.insertId })
                }
            });
        })
    },
    Storeleagueteam: async (team_id,league_id) => {
        let insertData = [ league_id,team_id];
        return new Promise((resolve, reject) => {
            queryWrapper.execute(`INSERT INTO merto_league_team(league_id,team_id)VALUES (?,?)`,insertData, function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response.insertId })
                }
            });
        })
    },
    deleteFixtures: async (date) => {
        return new Promise((resolve, reject) => {
            queryWrapper.execute('DELETE FROM merto_tbl_fixture WHERE   date LIKE "%'+date+'%"',[], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response.insertId })
                }
            });
        })
    },
    Storefixtures: async (fixture,league,teams,goals,score) => {
        let insertData = [ fixture.id,fixture.referee,fixture.timezone,fixture.date,fixture.timestamp,JSON.stringify(fixture.periods),JSON.stringify(fixture.venue),JSON.stringify(fixture.status),league.id,teams.home.id,teams.away.id,JSON.stringify(goals),JSON.stringify(score)];
        console.log(insertData);
        return new Promise((resolve, reject) => {
            queryWrapper.execute(`INSERT INTO merto_tbl_fixture(id,referee,timezone,date,timestamp,periods,venue,status,league_id,home_team_id,away_team_id,goals,score) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,insertData, function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response.insertId })
                }
            });
        })
    },
    deletePlayer: async (fixtureid) => {
        return new Promise((resolve, reject) => {
            queryWrapper.execute('DELETE FROM merto_tbl_player WHERE fixtures_id=?',[fixtureid], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response.insertId })
                }
            });
        })
    },
    storePlayer: async (fixtureid) => {
        return new Promise((resolve, reject) => {
            var axios = require("axios").default;
            var options = {
                method: 'GET',
                url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures/players',
                params: {fixture: fixtureid},
                headers: {
                    'x-rapidapi-host': process.env.API_HOST,
                    'x-rapidapi-key': process.env.API_KEY
                }
            };
            axios.request(options).then(async function (response) {
                let res=response.data.response;
                let year=new Date().getFullYear();
                for(var j=0;j<res.length;j++){
                    let team=res[j].team;
                    let players=res[j].players;
                    console.log(players.length);
                    for(var k=0;k<players.length;k++){
                        let player=players[k].player;
                        let statistics=players[k].statistics;
                        let games=statistics[0].games;
                        let offsides=statistics[0].offsides;
                        let shots=statistics[0].shots;
                        let goals=statistics[0].goals;
                        let passes=statistics[0].passes;
                        let tackles=statistics[0].tackles;
                        let duels=statistics[0].duels;
                        let dribbles=statistics[0].dribbles;
                        let fouls=statistics[0].fouls;
                        let cards=statistics[0].cards;
                        let penalty=statistics[0].penalty;
                        let insertData = [ player.id,fixtureid,team.id,player.name,player.photo,JSON.stringify(games),offsides,JSON.stringify(shots),JSON.stringify(goals),JSON.stringify(passes),JSON.stringify(tackles),JSON.stringify(duels),JSON.stringify(dribbles),JSON.stringify(fouls),JSON.stringify(cards),JSON.stringify(penalty)];
                        console.log(insertData);
                            queryWrapper.execute(`INSERT INTO merto_tbl_player(player_id,fixtures_id,team_id,name,photo,game,offsides,shots,goals,passes,tackles,duels,dribbles,fouls,cards,penalty) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,insertData, function (response) {
                                if (response.errno) {
                                } else {
                                }
                            });
                        var options1 = {
                                method: 'GET',
                                url: 'https://api-football-v1.p.rapidapi.com/v3/players',
                                params: {id: player.id, season: year},
                                headers: {
                                    'x-rapidapi-host': process.env.API_HOST,
                                    'x-rapidapi-key': process.env.API_KEY
                                }
                        };
                        axios.request(options1).then(async function (response) {
                                let res=response.data.response;
                                for(var j=0;j<res.length;j++){
                                    let players=res[j].player;
                                    let statistics=res[j].statistics;
                                       
                                    let insertData = [ players.id,players.name,players.firstname,players.lastname,players.age,JSON.stringify(players.birth),players.nationality,players.height,players.weight,players.injured,players.photo,JSON.stringify(statistics)];
                                    queryWrapper.execute(`DELETE FROM merto_tbl_player_detail WHERE player_id=?`,[players.id], function (response) {
                                    if (response.errno) {
                                    } else {
                                    }
                                    });
                                    queryWrapper.execute(`INSERT INTO merto_tbl_player_detail(player_id,name,firstname,lastname,age,birth,nationality,height,weight,injured,photo,statistics) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,insertData, function (response) {
                                    if (response.errno) {
                                    } else {
                                     }
                                    });
                                }
                            resolve({ success: true, message: meta.USERCREATED, data: res})
                        }).catch(function (error) {
                            resolve({ success: false, message: error ,data: 1})
                        });
                    }
                }
                resolve({ success: true, message: meta.USERCREATED, data: res})
            }).catch(function (error) {
                resolve({ success: false, message: error ,data: 1})
            });
        });
    },
    deleteinjuries: async (fixtureid) => {
        return new Promise((resolve, reject) => {
            queryWrapper.execute('DELETE FROM merto_tbl_fixture_injuries WHERE fixture_id=?',[fixtureid], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response.insertId })
                }
            });
        })
    },
    storeinjuries: async (fixtureid) => {
        return new Promise((resolve, reject) => {
            var axios = require("axios").default;
            var options = {
                method: 'GET',
                url: 'https://api-football-v1.p.rapidapi.com/v3/injuries',
                params: {fixture: fixtureid},
                headers: {
                    'x-rapidapi-host': process.env.API_HOST,
                    'x-rapidapi-key': process.env.API_KEY
                }
            };
            axios.request(options).then(async function (response) {
                let res=response.data.response;
                for(var j=0;j<res.length;j++){
                    let team=res[j].team;
                    let players=res[j].players;
                    let fixture=res[j].fixture;
                    let league=res[j].league;               
                    let insertData = [ players.id,players.name,players.photo,players.type,players.reason,team.id,fixture.id,league.id];
                    queryWrapper.execute(`INSERT INTO merto_tbl_fixture_injuries(player_id,name,photo,type,reason,team_id,fixture_id,league_id) VALUES (?,?,?,?,?,?,?,?)`,insertData, function (response) {
                    if (response.errno) {
                    } else {
                     }
                    });
                }
                resolve({ success: true, message: meta.USERCREATED, data: res})
            }).catch(function (error) {
                resolve({ success: false, message: error ,data: 1})
            });
        });
    },
    deletestatistics: async (fixtureid) => {
        return new Promise((resolve, reject) => {
            queryWrapper.execute('DELETE FROM merto_tbl_fixture_statistics WHERE fixture_id=?',[fixtureid], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response.insertId })
                }
            });
        })
    },
    storestatistics: async (fixtureid) => {
        return new Promise((resolve, reject) => {
            var axios = require("axios").default;
            var options = {
                method: 'GET',
                url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures/statistics',
                params: {fixture: fixtureid},
                headers: {
                    'x-rapidapi-host': process.env.API_HOST,
                    'x-rapidapi-key': process.env.API_KEY
                }
            };
            axios.request(options).then(async function (response) {
                let res=response.data.response;
                for(var j=0;j<res.length;j++){
                    let team=res[j].team;
                    let statistics=res[j].statistics;
                    let insertData = [ fixtureid,JSON.stringify(team),JSON.stringify(statistics)];
                    console.log(insertData);
                    queryWrapper.execute(`INSERT INTO merto_tbl_fixture_statistics(fixture_id,team,statistics) VALUES (?,?,?)`,insertData, function (response) {
                    if (response.errno) {
                        console.log(response.sqlMessage);
                    } else {
                     }
                    });
                }
                resolve({ success: true, message: meta.USERCREATED, data: res})
            }).catch(function (error) {
                resolve({ success: false, message: error ,data: 1})
            });
        });
    },
    deletepredictions: async (fixtureid) => {
        return new Promise((resolve, reject) => {
            queryWrapper.execute('DELETE FROM merto_tbl_fixture_predictions WHERE fixture_id=?',[fixtureid], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response.insertId })
                }
            });
        })
    },
    storepredictions: async (fixtureid) => {
        return new Promise((resolve, reject) => {
            var axios = require("axios").default;
            var options = {
                method: 'GET',
                url: 'https://api-football-v1.p.rapidapi.com/v3/predictions',
                params: {fixture: fixtureid},
                headers: {
                    'x-rapidapi-host': process.env.API_HOST,
                    'x-rapidapi-key': process.env.API_KEY
                }
            };
            axios.request(options).then(async function (response) {
                let res=response.data.response;
                for(var j=0;j<res.length;j++){
                    let predictions=res[j].predictions;
                    let league=res[j].league;
                    let teams=res[j].teams;
                    let comparison=res[j].comparison;
                    let h2h=res[j].h2h;

                    let insertData = [ fixtureid,JSON.stringify(predictions),JSON.stringify(league),JSON.stringify(teams),JSON.stringify(comparison),JSON.stringify(h2h)];
                    console.log(insertData);
                    queryWrapper.execute(`INSERT INTO merto_tbl_fixture_predictions(fixture_id,predictions,league,teams,comparison,h2h) VALUES (?,?,?,?,?,?)`,insertData, function (response) {
                    if (response.errno) {
                        console.log(response.sqlMessage);
                    } else {
                     }
                    });
                }
                resolve({ success: true, message: meta.USERCREATED, data: res})
            }).catch(function (error) {
                resolve({ success: false, message: error ,data: 1})
            });
        });
    },
    deleteEvent: async (fixtureid) => {
        return new Promise((resolve, reject) => {
            queryWrapper.execute('DELETE FROM merto_tbl_fixture_event WHERE fixture_id=?',[fixtureid], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response.insertId })
                }
            });
        })
    },
    storeEvent: async (fixtureid) => {
        return new Promise((resolve, reject) => {
            var axios = require("axios").default;
            var options = {
                method: 'GET',
                url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures/events',
                params: {fixture: fixtureid},
                headers: {
                    'x-rapidapi-host': process.env.API_HOST,
                    'x-rapidapi-key': process.env.API_KEY
                }
            };
            axios.request(options).then(async function (response) {
                let res=response.data.response;
                for(var j=0;j<res.length;j++){
                    let event=res[j];
                    let insertData = [ fixtureid,JSON.stringify(event)];
                    console.log(insertData);
                    queryWrapper.execute(`INSERT INTO merto_tbl_fixture_event(fixture_id,event) VALUES (?,?)`,insertData, function (response) {
                    if (response.errno) {
                        console.log(response.sqlMessage);
                    } else {
                     }
                    });
                }
                resolve({ success: true, message: meta.USERCREATED, data: res})
            }).catch(function (error) {
                resolve({ success: false, message: error ,data: 1})
            });
        });
    },
    deleteLeagueStanding: async (league,season) => {
        return new Promise((resolve, reject) => {
            queryWrapper.execute('DELETE FROM merto_tbl_league_standing WHERE league_id=? and season=? ',[league,season], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response.insertId })
                }
            });
        })
    },
    storeLeagueStanding: async (league,season) => {
        return new Promise((resolve, reject) => {
            var axios = require("axios").default;
            var options = {
                method: 'GET',
                url: 'https://api-football-v1.p.rapidapi.com/v3/standings',
                params: {season: season,league:league},
                headers: {
                    'x-rapidapi-host': process.env.API_HOST,
                    'x-rapidapi-key': process.env.API_KEY
                }
            };
            axios.request(options).then(async function (response) {
                let res=response.data.response;
                for(var j=0;j<res.length;j++){
                    let league=res[j].league;
                    let standings=league.standings[0];
                    for(var k=0;k<standings.length;k++){   
                        var st=standings[k];          
                        let insertData = [ league.id,league.season,st.rank,st.team.id,st.team.name,st.team.logo,st.points,st.goalsDiff,st.group,st.form,st.status,st.description,JSON.stringify(st.all),JSON.stringify(st.home),JSON.stringify(st.away),st.update];
                        queryWrapper.execute('INSERT INTO merto_tbl_league_standing(`league_id`, `season`, `rank`, `team_id`,`team_name`,`team_logo`, `points`, `goalsDiff`, `group`, `form`, `status`, `description`, `all`, `home`, `away`, `update_date`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',insertData, function (response) {
                        if (response.errno) {
                            console.log(response.sql);
                            resolve({ success: true, message: meta.USERCREATED, data: response.sql})
                        } else {
                        }
                        });
                    }
                }
                resolve({ success: true, message: meta.USERCREATED, data: res})
            }).catch(function (error) {
                resolve({ success: false, message: error ,data: 1})
            });
        });
    },
}