/*jshint node:true*/
var express = require('express');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var routes = require('./src/server/routers/routers');
var pollctrl = require('./src/server/controller/pollctrl')
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var mongoset = require('./src/server/db/mongoset')
var testRedis = require('./src/server/db/redisset')

var COOKIE_SECRET = 'keyboard cat';
var COOKIE_NAME = 'sid';

mongoset.init()
var app = express();
app.use(bodyParser());
app.use(cookieParser(COOKIE_SECRET));


var rstore=new RedisStore({
    client:testRedis.returnclient()
    /*host: ""127.0.0.1"",
    port: 6379*/
})

app.use(session({
    name: COOKIE_NAME,
    store: rstore,
    secret: COOKIE_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: 1000*60*60*24
    }
}));




app.set('port', process.env.VCAP_APP_PORT || 18080);
app.set('views', path.join(__dirname, './src/client/views'));
app.use(express.static(path.join(__dirname, 'src/client')));
app.set('view engine', 'jade');

console.log("process.env.SERVER_SOFTWARE:",process.env.SERVER_SOFTWARE)
// Handle Errors gracefully
app.use(function(err, req, res, next) {
  if(!err) return next();
  console.log(err.stack);
  res.json({error: true});
});


routes(app)


var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
var io = require('socket.io')(server);
io.sockets.on('connection', pollctrl.vote);