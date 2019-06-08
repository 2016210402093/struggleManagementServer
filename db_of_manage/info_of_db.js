let config = require('../config')

const mysql = require('mysql');

let db = mysql.createConnection(config.db);

let entries = require('./entries');


// 院校信息列表
exports.infoList = (req, res) => {
    let ens = Object.assign({}, entries); 
    let page = req.body.page;
    if (page == null) page = 1; 
    let numOfPage = req.body.numOfPage;
    if (numOfPage == null) numOfPage = 3; 
    let sqlStr = `SELECT INFO_ID as infoId,INFO_TITLE as infoTitle,
    INFO_SUBTITLE as infoSubtitle,IMG_URL as imgUrl,INFO_CONTENT AS infoContent,
    USER_ID as userId ,CREATION_TIME as creationTime,
    LIKE_NUMBER as likeNumber from SCHOOL_INFO ORDER BY CREATION_TIME desc limit ${(page-1)*numOfPage},${numOfPage}`;
    db.query(sqlStr, (err, results) => {
        if (err) {
            console.log(err);
            ens.code = 0;
            ens.msg = '查询失败';
            return res.json(ens);
            
        }
        else {
            
            return res.json(results)
        }
            
    });
     

}

//根据标题查询院校信息
exports.queryByInfoTitle = (req, res) => {
    let ens = Object.assign({}, entries); 
    let infoTitle = req.body.infoTitle;
    let page = req.body.page;
    if (page == null) page = 1; 
    let numOfPage = req.body.numOfPage;
    if (numOfPage == null) numOfPage = 3; 
    let sqlStr = `SELECT INFO_ID as infoId,INFO_TITLE as infoTitle,
    INFO_SUBTITLE as infoSubtitle,IMG_URL as imgUrl,INFO_CONTENT AS infoContent,
    USER_ID as userId ,CREATION_TIME as creationTime,
    LIKE_NUMBER as likeNumber from SCHOOL_INFO  where INFO_TITLE like '%${infoTitle}%' ORDER BY CREATION_TIME DESC
    limit ${(page-1)*numOfPage},${numOfPage} `;
    db.query(sqlStr, (err, results) => {
        if (err) {
            console.log(err);
            throw err;
        }
        else {
            return res.json(results)
        }
    });    

}


//删除院校信息
exports.deleteInfo = (req, res) => {
    let ens = Object.assign({}, entries); 
    let infoId = req.body.infoId;
    let sqlStr = `delete from SCHOOL_INFO where INFO_ID = '${infoId}'`;
    db.query(sqlStr, (err, results) => {
        if (err) {
            console.log(err);
            ens.code = 0;
            ens.msg = '删除失败';
            return res.json(ens);
        }
        else {
            ens.code = 1;
            ens.msg = '删除成功';
            return res.json(ens);
        }
    });    

}
