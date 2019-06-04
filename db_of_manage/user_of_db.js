let config = require('../config')

const mysql = require('mysql');

let db = mysql.createConnection(config.db);

let entries = require('./entries');



// 用户列表
exports.userList = (req, res) => {
    let ens = Object.assign({}, entries); 
    
    let sqlStr = `select USER.USER_ID as userId,USER_NAME as userName,USER_SIGNATURE as userSigature,USER_EMAIL as email,USER_IMG as userImg,USER_TYPE as userType,TEST_YEAR as testYear,GOAL_SCHOOL AS goalSchool,ifnull(essay_num,0) as essayNum FROM USER
    left JOIN (select USER_ID,count(*) as essay_num from ESSAY GROUP BY USER_ID) as temp_A
    on  USER.USER_ID = temp_A.USER_ID ORDER BY USER_NAME limit 0,8`;
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

//根据用户名查询 模糊查询
exports.queryByUserName = (req, res) => {
    let ens = Object.assign({}, entries); 
    let userName = req.body.userName;
    let sqlStr = `select USER_NAME as userName from USER where USER_NAME like '%${userName}%'`;
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
