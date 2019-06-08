let express = require('express');
let router = express.Router();
let db = require('../db_of_manage/user_of_db');


router.post('/userList', function(req, res){
    db.userList(req,res);
});

router.post('/queryByUserName', function(req, res){
    db.queryByUserName(req,res);
});


router.post('/addUser', function(req, res){
    db.addUser(req,res);
});

router.post('/deleteUser', function(req, res){
    db.deleteUser(req,res);
});

module.exports = router;