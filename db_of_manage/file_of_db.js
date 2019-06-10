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

//获取所有文件信息
exports.getAllFileInfo = (req, res) => {
    let ens = Object.assign({}, entries); 
    let sqlStr = `select * from FILE order by FILE_ID DESC`;
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

exports.queryByFileName = (req, res) => {
    let ens = Object.assign({}, entries); 
    let fileName = req.body.fileName;
    let sqlStr = `select * FROM FILE WHERE FILE_NAME like '%${fileName}%' order by FILE_ID DESC`;
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


exports.deleteFile = (req, res)=>{
    let ens = Object.assign({}, entries); 
    let fileId = req.body.fileId;
    let sqlStr = `delete from FILE where FILE_ID = '${fileId}'`;
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

exports.addFile = (fileName, fileContent, fileType, userId, fileUrl, res)=>{
    let ens = Object.assign({}, entries); 
    let sqlStr = 'insert into FILE set ?';
    db.query(sqlStr, {
        FILE_NAME: fileName,
        FILE_CONTENT: fileContent,
        FILE_TYPE: fileType,
        USER_ID: userId,
        FILE_URL: `http://47.102.199.210/struggleResource/${fileUrl}`,
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
};

