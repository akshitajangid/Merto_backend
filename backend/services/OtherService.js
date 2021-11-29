const log4js = require('../common/logger');
const logger = log4js.getLogger('DataService');
const queryWrapper = require('../config/database/queryWrapper')
const dbQuery = require('../common/dbQueries')
const meta = require('../config/meta.json');
const SimpleCrypto = require('simple-crypto-js').default;

//[SERVICE FOR LOGIN]
module.exports = {
    getWheatherData: async (data) => {
        return new Promise((resolve, reject) => {
            var axios = require("axios").default;
            var options = {
                method: 'GET',
                url: 'https://api.openweathermap.org/data/2.5/onecall',
                params: {lat: data.lat,lon:data.lon,exclude:'daily',units:data.units,appid:process.env.WHEATHER_APP_ID},
                headers: {
                    'x-rapidapi-host': process.env.API_HOST,
                    'x-rapidapi-key': process.env.API_KEY
                }
            };
            axios.request(options).then(async function (response) {
                var d=[];
                d.push(response.data);
              // let d=JSON.parse(response);
                // /console.log();
                resolve({ success: true, message: meta.USERCREATED, data: d})
            }).catch(function (error) {
                resolve({ success: false, message: 'error' ,data: 1})
            });
        })
    },
    getQuotes:async(data)=>{
        return new Promise((resolve, reject) => {
            queryWrapper.execute(`SELECT text,author FROM merto_tbl_quotes ORDER BY RAND() LIMIT 1` ,[], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: response })
                }
            });
        })
    },
    ContactUs:async(data)=>{
        let insertdata=[data.name,data.email,data.message,data.userId]
        console.log(insertdata);
        return new Promise((resolve, reject) => {
            queryWrapper.execute('INSERT INTO merto_tbl_contact(name,email,message,user_id) values(?,?,?,?)' ,insertdata, function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sql })
                } else {
                    resolve({ success: true, message: meta.USERCREATED, data: 1 })
                }
            });
        })
    },
}