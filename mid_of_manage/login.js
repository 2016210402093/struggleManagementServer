let express = require('express');
let router = express.Router();
let db = require('../db_of_manage/login_of_db');

router.post('/', function(req, res){
    db.login(req,res);
});



module.exports = router;