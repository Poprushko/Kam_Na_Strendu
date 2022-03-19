//#region Require
const express = require("express");
const mysql = require("mysql2");
const fs = require('fs')
var config = require('./config');
//#endregion

//#region Connect to MySQOL and function db_req
//*
const connection = mysql.createConnection(config.db_connect);
function db_req(req){
    var r = (req.length)? config.sel+"WHERE "+req+" GROUP BY schools.school_id": config.sel+"GROUP BY schools.school_id";
    console.log(r);
    connection.query(r, 
	function(err, results, fields) {
    	console.log(results); 
        console.log("error:",err);
        return results;
    });
}
//*/
//#endregion

const app = express();

app.use("/assets/:uid/:file", function(req, res, next){
	var uid = req.params.uid, file = req.params.file;
    
	if (fs.existsSync(`./assets/${uid}/${file}`)){
        //console.log(__dirname +`/assets/${uid}/${file}`);
		res.sendFile(__dirname +`/assets/${uid}/${file}`);
	} else {
		res.send(403, 'Sorry! you cant see that.');
	}
});

app.get("/",function (request, response) {
    response.sendFile(__dirname + "/assets/html/index.html",function(err){console.log(err);});
});
app.get("/search",function (request, response) {
    response.sendFile(__dirname + "/assets/html/search.html",function(err){console.log(err);});
});
app.get("/school",function (request, response) {
    response.sendFile(__dirname + "/assets/html/school.html",function(err){console.log(err);});
});

