let express = require('express');
let router = express.Router();
let db = require('../db_of_manage/file_of_db');
let fs = require('fs');
let multer  = require('multer');
let auth = require('./auth');


let fileName = '';

// 使用硬盘存储模式设置存放接收到的文件的路径以及文件名
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 接收到文件后输出的保存路径（若不存在则需要创建）
        // cb(null, '../exampleCodes'); //本地
        cb(null, '../local/nginx/html/struggleResource'); //服务器
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
        fileName = Date.now() + "-" + file.originalname
        cb(null, fileName);
    }
});

// 创建文件夹
let createFolder = function(folder){
    try{
        // 测试 path 指定的文件或目录的用户权限,我们用来检测文件是否存在
        // 如果文件路径不存在将会抛出错误"no such file or directory"
        fs.accessSync(folder);
    }catch(e){
        // 文件夹不存在，以同步的方式创建文件目录。
        fs.mkdirSync(folder);
    }
};

// let uploadFolder = '../exampleCodes'; //本地
let uploadFolder = '../local/nginx/html/struggleResource'; //服务器
createFolder(uploadFolder);

// 创建 multer 对象
let upload = multer({ storage: storage });



router.post('/fileList', auth, function(req, res){
    db.getAllFileInfo(req,res);
});

router.post('/queryByfileName',auth, function(req, res){
    db.queryByFileName(req,res);
});

router.post('/deleteFile',auth, function(req, res){
    db.deleteFile(req,res);
});

router.post('/addFile', upload.single('file'), function(req, res){

    try {
        let file = req.file;
        console.log(111111111,req.file);
        console.log('文件类型：%s', file.mimetype);
        console.log('原始文件名：%s', file.originalname);
        console.log('文件大小：%s', file.size);
        console.log('文件保存路径：%s', file.path);
        console.log(file.originalname, req.body.fileContent, req.body.type, req.body.userId, fileName,)
        db.addFile(file.originalname, req.body.fileContent, req.body.type, req.body.userId, fileName, res);

    }catch(e)
    {
        res.json({res_code: '0', msg: '上传失败:'+e});
    }

});


module.exports = router;