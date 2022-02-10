const log4js = require('../common/logger');
const logger = log4js.getLogger('CronJobService');
const queryWrapper = require('../config/database/queryWrapper')
const dbQuery = require('../common/dbQueries')
const meta = require('../config/meta.json');
const helpers = require('../helpers/cronjob');
const fs = require('fs');
//[SERVICE FOR LOGIN]
module.exports = {
    Storeleague: async () => {
        let year=new Date().getFullYear();
        await helpers.deleteleaguedata();
        return new Promise((resolve, reject) => {
            var axios = require("axios").default;
            var options = {
                method: 'GET',
                url: 'https://api-football-v1.p.rapidapi.com/v3/leagues',
                params: {season: year},
                headers: {
                    'x-rapidapi-host': process.env.API_HOST,
                    'x-rapidapi-key': process.env.API_KEY
                }
            };
            axios.request(options).then(async function (response) {
                let res=response.data.response;
                
                for(var i=0;i<res.length;i++){
                    let league=res[i].league;
                    let country=res[i].country;
                    let seasons=res[i].seasons;
                    let leagueS=await helpers.StoreLeadugeData(league);
                    //console.log('ASAS'+league_id);
                    let countryS=await helpers.StoreLeadugeCountryData(country,leagueS.data);
                    for(var j=0;j<seasons.length;j++){
                        let seasonsD=await helpers.StoreLeadugeSeasonsData(seasons[j],leagueS.data);
                    }
                    await helpers.deleteLeagueStanding(league.id,year)
                    let r= await helpers.storeLeagueStanding(league.id,year);
                    //console.log(r.data);
                }
                 resolve({ success: true, message: meta.USERCREATED, data: r.data})
            }).catch(function (error) {
                resolve({ success: false, message: 'error' ,data: 1})
            });
        })
    },
    StoreTeam: async (lad) => {
        let leaduges=await helpers.getleaguedata();
        let teamex=await helpers.deleteleagueteam();
        let leaduge=leaduges.data;
        let totalleaduge=leaduge.length;
        
        return new Promise((resolve, reject) => {
            let year=new Date().getFullYear();
            console.log(totalleaduge);
            for(var i=0;i<totalleaduge;i++){
                let leagueid=leaduge[i].id;
                setTimeout(function timer() {
                    console.log(leagueid);
                        var axios = require("axios").default;
                        var options = {
                            method: 'GET',
                            url: 'https://api-football-v1.p.rapidapi.com/v3/teams',
                            params: {league: String(leagueid), season: String(year)},
                            headers: {
                                'x-rapidapi-host': process.env.API_HOST,
                                'x-rapidapi-key': process.env.API_KEY
                            }
                        };
                        axios.request(options).then(async function (response) {
                            let res=response.data.response;
                            
                            for(var j=0;j<res.length;j++){
                                let team_array=res[j].team;
                                let venue_array=res[j].venue;
                                let leagueteam=await helpers.Storeleagueteam(team_array.id,leagueid);
                                let teamex=await helpers.checkTeamData(team_array);

                                if(teamex.data.length==0){
                                    let team=await helpers.StoreTeamData(team_array);
                                    let venue=await helpers.StoreVenueData(venue_array,team.data);
                                }
                                else{
                                    let team=await helpers.updateTeamData(team_array);
                                    let venue=await helpers.updateVenueData(venue_array,team.data);
                                }
                                
                            }
                           //resolve({ success: true, message: meta.USERCREATED, data: 1})
                        }).catch(function (error) {
                            //resolve({ success: false, message: error ,data: 1})
                        });
                }, i * 3000);
            }
           resolve({ success: true, message: meta.USERCREATED, data: 1})
        })
    },
    StoreFixtures: async (data) => {
        let date = new Date()
        let day = date.getDate().toString().padStart(2, "0");
        let month = (date.getMonth()+1).toString().padStart(2, "0");
        let year = date.getFullYear();
        let fullDate = `${year}-${month}-${day}`;
        //data.date; //`${year}-${month}-${day}`;
        console.log(fullDate);
        // let teamex=await helpers.deleteFixtures(fullDate);
         return new Promise(async(resolve, reject) => {
            var axios = require("axios").default;
            var options = {
                method: 'GET',
                url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
                params: {date: String(fullDate)},
                headers: {
                    'x-rapidapi-host': process.env.API_HOST,
                    'x-rapidapi-key': process.env.API_KEY
                }
            };
            axios.request(options).then(async function (response) {
                let res=response.data.response;
                console.log(res.length);
                for(var j=0;j<res.length;j++){
                    let fixture=res[j].fixture;
                    let league=res[j].league;
                    let teams=res[j].teams;
                    let goals=res[j].goals;
                    let score=res[j].score;
                    let fixtures=await helpers.Storefixtures(fixture,league,teams,goals,score);
                    let fixtureid=fixture.id;
                    await helpers.deletePlayer(fixtureid);
                    await helpers.deletepredictions(fixtureid);
                    await helpers.deleteinjuries(fixtureid);
                    await helpers.deletestatistics(fixtureid);
                    await helpers.deleteEvent(fixtureid);

                    await helpers.storePlayer(fixtureid);
                    await helpers.storeinjuries(fixtureid);
                    await helpers.storestatistics(fixtureid);
                    await helpers.storepredictions(fixtureid);
                    await helpers.storeEvent(fixtureid);
                    console.log(j);
                }
                resolve({ success: true, message: meta.USERCREATED, data: 1})
            }).catch(function (error) {
                 resolve({ success: false, message: error ,data: 1})
             });
         })
    },
   
}