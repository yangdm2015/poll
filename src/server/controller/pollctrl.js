var Poll = require('../models/Poll.js');
var COOKIE = require('cookie');
var User = require('../models/User.js')
var Comment = require('../models/Comment.js')
var socketHandler = require('./socketHandler.js')

exports.index = function(req, res) {
  console.log("index_index")
  /*res.render('pollindex');*/
  console.log("isPC = ",req.session.isPC)
    res.render('boindex',{isPC:req.session.isPC,isCPS:false});
    /*res.render('boindex',{isPC:true,isCPS:false});*/
/*  if(req.session.isPC){
    res.render('boindex',{});
  }else{
    res.render('mbindex');
  }*/
};
var limit = 15;
exports.list = function(req, res) {
  var query = req.query.query=='undefined'?RegExp(undefined):RegExp(req.query.query)
  var page = req.query.page;
  Poll.find({'question':query}, 'question description img_Url created_user meta')
  .sort({"meta.updateAt":-1})
  .skip((page-1)*limit)
  .limit(limit)
  .populate('created_user')
  .exec(function(error, polls) {
    console.log('polls found!!polls= ',polls)
    console.log('投票已找到！ ',polls)
    if(polls){
      console.log('polls.length=',polls.length);
      res.json(polls);
    }else{
      return {err:'no poll found!'}
    }
  })
}
exports.mypolls = function(req, res) {
  console.log("in mypoll!!!!!")
  var query = req.query.query=='undefined'?RegExp(undefined):RegExp(req.query.query)
  var page = req.query.page;
  var created_user = req.params.created_user;
  console.log('page=',page)
  console.log('query=',query)
  console.log('created_user=',created_user)
  Poll.find({created_user:created_user,'question':query})
  .sort({"meta.updateAt":-1})
  .skip((page-1)*limit)
  .limit(limit)
  .populate('created_user')
  .exec(function(error, polls) {
    res.json(polls);
  })
}
exports.myvotes = function(req, res) {
  var query = req.query.query=='undefined'?RegExp(undefined):RegExp(req.query.query)
  var page = req.query.page;
  var created_user = req.params.current_user;
  console.log('created_user=',created_user)
  Poll.find({'question':query})
  .where('choices.votes.ip').in(created_user)
  .sort({"meta.updateAt":-1})
  .skip((page-1)*limit)
  .limit(limit)
  .populate('created_user')
  .exec(function(err,polls){
    res.json(polls);
  })
}

// JSON API for getting a single poll
exports.poll = function(req, res) {
  // Poll ID comes in the URL
  var pollId = req.params.id;
  var account,islogin;
  if(req.session.user){
    account = req.session.user.account;
    account = req.session.user._id;
    islogin=true
  }
  Poll.findById(pollId, '', { lean: true } )
  .then(function(poll) {
    if(poll) {
      var potmp=votesaccount(poll,account)
      poll.userVoted = potmp.userVoted;
      poll.userChoice=potmp.userChoice,
      poll.totalVotes=potmp.totalVotes,
      poll.totalVotedpeople=potmp.totalVotedpeople,
      poll.current_user=account,
      poll.islogin=islogin;

      Comment
      .find({'poll':poll._id})
      .populate('from','account img_Url _id nickname')
      /*.populate('reply.from','account img_Url nickname')*/
      .sort({"meta.createAt":1})
      .exec( function(err,comments){
        poll.comments=comments;
        res.json(poll);
      });
    } else {
      res.json({error:true});
    }
  })
/*  .catch(function(err){
    throw err;
  });*/
};
var votesaccount = function(poll,ip){
  var totalVotedpeople=0,totalVotes=0,userVoted=false,account;
  var votedid = [],votedip=[],votedtext = [];
  for(var i = 0, ln = poll.choices.length; i < ln; i++) {
    var choice = poll.choices[i];
    for(var j = 0, jLn = choice.votes.length; j < jLn; j++) {
      var vote = choice.votes[j];
        totalVotes++;
      if(votedip.indexOf(vote.ip)>-1){
      }else{
        totalVotedpeople++;
        votedip.push(vote.ip);
      }
      if(ip){
        if(vote.ip === ip) {
          console.log('找到啦')
          votedid.push(choice._id);
          votedtext.push(choice.text)
          userVoted = true;
          account=ip;
        }
      }
    }
  }
  return {
    totalVotedpeople:totalVotedpeople,
    totalVotes:totalVotes,
    ip:account,
    userChoice:{ _id: votedid, text:votedtext },
    userVoted:userVoted,
  }
}

