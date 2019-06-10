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
exports.getAllClockInfo = (req, res) => {
    let ens = Object.assign({}, entries); 
    let sqlStr = `select CLOCK.CLOCK_ID, CLOCK.CLOCK_CONTENT, CLOCK.CREATION_TIME, USER.USER_NAME from CLOCK,USER WHERE CLOCK.USER_ID=USER.USER_ID`;
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

exports.queryByUserName= (req, res) => {
    let ens = Object.assign({}, entries); 
    let userName = req.body.userName;
    let sqlStr = `select CLOCK.CLOCK_ID, CLOCK.CLOCK_CONTENT, CLOCK.CREATION_TIME, USER.USER_NAME from CLOCK,USER WHERE CLOCK.USER_ID=USER.USER_ID AND USER.USER_NAME like '%${userName}%'`;
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


exports.deleteClock = (req, res)=>{
    let ens = Object.assign({}, entries); 
    let clockId = req.body.clockId;
    let sqlStr = `delete from CLOCK where CLOCK_ID = '${clockId}'`;
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
