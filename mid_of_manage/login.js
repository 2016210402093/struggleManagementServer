let express = require('express');
let router = express.Router();
let db = require('../db_of_manage/login_of_db');

const jwt= require('jsonwebtoken');

let secret = 'xwySecret';

router.post('/', function(req, res){
    console.log(req.body);
    token = jwt.sign({
        userName: req.body.userName,
        password: req.body.password
    }, secret);
    db.login(req,res, token);
});



module.exports = router;