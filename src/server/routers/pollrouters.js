// Connect to MongoDB using Mongoose
var mongoose = require('mongoose');
var COOKIE = require('cookie');
/*var cobj = require('../public/javascripts/cobj')*/
/*var passport = require('passport');*/
var pollctrl = require('../controller/pollctrl')
var userctrl = require('../controller/userctrl')


// Get Poll schema and model



module.exports = function(app){

  /*pollcontroller*/
  app.get('/',pollctrl.index)
  app.get('/polls/polls',pollctrl.list)
  app.get('/polls/:id', pollctrl.poll);
  app.get('/mypolls/:created_user', pollctrl.mypolls);
  app.get('/myvotes/:current_user', pollctrl.myvotes);
  app.post('/polls',pollctrl.create)
  app.post('/vote',pollctrl.vote)



  /*usercontroller*/
  app.post('/user/register',userctrl.register)
  app.post('/user/login',userctrl.login)
  app.get('/user/logout',userctrl.logout)
  app.get('/user/status',userctrl.status)
  app.get('/user/user',userctrl.getuser)
}

