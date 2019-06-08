let config = require('../config')

const mysql = require('mysql');

let db = mysql.createConnection(config.db);

let entries = require('./entries');

