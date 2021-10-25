const { createPool } = require("mysql");

console.log('Access DB file');

const pool =createPool({
  host:"localhost",
	port:"3306",
	user:"merto",
	password:"Merto@4321",
	database:"merto",
	connectionLimit:10
});


pool.on('connection', function (connection) {
  console.log('DB Connection established');

  connection.on('error', function (err) {
    console.error(new Date(), 'MySQL error', err.code);
  });
  connection.on('close', function (err) {
    console.error(new Date(), 'MySQL close', err);
  });

});

module.exports= pool;