//#region Returns data about schools
//*                                                                         SWITCH(add / to /*)
var schools = [
    {"school_id":2,"name":"Gymnázium Milana Rastislava Štefánika v Košiciach","info":"<p>Gymnázium  M. R. Štefánika patrí medzi najstaršie stredné školy na východnom Slovensku, do roku 1858 bolo jedinou strednou školou v Košiciach a do roku 1918 jediným klasickým gymnáziom v tomto meste. Popri existujúcom 4-ročnom gymnaziálnom štúdiu vznikla dňa 1. septembra 1991 slovensko-francúzska bilingválna sekcia zameraná na výučbu vybraných prírodovedných predmetov vo francúzskom jazyku, ktorá významne ovplyvnila ďalší kvalitatívny vývoj školy. Stalo sa tak na základe medzivládnej dohody uzavretej medzi Francúzskom a vtedajším Československom. Bilingválna sekcia takto spája dve kultúry, ktoré umožňujú mladým ľuďom mnohostrannejšie poznávanie života a umocňujú tvorivý rozvoj vlastnej osobnosti. </p>","rate":3.8,"website":"gmrske.edupage.org","logo_href":"assets/school_img/logo_skoly_2.jpg","maps_href":"https://www.google.com/maps/place/Nám. L. Novomeského 4, 04224 Košice-Staré Mesto","region":"Košický kraj","city":"Košice I.","second_name":"Košice-Staré Mesto","street":"Nám. L. Novomeského 4","PSC":"04224","internat":1,"type":"Štátna škola","Odbory":"","Phone":"+421917189580","Email":"antoniova@gmrske.sk"},
    {"school_id":5,"name":"Premonštrátske gymnázium","info":"<p>Premonštrátske gymnázium ponúka možnosť študovať priamo v srdci mesta v historickej školskej budove. Podmienkou pre prijatie je úspešné absolvovanie prijímacej skúšky, na škole však samozrejme ponúkame intenzívny prípravný kurz, s pomocou ktorého sa k nám určite dostaneš. Staň sa súčasťou gymnázia s najdlhšou tradíciou v meste Košice. Nadväzujeme na vyše 300-ročnú tradíciu, počas ktorej naše gymnázium tvorilo históriu tohto mesta. Ponúkame štvorročné štúdium, ktoré je zamerané humanitne, prírodovedne alebo IT smerom. Počet žiakov, ktorých môžeme prijať, je obmedzený z dôvodu kapacity budovy, tak neváhaj a prihlás sa k nám!</p>","rate":4.6,"website":"www.kovacska.sk","logo_href":"assets/school_img/logo_skoly_4.jpg","maps_href":"https://www.google.com/maps/place/Kováčska 28, Košice","region":"Košický kraj","city":"Košice I.","second_name":"Košice","street":"Kováčska 28","PSC":"04001","internat":1,"type":"Cirkevná škola","Odbory":"","Phone":"+421918193715","Email":"gymnazium.premonstrati@gmail.com"},
    {"school_id":6,"name":"Evanjelické gymnázium Jána Amosa Komenského ","info":"<p>Evanjelické gymnázium Jana Amosa Komenského poskytuje možnosť 5-ročného bilingválneho slovensko – anglického štúdia pre absolventov 8.ročníka, resp. 9.ročníka ZŠ a 5.ročníka ZŠ. Záujemcovia o štúdium sú pozvaní na talentové skúšky, ktoré overujú predpoklady uchádzačov na bilingválne štúdium a prijímacie skúšky zo slovenského jazyka a matematiky. Počet prijatých uchádzačov o štúdium je limitovaný obmedzenými kapacitnými možnosťami školskej budovy, v ktorej sa nachádzame, ktoré sú prekážkou prijatia veľkého počtu uchádzačov spĺňajúcich prijímacie kritéria.</p>","rate":3,"website":"http://www.egjak.sk","logo_href":"assets/school_img/logo_skoly_5.jpg","maps_href":"https://www.google.com/maps/place/Škultétyho 10, 04001 Košice-Staré Mesto","region":"Košický kraj","city":"Košice I.","second_name":"Košice-Staré Mesto","street":"Škultétyho 10","PSC":"04001","internat":1,"type":"Cirkevná škola","Odbory":"","Phone":"+42155/6815611","Email":"egjak@egjak.com"},
    {"school_id":9,"name":"Súkromné konzervatórium","info":"<h2 class=\"rtecenter\"><strong>V skratke: SKKE - konzervatórium pre Teba!</strong></h2>","rate":5,"website":"http://www.skke.sk","logo_href":"assets/school_img/logo_skoly_8.png","maps_href":"https://www.google.com/maps/place/Zádielska 12, 04001 Košice-Staré Mesto","region":"Košický kraj","city":"Košice I.","second_name":"Košice-Staré Mesto","street":"Zádielska 12","PSC":"04001","internat":1,"type":"Súkromná škola","Odbory":",hudobno-dramatické umenie,hudobno-dramatické umenie - muzikál,spev,tanec","Phone":"+421917621228","Email":"skke@skke.sk"},
    {"school_id":12,"name":"Stredná odborná škola obchodu a služieb Jána Bocatia","info":"<p><strong>Poslanie školy</strong></p>","rate":4.1,"website":"www.sosbocatiuske.org","logo_href":"assets/school_img/logo_skoly_11.png","maps_href":"https://www.google.com/maps/place/Bocatiova 1, 04001 Košice-Staré Mesto","region":"Košický kraj","city":"Košice I.","second_name":"Košice-Staré Mesto","street":"Bocatiova 1","PSC":"04001","internat":1,"type":"Štátna škola","Odbory":",čašník servírka,kuchár,manažment regionálneho cestovného ruchu,obchodný pracovník,poradenstvo vo výžive","Phone":"+421556323475","Email":"skola@sosbocatiuske.sk"},
    {"school_id":15,"name":"Stredná priemyselná škola dopravná","info":"<p><strong>SPŠ dopravná v Košiciach je jediná nadregionálna stredná škola, ktorá poskytuje komplexné odborné vzdelanie v oblasti dopravy - prevádzky a ekonomiky, elektrotechniky v doprave a telekomunikáciách, techniky a prevádzky cestných vozidiel,zasielateľstva a logistiky</strong></p>","rate":4.1,"website":"http://spsdopravnake.sk","logo_href":"assets/school_img/logo_skoly_14.jpg","maps_href":"https://www.google.com/maps/place/Hlavná 113, 04001 Košice-Staré Mesto","region":"Košický kraj","city":"Košice I.","second_name":"Košice-Staré Mesto","street":"Hlavná 113","PSC":"04001","internat":1,"type":"Štátna škola","Odbory":",dopravná akadémia,elektrotechnika v doprave a telekomunikáciách,prevádzka a ekonomika dopravy,technika a prevádzka dopravy","Phone":"+42155/7277011","Email":"spsdke@spsdopravnake.sk"},
    {"school_id":16,"name":"Gymnázium, Trebišovská 12 Košice","info":"<h5><strong>Pár slov našej školy</strong></h5>","rate":4.5,"website":"https://www.gt12.sk","logo_href":"assets/school_img/logo_skoly_15.jpg","maps_href":"https://www.google.com/maps/place/Trebišovská 12, 04011 Košice-Západ","region":"Košický kraj","city":"Košice II.","second_name":"Košice-Západ","street":"Trebišovská 12","PSC":"04011","internat":1,"type":"Štátna škola","Odbory":"","Phone":"+421910897952","Email":"skola@gt12.sk"},{"school_id":8,"name":"Konzervatórium","info":`<p><strong>"Dajte svojmu talentu všetko, čo potrebuje</strong></p>`,"rate":4.7,"website":"www.konke.sk","logo_href":"assets/school_img/logo_skoly_7.png","maps_href":"https://www.google.com/maps/place/Timonova 2, 04203 Košice-Staré Mesto","region_id":3,"city_id":24,"second_name":"Košice-Staré Mesto","street":"Timonova 2","PSC":"04203","internat":0,"type":"Štátna škola","Odbory":",hudba - hra na akordeóne,hudba - hra na flaute, hoboji, klarinete, fagote, trúbke, saxofóne, lesnom rohu,hudba - hra na husliach, viole, violončele, kontrabase, harfe, gitare, cimbale,hudba - hra na klavíri,hudba - hra na organe,hudba - skladba,hudobno-dramatické umenie,spev,tanec","Phone":"+421910183985","Email":"sekretariat@konke.sk","chategory":"Umenie a umeleckoremeselná tvorba"}
];
app.get("/server",function (request, response) {
    //if(!request.body) return response.sendStatus(400);
	var str=[]
	for(let i=0; i<Object.keys(request.query).length;i++) {
		switch (Object.keys(request.query)[i]){
			case "city_id ":
				str.push(`(address.${Object.keys(request.query)[i]} = ${Object.values(request.query)[i].split(",").join(" or ")})`);
				break;
			case "category_id":
				str.push(`(category.${Object.keys(request.query)[i]} = ${Object.values(request.query)[i].split(",").join(" or ")})`);
				break;
			default:
				str.push(`(${Object.keys(request.query)[i]} = ${Object.values(request.query)[i].split(",").join(" or ")})`)
				break;
		}
		console.log(str);
	}
    //*
    response.send(schools);
    /*/
    response.setHeader('Content-Type', 'application/json');
    response.send(db_req(str.join(" and ")));
    //*/
});
//*/
//#endregion

app.listen(config.port, ()=>console.log("Сервер запущен..."));