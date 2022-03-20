//#region Require
const express = require("express");
const mysql = require("mysql2");
const fs = require('fs')
var config = require('./config');
//#endregion

//#region Connect to MySQOL
const pool = mysql.createConnection(config.db_connect);
//#endregion

const app = express();

app.use("/assets/:uid/:file", function(req, res, next){
	var uid = req.params.uid, file = req.params.file;
    
	if (fs.existsSync(`./assets/${uid}/${file}`)){
        //console.log(__dirname +`/assets/${uid}/${file}`);
		res.sendFile(__dirname +`/assets/${uid}/${file}`);
	} else {
		res.send(403,'Sorry! you cant see that.');
	}
});

app.get("/",function (request, response) {
    response.sendFile(__dirname + "/assets/html/index.html",function(err){if(err){console.log(err)}});
});
app.get("/search",function (request, response) {
    response.sendFile(__dirname + "/assets/html/search.html",function(err){if(err){console.log(err)}});
});
app.get("/school",function (request, response) {
    response.sendFile(__dirname + "/assets/html/school.html",function(err){if(err){console.log(err)}});
});

//#region Returns data about schools
app.get("/server",function (request, response) {
    //if(!request.body) return response.sendStatus(400);
	var str=[]
	for(let i=0; i<Object.keys(request.query).length;i++) {
        switch (Object.keys(request.query)[i]){
            case "city_id":
                var str2=[]
                for(let x=0; x<Object.values(request.query)[i].split(",").length; x++){
                    str2.push(`address.city_id = ${Object.values(request.query)[i].split(",")[x]}`);
                }
                str.push(str2.join(" or "))
                break;
            case "category_id":
                var str2=[]
                for(let x=0; x<Object.values(request.query)[i].split(",").length; x++){
                    str2.push(`(category.city_id = ${Object.values(request.query)[i].split(",")[x]}`);
                }
                str.push(str2.join(" or "))
                break;
            default:
                var str2=[]
                for(let x=0; x<Object.values(request.query)[i].split(",").length; x++){
                    str2.push(`${Object.keys(request.query)[i]} = ${Object.values(request.query)[i].split(",")[x]}`);
                }
                str.push(str2.join(" or "))
                break;
        }
    }
    console.log("str:",str);
    var req = str.join(" and ");
    var r = (req.length)? config.sel+"WHERE "+req+" GROUP BY schools.school_id": config.sel+"GROUP BY schools.school_id";
    console.log(r);
    pool.query(r, 
	function(err, results) {
    	console.log("results:",results); 
        console.log("error:",err);
        response.send(results);
    });
});

//#endregion

app.listen(config.port, ()=>console.log("Сервер запущен..."));