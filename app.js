var express = require('express');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var MongoStore = require('connect-mongo')(session)
/*var routes = require('./src/server/routers/routers');*/
var routes = require('./src/server/routers/pollrouters');
var pollctrl = require('./src/server/controller/pollctrl')
var http = require('http');
var path = require('path');
var mongoset = require('./src/server/db/mongoset')
var testRedis = require('./src/server/db/redisset')

var COOKIE_SECRET = 'keyboard cataa';
var COOKIE_NAME = 'sid';

var app = express();
app.use(bodyParser());
app.use(cookieParser(COOKIE_SECRET));

mongoset.init()

var mgstore = new MongoStore({ mongooseConnection: mongoset.db })
var rstore=new RedisStore({
    /*client:testRedis.returnclient()*/
    client:testRedis.returnclient()
    /*host: ""127.0.0.1"",
    port: 6379*/
})
var sessionMiddleware = session({
    name: COOKIE_NAME,
    store: mgstore,
    secret: COOKIE_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: 1000*60*60*24
    }
})

app.use(sessionMiddleware);
app.set('port', process.env.VCAP_APP_PORT || 80);
app.set('views', path.join(__dirname, 'src/client/pages/jades'));
app.use(express.static(path.join(__dirname, 'src/client')));
app.set('view engine', 'jade');

console.log("process.env.SERVER_SOFTWARE11111:",process.env.SERVER_SOFTWARE)


app.use(function(err, req, res, next) {
  if(!err) return next();
  console.log(err.stack);
  res.json({error: true});
});




var server = http.createServer(app);

var io = require('socket.io')(server);


io.use(function(socket, next) {
  sessionMiddleware(socket.request, socket.request.res, next);
});

io.sockets.on('connection', pollctrl.vote);
routes(app,io)

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

