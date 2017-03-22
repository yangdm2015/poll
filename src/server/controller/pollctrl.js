var dbUrl = 'mongodb://localhost/pollsapp'
var Poll = require('../models/Poll.js');
var COOKIE = require('cookie');

exports.index = function(req, res) {
  console.log("index_index")
  /*res.render('pollindex');*/
  res.render('boindex');
};
exports.list = function(req, res) {
  var query = req.query.query=='undefined'?RegExp(undefined):RegExp(req.query.query)
  /*query = RegExp('t')*/
  console.log("query=",query)

  Poll.find({'question':query}, 'question description img_Url created_user meta', function(error, polls) {
    console.log('polls.length=',polls.length)
    res.json(polls);
  });
};
exports.mypolls = function(req, res) {
  console.log("in mypoll!!!!!")
  var query = req.query.query=='undefined'?RegExp(undefined):RegExp(req.query.query)
  var created_user = req.params.created_user;
  Poll.find({created_user:created_user,'question':query},'question description img_Url created_user', function(error, polls) {
    res.json(polls);
  });
}
exports.myvotes = function(req, res) {
  var query = req.query.query=='undefined'?RegExp(undefined):RegExp(req.query.query)
  var created_user = req.params.current_user;
  Poll.find({'question':query})
  .where('choices.votes.ip').in(created_user)
  .exec(function(err,polls){
    res.json(polls);
  })
}

// JSON API for getting a single poll
exports.poll = function(req, res) {
  // Poll ID comes in the URL
  var pollId = req.params.id;
  var username,islogin;
  if(req.session.user){
    username = req.session.user.account;
    islogin=true
  }
  Poll.findById(pollId, '', { lean: true }, function(err, poll) {
    if(poll) {
      var userVoted = false,votedtext = [],votedid = [],votedip=[],
          userChoice,
          totalVotes = 0,totalVotedpeople=0;
      for(c in poll.choices) {
        var choice = poll.choices[c];
        for(v in choice.votes) {
          var vote = choice.votes[v];
            totalVotes++;
          if(votedip.indexOf(vote.ip)>-1){
          }else{
            votedip.push(vote.ip)
            totalVotedpeople++
          }

          if(vote.ip === username) {
            userVoted = true;
            votedid.push(choice._id);
            votedtext.push(choice.text);
            userChoice = { _id: choice._id, text: choice.text };
          }
        }
      }
      poll.userVoted = userVoted;
      poll.userChoice = {_id:votedid,text:votedtext};
      poll.totalVotes = totalVotes;
      poll.totalVotedpeople = totalVotedpeople;
      poll.current_user = username;
      poll.islogin = islogin;
      res.json(poll);
    } else {
      res.json({error:true});
    }
  });
};


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

  console.log('pollObj=',pollObj)
  var poll = new Poll(pollObj);
  // Save poll to DB
  poll.save(function(err, doc) {

  console.log('save success!')
    if(err || !doc) {
      throw 'Error';
    } else {
      res.json(doc);
    }
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
  socket.on('userchange',function(accountinfo){
    socket.emit('userchangeclient', accountinfo);
  })
  socket.on('send:vote', function(voteObj) {
    console.log('send:vote!')
    ip=voteObj.useraccount;
    Poll.findById(voteObj.poll_id, function(err, poll) {
      for( var index in voteObj.choices){
        choiceId =  voteObj.choices[index]
        console.log('choiceId',choiceId)
        var choice = poll.choices.id(choiceId);
        choice.votes.push({ ip: ip });
      }

      poll.save(function(err, doc) {
        var theDoc = {
          question: doc.question, _id: doc._id, choices: doc.choices,
          userVoted: false, totalVotes: 0,ip:null,totalVotedpeople:0
        };
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
              theDoc.userChoice = { _id: choice._id, text: choice.text };
              theDoc.ip=ip;
            }
          }
        }
        theDoc.userChoice={ _id: votedid, text:votedtext };
        // socket.emit('myvote', theDoc);
        console.log('ready to emit!')
        socket.emit('vote', theDoc);
      });
    });
  });
};

