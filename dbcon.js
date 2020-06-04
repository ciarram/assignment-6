var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs290_murphyci',
  password        : 'bmb3hp',
  database        : 'cs290_murphyci'
});

module.exports.pool = pool;
