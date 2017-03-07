// Connect to MongoDB using Mongoose
/*var mongoose = require('mongoose');
var COOKIE = require('cookie');
var cobj = require('../public/javascripts/cobj')
var passport = require('passport');
var userctrl = require('../serverctrl/userctrl')
*/
var mainctrl = require('../controller/mainctrl')

module.exports = function(app){

  /*pollcontroller*/
  app.get('/',mainctrl.index)
  app.get('/redis/gw',mainctrl.redisgw)
  app.get('/redis/sess',mainctrl.sess)
  app.get('/redis/iw',mainctrl.redisiw)
  app.get('/mongo/gw',mainctrl.mongogw)
  app.get('/mongo/iw',mainctrl.mongoiw)

 /* app.get('/polls/polls',pollctrl.list)
  app.get('/polls/:id', pollctrl.poll);
  app.get('/mypolls/:created_user', pollctrl.mypolls);
  app.get('/myvotes/:current_user', pollctrl.myvotes);
  app.post('/polls',pollctrl.create)
  app.post('/vote',pollctrl.vote)*/



  /*usercontroller*/
 /* app.post('/user/register',userctrl.register)
  app.post('/user/login',userctrl.login)
  app.get('/user/logout',userctrl.logout)
  app.get('/user/status',userctrl.status)
  app.get('/user/user',userctrl.getuser)*/
}

