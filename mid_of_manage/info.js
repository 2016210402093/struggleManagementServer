let express = require('express');
let router = express.Router();
let db = require('../db_of_manage/info_of_db');
let auth = require('./auth');


router.post('/infoList', auth,function(req, res){
    db.infoList(req,res);
});

router.post('/queryByInfoTitle',auth, function(req, res){
    db.queryByInfoTitle(req,res);
});

router.post('/deleteInfo', auth,function(req, res){
    db.deleteInfo(req,res);
});

router.post('/addInfo',auth, function(req, res){
    db.addInfo(req,res);
});
module.exports = router;