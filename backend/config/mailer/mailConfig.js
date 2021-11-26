'use strict';
const nodemailer = require('nodemailer');
const appConstants = require('../../common/appConstants')

let transporter = nodemailer.createTransport({
    host: 'smtpout.secureserver.net',
    port: 465,
    auth: {
        user:[appConstants.MAILERUSER],
        pass: [appConstants.MAILERPASSWORD]
    }
});

module.exports = transporter;