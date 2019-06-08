let express = require('express');
let router = express.Router();
let db = require('../db_of_manage/user_of_db');


router.post('/userList', function(req, res){
    db.userList(req,res);
});


module.exports = router;