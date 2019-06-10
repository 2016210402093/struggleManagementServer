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

// 用户列表
exports.userList = (req, res) => {
    let ens = Object.assign({}, entries); 
    let sqlStr = `select * from USER WHERE USER_TYPE = 1`;
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

//根据用户名查询 模糊查询
exports.queryByUserName = (req, res) => {
    let ens = Object.assign({}, entries); 
    let userName = req.body.userName;
    let sqlStr = `select * from USER WHERE USER_TYPE = 1 AND USER_NAME like '%${userName}%'`;
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

//增加用户
exports.addUser = (req, res) => {
    let ens = Object.assign({}, entries); 
    let userName = req.body.userName;
    let password = req.body.password;
    let email = req.body.email;
    let testYear = req.body.testYear;
    let goalSchool = req.body.goalSchool;

    let sqlStr = 'insert into USER set ?';
    db.query(sqlStr,{USER_NAME: userName, USER_PASSWORD: password,
         USER_EMAIL: email,TEST_YEAR:testYear,GOAL_SCHOOL:goalSchool, USER_TYPE:1}, (err, results) => {
        if (err) {
            console.log(err);
            ens.code = 0;
            ens.msg = '注册失败';
            return res.json(ens);
        }
        else {
            ens.code = 1;
            ens.msg = '注册成功';
            return res.json(ens);
        }
    });    

}

// 删除用户

exports.deleteUser = (req, res) => {
    let ens = Object.assign({}, entries); 
    let userId = req.body.userId;
    let sqlStr = `delete from USER where USER_ID = '${userId}'`;
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