// JSON API for creating a new poll
exports.create = function(req, res) {
  /*console.log('req.files=',req.files)*/

  var file_theme_path,
      files=req.files,
      choices_imgs_path=[];
      reqBody = req.body,
      wrong=false;
      chsarry = JSON.parse(reqBody.choices),
      choices = chsarry.filter(function(v) { return v.text != ''; });

  reqBody.allow_muti_choice=str2boolean(reqBody.allow_muti_choice)
  reqBody.allow_img_choice=str2boolean(reqBody.allow_img_choice)

  if(reqBody.poll_theme_url&&reqBody.allow_img_choice){
    console.log('reqBody.poll_theme_url&&reqBody.allow_img_choice=',reqBody.poll_theme_url&&reqBody.allow_img_choice)
    if(files.length<2){
      console.log('files.length<2')
      wrong=true;
    }
  }else if(!reqBody.poll_theme_url&&reqBody.allow_img_choice){
    if(files.length<3){
      console.log('files.length<3')
      wrong=true;
    }
  }
  if(wrong){
    throw new Error("Error");
  }

  var pollObj = {
    question: reqBody.question,
    description: reqBody.description,
    img_Url: file_theme_path,
    created_user: reqBody.created_user,
    created_time: reqBody.created_time,
    begin_time: reqBody.begin_time,
    end_time: reqBody.end_time,
    allow_muti_choice: reqBody.allow_muti_choice,
    allow_img_choice:reqBody.allow_img_choice,
    max_chosen_num: reqBody.max_chosen_num,
    key_required: reqBody.key_required,
    choices: choices
  };

  if(reqBody.poll_theme_url){/*默认主题图*/
    if(reqBody.allow_img_choice){/*图片选择*/
      choices_imgs_path = addchoiceimgpath(files,files.length,pollObj.choices) /*files中全是选择图*/
    }else{}/*非图片选择*/
    file_theme_path = reqBody.poll_theme_url
  }else{/*上传主题图*/
    if(reqBody.allow_img_choice){/*图片选择*/
      choices_imgs_path = addchoiceimgpath(files,files.length-1,pollObj.choices);/*files中除最后一个外，全是选择图*/
      file_theme_path=getimgurlfromfile(files,files.length-1);/*files中最后一个是主题图*/
    }else{/*非图片选择*/
      file_theme_path=getimgurlfromfile(files,0)/*files中唯一一个是主题图*/
    }
  }
  pollObj.img_Url=file_theme_path;
  /*var reqBody = req.body.poll,*/

  /*console.log('pollObj=',pollObj)*/
  var poll = new Poll(pollObj);
  // Save poll to DB
  var savedpoll;
  poll.save()
  .then(function(doc) {
    console.log('save success!')
    return Poll.populate(doc,{path:"created_user"})
  })
  .then(function(poll){
    /*console.log('填充created_user字段后,poll=',poll)*/
    savedpoll = poll;
    return User.findById(poll.created_user._id)
  })
  .then(function(user){
    user.created_v_num = user.created_v_num==undefined?0:user.created_v_num;
    user.created_v_num = user.created_v_num+1;
    /*console.log("in create,user=",user)
    console.log('before save,user=',user)
    console.log('before save,in session,user=',req.session.user)*/
    return user.save()
  })
  .then(function(user){
    req.session.user=user;
    res.json(savedpoll);
  })
  .catch(function(err){
    throw err;
  });
  function getimgurlfromfile(files ,index){
    var path = 'pollcomponent/upload/images/'+files[index].filename;
    return path;
  }
  function addchoiceimgpath(files,len,chosarray){
    var imgarray = [];
    for(var i=0;i<len;i++){
      var fn = getimgurlfromfile(files,i)
      chosarray[i].img_Url=fn;
      imgarray.push(fn)
    }
    console.log('in addchoiceimgpath,chosarray=',chosarray)
    return imgarray;
  }
  function str2boolean(str){
    if(typeof str !='string'){
      return str;
    }else{
      if(str=='false') return false;
      if(str=='true') return true;
      return str;
    }
  }
};

