var Poll = require('../models/Poll.js');
var COOKIE = require('cookie');
var Promise = require("bluebird");
var User = Promise.promisifyAll(require('../models/User.js'));
var Comment = Promise.promisifyAll(require('../models/Comment.js'));
var socketHandler = require('./socketHandler.js')

exports.test=function(io){
  return function(req,res){

    var userid= req.session.user._id;
    User.findById(userid)
    .then(function(user){
      console.log('此时的用户id是',user._id.toString())
      console.log('此时的用户typeof id是',typeof user._id.toString())
    io.emit('testobj',{name:req.body.name})
    console.log("在test中，名字是：",req.body)
    })
  }
}

exports.create = function(io){
  return function(req, res) {
    var newcomment = new Comment(req.body.comment)
    var aburl = req.body.comment.aburl,replyid,msg;

    var commentreg_tosend,fromuser_id=newcomment.from,touser_id=newcomment.to,
    tocreateuser_id=req.body.comment.tocreateuser,pollcreateuser,commentuser;

    /*console.log('创建投票的用户id是tocreateuser_id=',tocreateuser_id)*/
    newcomment.save()/*保存新回复*/
    .then(function(curcomment){
      return Comment.populate(curcomment,[{path:'from'},{path:'to'}])/*填充新回复的回复人和被回复人*/
    })
    .then(function(curcomment){
      newcomment = curcomment;

      msg={
        createAt:Date.now(),
        img_Url:curcomment.from.img_Url,
        nickname:curcomment.from.nickname,
        account:curcomment.from.account,
        content:curcomment.content,
        abturl:aburl
      }
      if(curcomment.to){
        return Comment.findById(curcomment.incomment)  /*如果回复的是已有对话，则找到这个对话进行操作*/
      }else{
        commentreg_tosend = curcomment;
        msg.abturl = msg.abturl+'#'+curcomment._id
        return new Promise(function(resolve,reject){
          reject({state:true}) /*如果是在投票中新发起的回复，则直接回传*/
        })
      }
    })
    .then(
      function(orgcomment){
       return Comment.populate(orgcomment,{path:'from'}) /*找到已有对话后，填充发起者doc*/
      },
      function(err){
        if(err.state){
          console.log("正确的路径,应该直接返回，fromuser_id=",fromuser_id)
          adduserreplynumandjsonback(fromuser_id,tocreateuser_id,touser_id,commentreg_tosend,newcomment,msg,req,res,io)
        }else{
          console.log('err!!!!! = ',err)
          throw err;
        }
      }
    )
    .then(function(orgcomment){
      var d = Date.now();
      var replyto=newcomment.to.nickname?newcomment.to.nickname:newcomment.to.account;
      var commwithreply ="回复 "+replyto+": "+newcomment.content;
      var reply = {
        from:newcomment.from,
        to:newcomment.to,
        createAt:d,
        img_Url:newcomment.from.img_Url,
        account:newcomment.from.account,
        nickname:newcomment.from.nickname,
        content:commwithreply
      }

      orgcomment.reply.push(reply)
      return orgcomment.save() /*保存已有回复*/
    })
    .then(function(orgcomment){
      replyid = orgcomment.reply[orgcomment.reply.length-1]._id;
      msg.abturl = msg.abturl+'#'+replyid;
      commentreg_tosend = orgcomment
      adduserreplynumandjsonback(fromuser_id,tocreateuser_id,touser_id,commentreg_tosend,newcomment,msg,req,res,io)
    })
    function adduserreplynumandjsonback(fromuser_id,tocreateuser_id,touser_id,commentreg_tosend,newcomment,msg,req,res,io){
      var commentuser,pollcreateuser;
      User.findById(fromuser_id)
      .then(function(user){
        user.replynum = user.replynum?user.replynum:0;
        user.replynum ++;
        return user.save();
      })
     .then(function(data){ /*给投票的创建者发消息*/
        req.session.user = data;
        commentuser = data;

        if(newcomment.to){
          if(newcomment.to._id==tocreateuser_id){
            console.log('此时投票发起人和直接回复人一致，id为',tocreateuser_id)
            msg.num = hasunread(req.session.user.msgs);
            socketHandler.sendMsg2UserById(tocreateuser_id.toString(),msg)
            return addmsgtouser(tocreateuser_id,msg);
          }else{
            console.log('马上要进行两度回复了！tocreateuser_id=',tocreateuser_id,"  同时newcomment.to._id=",newcomment.to._id)

            return addmsgtobothuser(newcomment.to._id,tocreateuser_id,msg);
          }
        }else{

          return addmsgtouser(tocreateuser_id,msg);
        }
      })
      .then(function(user){
        io.emit('newcomment',{})
        console.log('快要返回啦！')
        res.json({comment:commentreg_tosend,user:user});
      })
    }
    function addmsgtobothuser(uid1,uid2,msg){
      console.log('马上要进行两度回复了！')
      User.findById(uid1)
      .then(function(user){
        user.msgs.push(msg);
        user.msgs.sort(sortNumberba);
        updatesession(user);
        msg.num = hasunread(user.msgs);
        socketHandler.sendMsg2UserById(newcomment.to._id.toString(),msg)

        console.log('此时的fromuser_id为：',fromuser_id,'而tocreateuser_id为',tocreateuser_id,'同时newcomment.to._id=',newcomment.to._id)
        return user.save()
      })
      .then(function(user){
        return User.findById(uid2)
      })
      .then(function(user){
        user.msgs.push(msg);
        user.msgs.sort(sortNumberba)
        msg.num = hasunread(user.msgs);
        socketHandler.sendMsg2UserById(tocreateuser_id.toString(),msg)
        updatesession(user)
        return user.save()
      })
    }
    function addmsgtouser(userid,msg){
      console.log('进入一度回复了！')
      console.log('此时的tocreateuser_id为：',tocreateuser_id)
      User.findById(userid)
      .then(function(user){
        user.msgs.push(msg);
        user.msgs.sort(sortNumberba)
        updatesession(user)
        msg.num = hasunread(user.msgs);
        socketHandler.sendMsg2UserById(tocreateuser_id.toString(),msg)
        return user.save()
      })
    }
    function sortNumberba(a,b){return b.createAt - a.createAt} /*降序*/
    function updatesession(user){
      var userinsession = req.session.user;
      if(user._id.toString()==userinsession._id.toString()){
        req.session.user=user;
      }
    }
    function hasunread(arr){
      var hasunread =false,num=0;
      for(var i=0,len=arr.length;i<len;i++){
        var item = arr[i];
        if(!item.read){
          hasunread=true;
          num++
        }
      }
      console.log('未读消息数为：',num)
      return num;
    }
  }
}
exports.getbytouserid=function(req,res){
  var touserid = req.body.touserid;
  Comment.find({to:touserid})
  .populate('from')
  .then(function(data){
    /*console.log("在getbytouserid,找到关于用户"+touserid+"回复有：")
    console.log(data);*/
    res.json(data)
  })
}