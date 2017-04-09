// Connect to MongoDB using Mongoose
var mongoose = require('mongoose');
var COOKIE = require('cookie');
/*var cobj = require('../public/javascripts/cobj')*/
/*var passport = require('passport');*/
var pollctrl = require('../controller/pollctrl')
var userctrl = require('../controller/userctrl')
var commentctrl = require('../controller/commentctrl')
var imgupload =require('./imgupload')();
var useragentjudge =require('./useragentjudge');

// Get Poll schema and model



module.exports = function(app,io){
  app.use(useragentjudge);
  /*pollcontroller*/
  app.get('/',pollctrl.index)
  app.get('/polls/polls',pollctrl.list)
  app.get('/polls/:id', pollctrl.poll);
  app.get('/mypolls/:created_user', pollctrl.mypolls);
  app.get('/myvotes/:current_user', pollctrl.myvotes);
  app.post('/polls',imgupload.array('poll_theme'),pollctrl.create)
  /*app.post('/vote',pollctrl.vote)*/



  /*usercontroller*/
  app.post('/user/register',userctrl.register)
  app.post('/user/login',userctrl.login)
  app.get('/user/logout',userctrl.logout)
  app.get('/user/status',userctrl.status)
  app.get('/user/setmsgreaded',userctrl.setmsgreaded)
  app.get('/user/statusfromdb',userctrl.statusfromdb)
  app.get('/user/user',userctrl.getuser)
  app.post('/user/update',imgupload.single('headpic'),userctrl.update)
  app.post('/user/deleteusercomment',userctrl.deleteusercomment)
  app.get('/user/addtomyfavor',userctrl.addtomyfavor)
  app.get('/user/deletefrommyfavor',userctrl.deletefrommyfavor)


  /*commentcontroller*/
  app.post('/comment/create',commentctrl.create(io))
  app.post('/comment/getbytouserid',commentctrl.getbytouserid)
  app.post('/comment/test',commentctrl.test(io))

}

