let express = require('express');
let bodyParser = require('body-parser');
let config = require("./config");
let app = express();

const port = config.port;

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  if(req.method=="OPTIONS") {
    res.send(200);/*让options请求快速返回*/
  } else{
    next();
  }
});

const login = require('./mid_of_manage/login');
const user = require('./mid_of_manage/users');
const info = require('./mid_of_manage/info');
const essay = require('./mid_of_manage/essay'); 
const clock = require('./mid_of_manage/clock');
const file = require('./mid_of_manage/file');


app.use(express.json());//开启json解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/login', login);
app.use('/user', user);
app.use('/info',info);
app.use('/essay', essay);
app.use('/clock', clock);
app.use('/file', file);


app.listen(config.port, function(){
    console.log('Server running on http://localhost:7000');
});