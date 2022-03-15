//#region Require lib's
const express = require("express");
const mysql = require("mysql2");
const fs = require('fs')
var connect = require('./connect');
//#endregion

//#region Connect to MySQOL

// const connection = mysql.createConnection({
//   host: connect.host,
//   user: connect.user,
//   database: connect.database,
//   password: connect.password
// });

//#endregion

function db_req(req){
	connection.query(sel+req,
	function(err, results, fields) {
    	console.log(err);
    	console.log(results); // собственно данные
		console.log("/n/n/n");
    	console.log(fields); // мета-данные полей 
});
}
//
const app = express();

app.use("/assets/:uid/:file", function(req, res, next){
	var uid = req.params.uid, file = req.params.file;
	if (fs.existsSync(__dirname +`/assets/${uid}/${file}`)){
		res.sendFile(__dirname +`/assets/${uid}/${file}`);
	} else {
		res.send(403, 'Sorry! you cant see that.');
	}
});
app.get("/",function (request, response) {
    response.sendFile(__dirname + "/index.html",function(err){console.log(err);});
});

app.listen(80, ()=>console.log("Сервер запущен..."));