exports.vote = function(socket) {
  /*console.log('这里仅仅检测cookie中与sid相关的内容！socket.request.headers.cookie=',socket.request.headers.cookie)*/
  /*console.log('此时的用户socket库为：',socketHandler.getuserssocketarry())*/
  var sessionId = socketHandler.getSessionId(socket.request.headers.cookie, 'sid');
  /*console.log('在vote里，sessionId=',sessionId)*/
  var user = socket.request.session.user;
  if(user){
  console.log('在vote里，user._id=',user._id)
    var userid =  user._id;
    var useraccount = user.account;
  }
  if(sessionId&&userid){
    /*console.log('既有userid也有sessionId')*/
    socketHandler.addUser(userid,useraccount,sessionId)
    socketHandler.setUserSocket(sessionId, socket);

  }
  console.log("socket 连接成功")
  /*console.log("socket.request.headers.cookie=",socket.request.headers.cookie)
  console.log("socket.request.session.cookie=",socket.request.session.cookie)*/
  /*socket.request.session.socket = "此处应该是socket对象";
  console.log('此时session是：',socket.request.session)*/
  socket.request.session.save()
  socket.on('userchange',function(accountinfo){
    socket.emit('userchangeclient', accountinfo);
  })
  socket.on('send:vote', function(voteObj) {
    /*console.log("在socket里，socket.request.session=",socket.request.session)*/
    console.log('send:vote!')
    var ip=voteObj.useraccount;
    var votedoc;
    Poll.findById(voteObj.poll_id, function(err, poll) {
      for( var index in voteObj.choices){
        choiceId =  voteObj.choices[index]
        var choice = poll.choices.id(choiceId);
        choice.votes.push({ ip: ip });
      }
      var ptmp = votesaccount(poll,ip);
      console.log('整理投票完毕，poll=',poll)
      poll.totalVotedpeople=ptmp.totalVotedpeople;
      poll.totalVotes=ptmp.totalVotes;
      poll.save()
      .then(function(doc){
      /*console.log(ad)*/
        var theDoc = {
          question: doc.question, _id: doc._id, choices: doc.choices,
          totalVotes: doc.totalVotes,totalVotedpeople:doc.totalVotedpeople,
          userVoted: ptmp.userVoted,ip:ip,userChoice:ptmp.userChoice
        };
        votedoc = theDoc
        console.log('保存完毕完毕，ip=',ip)
        return User.findById(ip)
      })
      .then(function(user){
        console.log('找到user，user=',user)
        console.log('user=',user);
        user.attended_v_num=user.attended_v_num==undefined?0:user.attended_v_num;
        user.attended_v_num++;
        console.log('ready to emit!')
        socket.request.session.user=user;
        votedoc.user = user;
        socket.request.session.save()
        socket.emit('vote', votedoc);
        user.save();
      })
      .catch(function(err){
        throw err;
      });
      /*
      poll.save(function(err, doc) {

        var votedid = [],votedip=[],votedtext = [];
        for(var i = 0, ln = doc.choices.length; i < ln; i++) {
          var choice = doc.choices[i];
          console.log("ip="+ip);
          for(var j = 0, jLn = choice.votes.length; j < jLn; j++) {
            var vote = choice.votes[j];
              theDoc.totalVotes++;
            if(votedip.indexOf(vote.ip)>-1){
            }else{
              theDoc.totalVotedpeople++;
              votedip.push(vote.ip);
            }
            if(vote.ip === ip) {
              votedid.push(choice._id);
              votedtext.push(choice.text)
              theDoc.userVoted = true;
              theDoc.ip=ip;
            }
          }
        }
        theDoc.userChoice={ _id: votedid, text:votedtext };
        // socket.emit('myvote', theDoc);
      });*/
    });
  });
};
