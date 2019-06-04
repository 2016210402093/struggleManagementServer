let config = require('../config')

const mysql = require('mysql');

let db = mysql.createConnection(config.db);

let entries = require('./entries');

//用户登录
exports.login = (req, res) => {
    let ens = Object.assign({}, entries); 
    let userName = req.body.userName;
    let password = req.body.password;

    let sqlStr = `select USER_NAME,USER_PASSWORD from USER where USER_NAME = '${userName}'`;
    db.query(sqlStr, (err, results) => {
        if (err) {
            console.log(err);
            throw err;
        }
        else if(!results.length){
            ens.code = 0;
            ens.msg = '账号密码错误';
            return res.json(ens);
        }
        else {
            if(results[0].USER_NAME===userName && results[0].USER_PASSWORD===password){
                ens.code = 1;
                ens.msg = '登陆成功';
                return res.json(ens);
            }
            else {
                ens.code = 0;
                ens.msg = '账号密码错误';
                return res.json(ens);
            }
        }

    });    


}
