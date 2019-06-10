let config = require('../config')

const mysql = require('mysql');

let db = mysql.createConnection(config.db);

let entries = require('./entries');

let moment = require('moment');



formatCreationTime = (results) =>{
    for(let i=0; i<results.length; ++i){
        results[i].CREATION_TIME = moment(results[i].CREATION_TIME).format("YYYY-MM-DD HH:mm:ss");
    }
    return results;
}

//获取所有帖子信息
exports.getAllEssayInfo = (req, res) => {
    let ens = Object.assign({}, entries); 
    let sqlStr = `select ESSAY.ESSAY_ID, ESSAY.ESSAY_TITLE, ESSAY.CREATION_TIME, USER.USER_NAME from ESSAY,USER WHERE ESSAY.USER_ID=USER.USER_ID`;
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

exports.queryByEssayTitle = (req, res) => {
    let ens = Object.assign({}, entries); 
    let essayTitle = req.body.essayTitle;
    let sqlStr = `select ESSAY.ESSAY_ID, ESSAY.ESSAY_TITLE, ESSAY.CREATION_TIME, USER.USER_NAME from ESSAY,USER WHERE ESSAY.USER_ID=USER.USER_ID AND ESSAY.ESSAY_TITLE like '%${essayTitle}%'`;
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


exports.deleteEssay = (req, res)=>{
    let ens = Object.assign({}, entries); 
    let essayId = req.body.essayId;
    let sqlStr = `delete from ESSAY where ESSAY_ID = '${essayId}'`;
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
};
