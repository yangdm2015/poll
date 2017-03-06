var mongoose = require('mongoose');
var dbUrl = 'mongodb://localhost/pollsapp'
var PollSchema = require('../models/Poll.js').PollSchema;
var Poll = mongoose.model('polls', PollSchema);
var passport = require('passport');
var COOKIE = require('cookie');

mongoose.connect(dbUrl);

exports.index = function(req, res) {
  console.log("index_index")
  res.render('index');
};
exports.list = function(req, res) {
  console.log("index_list")
  Poll.find({}, 'question description img_Url created_user meta', function(error, polls) {
    res.json(polls);
  });
};
exports.mypolls = function(req, res) {
  console.log("in mypoll!!!!!")
  var created_user = req.params.created_user;

 /* Poll.findOne({created_user:created_user}, 'question description img_Url created_user', function(error, polls) {
    console.log('polls=')
    console.log(polls)
    res.json(polls);
  });*/
  Poll.find({created_user:created_user}, 'question description img_Url created_user', function(error, polls) {
    res.json(polls);
  });
}
exports.myvotes = function(req, res) {
  console.log("in myvotes!!!!!")
  var created_user = req.params.current_user;
  console.log("created_user = ",created_user)
  Poll.find({})
  .where('choices.votes.ip').in(created_user)
  .exec(function(err,polls){
    console.log("polls",polls)
    res.json(polls);
  })

  /*Poll.find({}, 'question description img_Url created_user', function(error, polls) {
    res.json(polls);
  })
  .where('dd').in('choices.votes.ip');*/
}

// JSON API for getting a single poll
exports.poll = function(req, res) {
  // Poll ID comes in the URL
  var pollId = req.params.id;
  if(req.session.user){
    var username = req.session.user.account;
  }else{
    var username =""
  }
  console.log('in poll,username=',username)
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
            console.log("in poll, votedip=",votedip)
            totalVotedpeople++
          }

          if(vote.ip === username) {
            console.log('vote.ip === (username)')
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
      res.json(poll);
    } else {
      res.json({error:true});
    }
  });
};

// JSON API for creating a new poll
exports.create = function(req, res) {
  console.log('index_create')
  var reqBody = req.body.poll,
      choices = reqBody.choices.filter(function(v) { return v.text != ''; }),
  pollObj = {
    question: reqBody.question,
    description: reqBody.description,
    img_Url: reqBody.img_Url,
    created_user: reqBody.created_user,
    created_time: reqBody.created_time,
    begin_time: reqBody.begin_time,
    end_time: reqBody.end_time,
    allow_muti_choice: reqBody.allow_muti_choice,
    max_chosen_num: reqBody.max_chosen_num,
    key_required: reqBody.key_required,
    choices: choices
  };
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
};

exports.vote = function(socket) {
  socket.on('send:vote', function(voteObj) {
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

