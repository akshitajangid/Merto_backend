const log4js = require("log4js");

log4js.configure({
     disableClustering: true,
    appenders: {
      console: {
        type: 'console'
      },
      file: {
        type: 'file',
        filename: './log/sametalk.log',
        maxLogSize: 1024000,
        backups: 3,
        compress:true
      }
    },
    categories: {
      default: { appenders: ['console', 'file'], level: 'info' }
    }
  });
  
 module.exports=log4js