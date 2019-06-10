let express = require('express');
let router = express.Router();
let db = require('../db_of_manage/user_of_db');
let auth = require('./auth');



router.post('/userList',auth, function(req, res){
    db.userList(req,res);
});

router.post('/queryByUserName',auth, function(req, res){
    db.queryByUserName(req,res);
});


router.post('/addUser', auth,function(req, res){
    db.addUser(req,res);
});

router.post('/deleteUser',auth, function(req, res){
    db.deleteUser(req,res);
});

module.exports = router;