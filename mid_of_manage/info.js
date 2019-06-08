let express = require('express');
let router = express.Router();
let db = require('../db_of_manage/info_of_db');


router.post('/infoList', function(req, res){
    db.infoList(req,res);
});

router.post('/queryByInfoTitle', function(req, res){
    db.queryByInfoTitle(req,res);
});

router.post('/addInfo', function(req, res){
    db.addInfo(req,res);
});
module.exports = router;