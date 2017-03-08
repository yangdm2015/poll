var User = require('../models/User.js')
var passport = require('passport');
function c(str){
  console.log(str)
}
exports.register=function(req, res){
  var _user = req.body.user
  c('user');c(_user);

  User.findOne({account:_user.account},function(err,user){
    if(err){c(err)}
    if(user){//这里之前有问题，使用find方法，返回user是一个数组，当user还没有被注册时，user='',而if(user)为真，所以不能正确注册。当换成findOne方法后，就没有问题了
      c('return res.redirect(signin)')
      return res.json({status:'User '+_user.account+' alrady exist! 用户 '+_user.account+' 已存在'})
    }else{
      user = new User(_user)
      c('user2= ')
      c(user)
      user.save(function(err,user){
        if(err){
          console.log(err)
          res.json({status:'wrong!'})
        }else{
          c('save ok')

          req.session.user =user
          console.log('req.session=',req.session)
          res.json({status:'ok'})
        }
      })
    }
  })
};

exports.login=function(req, res,next){
  var _user = req.body.user
  var account = _user.account
  var password = _user.password
  c('user');c(_user);
  User.findOne({account:account},function(err,user){
    if(err){c(err)}
    if(!user){//当找不到user时， user = ''  !user = true
      c('!user!')
      return res.json({status:'User '+account+' does not exist. 用户'+account+'不存在'})
    }
    /*c('insigin,user=')
    console.dir(user)*/
    user.comparePassword(password,function(err,isMatch){
      if(err){
        c(err)
      }
      if(isMatch){
        console.log('loginloginloginloginloginloginlogin')
        console.log('req.session=')
        console.log(req.session)
        req.session.user = user
        console.log('req.session=',req.session)
        c('psword is matched')
        res.json({status:'ok'})
        /*return res.redirect('/')*/
      }else{
        c('psword is not matched')
         res.json({status:'Password not matched. 密码不对'})
        /*return res.redirect('/signin')*/
      }
    })
  })
};

exports.logout=function(req, res) {
  delete req.session.user;
  res.json({status:'ok'});
  /*req.logout();
  res.status(200).json({
    status: 'Bye!'
  });*/
};

exports.status=function(req, res){
  console.log('req.session=',req.session)
  if (!req.session.user) {
    return res.status(200).json({
      status: false
    });
  }
  res.json({status:'ok',account:req.session.user.account,islogin:true})
  /*console.log('in status, isauth=',req.isAuthenticated())
  console.log('req.user=',req.user)
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  }
  res.status(200).json({
    status: true,
    username: req.user.account
  });*/
};
exports.getuser=function(req, res){
  if (!req.user) {
    return res.status(200).json({
      status: false
    });
  }
  console.log('in getuser!!!')
  console.log(req.user)
  res.status(200).json({
    status: true,
    username: req.user.account
  });
};
