let config = require('../config')

const mysql = require('mysql');

let db = mysql.createConnection(config.db);

let entries = require('./entries');


// 院校信息列表
exports.infoList = (req, res) => {
    let ens = Object.assign({}, entries); 
    let sqlStr = `select INFO_ID, INFO_TITLE, CREATION_TIME, INFO_SUBTITLE, LIKE_NUMBER, IMG_URL  from SCHOOL_INFO  order by INFO_ID DESC`;
    db.query(sqlStr, (err, results) => {
        if (err) {
            console.log(err);
            throw err;
        }
        else {
            return res.json(formatCreationTime(results))
        }
    });    

}

//根据标题查询院校信息
exports.queryByInfoTitle = (req, res) => {

    let infoTitle = req.body.infoTitle;
    let ens = Object.assign({}, entries); 
    let sqlStr = `select INFO_ID, INFO_TITLE, CREATION_TIME, INFO_SUBTITLE, LIKE_NUMBER, IMG_URL  from SCHOOL_INFO  where INFO_TITLE like '%${infoTitle}%'  order by INFO_ID DESC`;
    db.query(sqlStr, (err, results) => {
        if (err) {
            console.log(err);
            throw err;
        }
        else {
            return res.json(formatCreationTime(results))
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

//添加院校信息
exports.addInfo = (req, res) =>{
    let ens = Object.assign({}, entries); 
    let sqlStr = 'insert into SCHOOL_INFO set ?';
    db.query(sqlStr, {
        USER_ID: req.body.userId,
        INFO_TITLE: req.body.infoTitle,
        INFO_SUBTITLE: req.body.infoSubTitle,
        INFO_CONTENT: req.body.infoContent,
        IMG_URL: 'infoImg/25xwy20191616181549.jpg',
    }, (err, results) => {
        if (err) {
            console.log(err);
            ens.code = 0;
            ens.msg = '添加失败';
            return res.json(ens);
        }
        else {
            ens.code = 1;
            ens.msg = '添加成功';
            return res.json(ens);
        }
    });
}
