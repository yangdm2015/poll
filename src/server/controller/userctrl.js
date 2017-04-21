var User = require('../models/User.js')
var Poll = require('../models/Poll.js');
var socketHandler = require('./socketHandler.js')
var mongoose = require('mongoose');
function c(str){
  console.log(str)
}
exports.register=function(req, res){
  var _user = req.body.user
  c('user in register register register register');c(_user);

  User.findOne({account:_user.account},function(err,user){
    if(err){c(err)}
    if(user){//这里之前有问题，使用find方法，返回user是一个数组，当user还没有被注册时，user='',而if(user)为真，所以不能正确注册。当换成findOne方法后，就没有问题了
      c('return res.redirect(signin)')
      return res.json({status:'exist'})
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
  c('in login in login in login in login in login')
  User.findOne({account:account},function(err,user){
    if(err){c(err)}
    if(!user){//当找不到user时， user = ''  !user = true
      c('!user!')
      return res.json({status:'notexist'})
    }
    user.comparePassword(password,function(err,isMatch){
      if(err){
        c(err)
      }
      if(isMatch){
        req.session.user = user

        var sessionId = socketHandler.getSessionId(req.headers.cookie, 'sid');
        socketHandler.addUser(user._id, user.account,sessionId)

        c('psword is matched')
        res.json({status:'ok',user:user})
        /*return res.redirect('/')*/
      }else{
        c('psword is not matched')
         res.json({status:'wrongpass'})
        /*return res.redirect('/signin')*/
      }
    })
  })
};

exports.update=function(req, res){
  var u = req.body;
  User.findById(u._id,function(er,user){
    user.nickname=u.nickname;
    user.signature = u.signature;
    if(req.file){
      user.img_Url=appendimgpath(req.file);
    }else{
      console.log('u=',u)
      user.img_Url=u.headpicsrc;
    }
    user.save(function(err,user){
      console.log('after update, user=',user)
      if(err){
          console.log(err)
          throw err
        }else{
          req.session.user = user;
          res.json(user);
        }
    });

  })
}

function appendimgpath(file){
  var path = 'pollcomponent/upload/images/'+file.filename;
  return path;
}

exports.logout=function(req, res) {
  delete req.session.user;
  res.json({status:'ok'});
  /*req.logout();
  res.status(200).json({
    status: 'Bye!'
  });*/
};

exports.status=function(req, res){
  if (!req.session.user) {
    return res.status(200).json({
      status: false,
      islogin:false
    });
  }
  var user = req.session.user;
  console.log('在session里,user_id=',user._id)
  res.json({status:'ok',account:user.account,islogin:true,user_id:user._id,user:user})
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

exports.statusfromdb=function(req, res){
  if (!req.session.user) {
    return res.status(200).json({
      status: false,
      islogin:false
    });
  }
  var user = req.session.user;
  if(user){
    User.findById(user._id)
    .then(function(user){
      req.session.user=user
      /*console.log('在req.headers里，req.headers',req.headers)
      console.log('添加了socket对象后，session是：',req.session)*/
      res.json({status:'ok',account:user.account,islogin:true,user_id:user._id,user:user})
    })
  }
}

exports.setmsgreaded=function(req,res){
  var idx = req.query.index;
  var user = req.session.user;
  if(user){
    var userid = user._id;
    User.findById(userid)
    .then(function(user){
      user.msgs[idx].read=true
      return user.save()
    })
    .then(function(user){
      res.json(user)
    })
  }
}
exports.addtomyfavor=function(req,res){
  var pollid = req.query.pollid;
  var url = req.query.url
  var favorpoll,userid=req.session.user._id;
  Poll.findById(pollid)
  .then(function(poll){
    favorpoll = poll;
    userid = userid.toString()
    return User.findById(userid)
  })
  .then(function(user){

    if(findFavorById(pollid,user.favor)==-1){
      console.log("需要添加的这个投票的收藏！！pollid=",pollid)
      var favor={
        poll:favorpoll._id,
        question:favorpoll.question,
        description:favorpoll.description,
        url:url,
        createAt: Date.now()
      }
      console.log('需要添加favor了！！')
      user.favor.push(favor);
      user.favor.sort(sortNumberba);
      req.session.user = user;
      return user.save()
    }else{
      return user;
    }
  })
  .then(function(user){
    res.json(user)
  })
  .catch(function(err){
    console.log(err)
  })
}
exports.deletefrommyfavor=function(req,res){
  var pollid = req.query.pollid;
  var userid=req.session.user._id;
  User.findById(userid.toString())
  .then(function(user){
    var idx = findFavorById(pollid,user.favor)
    if(idx>-1){
      console.log('要删除的收藏编号是：',idx)
      user.favor.splice(idx,1);
    }
    req.session.user = user;
    return user.save()
  })
  .then(function(user){
    res.json(user)
  })
  .catch(function(err){
    console.log(err)
  })
}
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
    username: req.user.account,
    user:req.user
  });
};
function findFavorById(pollid,arr){
  var idx = -1;
  if(arr instanceof Array&&arr.length>0){
    for(var i=0,len=arr.length;i<len;i++){
      var item = arr[i]
      if(pollid==item.poll.toString()){
        idx = i;break;
      }
    }
  }
  return idx;
}
function sortNumberba(a,b){return b.createAt - a.createAt} /*降序*/
exports.deleteusercomment=function(req,res){
  var user = req.session.user
  var index = req.body.commentindex;
  User.findById(user._id)
  .then(function(user){
    user.msgs.splice(index,1);
    console.log('将要删除评论！user=',user)
    return user.save();
  })
  .then(function(user){
    req.session.user= user;
    if(user){

  console.log('删除评论成功！')
      res.json({isdelete:true})
    }
  })
  .catch(function(err){
    throw err
  })
}


