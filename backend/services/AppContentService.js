'use strict';
const log4js = require('../common/logger');
const logger = log4js.getLogger('AppContentService');
const queryWrapper = require('../config/database/queryWrapper')
const dbQuery = require('../common/dbQueries')
const meta = require('../config/meta.json');
const SimpleCrypto = require('simple-crypto-js').default;

//[SERVICE FOR LOGIN]
module.exports = {
    
    getcontent: async () => {
        return new Promise((resolve, reject) => {
            queryWrapper.execute(`select * from merto_tbl_app_content `,[], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                   
                    resolve({ success: true, message: meta.USERCREATED, data: response})
                }
            });
        })
    },
    gethelp: async () => {
        return new Promise((resolve, reject) => {
            queryWrapper.execute(`select * from merto_tbl_help`,[], function (response) {
                if (response.errno) {
                    resolve({ success: false, message: response.sqlMessage })
                } else {
                    console.log(response);
                    resolve({ success: true, message: meta.USERCREATED, data: response})
                }
            });
        })
    }
}