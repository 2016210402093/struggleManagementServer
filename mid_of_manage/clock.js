let express = require('express');
let router = express.Router();
let db = require('../db_of_manage/clock_of_db');
let auth = require('./auth');


router.post('/clockList',auth, function(req, res){
    db.getAllClockInfo(req,res);
});

router.post('/deleteClock',auth, function(req, res){
    db.deleteClock(req,res);
});

router.post('/queryByUserName', auth, function(req, res){
    db.queryByUserName(req,res);
});

module.exports = router;