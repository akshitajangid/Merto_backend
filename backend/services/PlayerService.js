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
}