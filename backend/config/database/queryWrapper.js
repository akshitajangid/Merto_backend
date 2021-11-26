'use strict';
const config = require('../index');
const mysql = config.connection.dbConnection;

exports.execute = function(query, bindValuesArray, resultCallBack) {
  mysql.query(query, bindValuesArray, function(error, resultData) {
    if (error) {
        //console.log(error);
        resultCallBack(error);
    }
    if (resultData) {
        //console.log(resultData);
        resultCallBack(resultData);
      }
  });
};
