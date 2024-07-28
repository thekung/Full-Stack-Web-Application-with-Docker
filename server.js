const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');

const port = 8888;

app.use(cors());

var db_host = 'localhost';
var db_port = 3307;
if (process.env.NODE_ENV === 'production') {
  db_host = 'mysql-server';
	db_port = 3306;
}

const conn = mysql.createConnection({
	host: db_host,
	user: 'root',
	password: '1234',
	database: 'travel',
	port: db_port
});

app.get('/attractions', function(req, res, next){
	conn.query('SELECT * FROM attractions;', function(err, results, field){
		res.json(results);
	});
});

app.get('/attractions/:id', function(req, res, next){
	conn.query('SELECT * FROM attractions WHERE id=?;',[req.params.id], function(err, results, field){
		res.json(results);
	});
});

app.get('/', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'});
});

app.listen(port, function () {
  console.log(`CORS-enabled web server listening on port ${port}`);
});
