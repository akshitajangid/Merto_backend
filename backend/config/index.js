'use strict';
const mysql = require('mysql');

module.exports = {
    env: process.env.NODE_ENV || 'development',
    server: {
        port: process.env.PORT || 3005,
    },
    logging: {
        level: process.env.LOG_LEVEL || 'debug',
    },
    redis: {
        client: "redis://13.233.69.209:6379",
        authPass: "",
        port: "6379",
        tls: {
            key: "readCertFile",
            cert: "readCertFile",
            ca: ["readCertFile"]
        }
    },
    connection: {
        dbConnection: mysql.createConnection({
            host: 'localhost',
            port: '3306',
            user: 'merto',
            password: 'Merto@4321',
            database: 'merto',
            multipleStatements: true
        })
    },
    // connection: {
    //     dbConnection: mysql.createConnection({
    //         host: 'localhost',
    //         port: '3306',
    //         user: 'root',
    //         password: '',
    //         database: 'sametalk',
    //         multipleStatements: true
    //     })
    // },
};