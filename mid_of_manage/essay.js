let express = require('express');
let router = express.Router();
let db = require('../db_of_manage/essay_of_db');
let auth = require('./auth');


router.post('/essayList', auth, function(req, res){
    db.getAllEssayInfo(req,res);
});

router.post('/deleteEssay',auth, function(req, res){
    db.deleteEssay(req,res);
});

router.post('/queryByEssayTitle',auth, function(req, res){
    db.queryByEssayTitle(req,res);
});
module.exports = router;