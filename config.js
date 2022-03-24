module.exports = {
    db_connect:{
    connectionLimit: 100,
    host:"127.0.0.1",
    user:"root",
    password:"root",
    database:"krokvpred_final"
    },
    port:"80",
    sel: "SELECT schools.`school_id`,`name`,`info`,`rate`,`website`,`logo_href`,`maps_href`,region_id,city_id,second_name,street,PSC,druh_id,internat,type, GROUP_CONCAT(DISTINCT odbory.odbor_info SEPARATOR ';') AS Odbory, GROUP_CONCAT(DISTINCT phone) AS Phone, GROUP_CONCAT(DISTINCT email) AS Email, GROUP_CONCAT(DISTINCT category) AS chategory FROM `schools`  INNER JOIN address ON schools.address_id = address.address_id  INNER JOIN def ON schools.def_id = def.def_id  INNER JOIN type ON def.type_id = type.type_id  INNER JOIN `school-odbor`  INNER JOIN odbory ON `school-odbor`.school_id = schools.school_id AND `school-odbor`.odbor_id = odbory.odbor_id INNER JOIN `school-category` ON schools.school_id = `school-category`.school_id  INNER JOIN category ON category.category_id = `school-category`.category_id INNER JOIN `school-phone` ON schools.school_id = `school-phone`.school_id  INNER JOIN `school-email` ON `school-email`.`school_id` = schools.school_id "  
}