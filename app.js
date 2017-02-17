/*jshint node:true*/
var express = require('express');

var routes = require('./src/server/routers/routers');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var mongoset = require('./src/server/db/mongoset')
/*var dbUrl = 'mongodb://localhost/remwords'
mongoose.connect(dbUrl);*/
mongoset.init()
var app = express();

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
