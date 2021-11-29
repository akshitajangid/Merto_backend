const transporter = require('../config/mailer/mailConfig')
const appConstants = require('../common/appConstants')
exports.sendMail = function (email, subject,messageData , callback){
    let mailOptions = {
        from: [appConstants.MAILERSENDER],
        to: email,
        subject: subject,
        html: messageData
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            callback(0);
        }
        if(info){
            callback (1);
        }
    });
}