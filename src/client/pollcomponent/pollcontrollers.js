polls1.controller('HomeCtrl',['$timeout','$scope','$location','$route','userservice',function ($timeout,$scope,$location,$route,userservice) {
 /* $scope.$on('userchange',function(event,data){
    $scope.$broadcast('userchange',data)
  })*/
 /* userservice.getUserStatus()
  .then(function(re){
    var result=re.data
    $scope.islogin=result.islogin;
    $scope.currusername = result.account;
  })
  var test =0
  $scope.$on('userchange',function(e,data){
    console.log('HomeCtrlHomeCtrlHomeCtrlHomeCtrl')
    if(data.test){
      console.log(data.t)
    }else{
      $scope.islogin = data.islogin;
      $scope.currusername = data.account;
    }
  })

  $scope.$on('test',function(e,data){
    console.log('test=',data.name)
  })*/
}])
polls1.controller('MyPollListCtrl',['$timeout','$scope','$location','$route','pollservice','userservice',function ($timeout,$scope,$location,$route,pollservice,userservice) {
    userservice.getUserStatus()
    .then(function(re){
      var result=re.data
      var name = result.account;
     /* $scope.polls =MyPolls.query({cuser:username})*/
      return pollservice.getmypoll(name)
    })
    .then(function(po){
      $scope.polls = po.data;
    })
    .catch(function (err) {
      console.log(err);
    });
}])
polls1.controller('MyVoteListCtrl',['$timeout','$scope','$location','$route','pollservice','userservice',function ($timeout,$scope,$location,$route,pollservice,userservice) {
    userservice.getUserStatus()
    .then(function(re){
      var result=re.data
      var username = result.account;
      return pollservice.getmyvote(username)
      /*$scope.polls =MyVotes.query({cuser:username})*/
    })
    .then(function(po){
      $scope.polls = po.data;
    })
    .catch(function (err) {
      console.log(err);
    });
}])

polls1.controller('PollListCtrl',['$timeout','$scope','$location','$route','pollservice','userservice',function ($timeout,$scope,$location,$route,pollservice) {
  console.log('PollListCtrl')
  $scope.showItemdetail = function(itemId){
    window.location.href='#/poll/'+itemId
    return false;
  };
  pollservice.getallpolls()
  .then(function(polls){
    $scope.polls = polls.data;
    for(var p in $scope.polls){
      var po = $scope.polls[p];
      $scope.polls[p].img_Url= po.img_Url?po.img_Url:'../public/img/logo.png'
      var d = new Date(po.meta.updateAt);
      d=(d.getTime()+"").slice(0,7);
      $scope.polls[p].order=d;
    }
    /*console.log('polls=',$scope.polls);*/
  });
}])
 var isvoted=function(poll,account){
  for(c in poll.choices) {
    var choice = poll.choices[c];
    for(v in choice.votes) {
      var vote = choice.votes[v];
      if(vote.ip === account) {
        return true;
      }
    }
  }
  return false;
}
/*polls1.controller('PollItemCtrl',function PollItemCtrl($scope, $routeParams, socket, pollservice,userservice) {*/
polls1.controller('PollItemCtrl',['$scope', '$routeParams', 'pollservice','socket','userservice','$rootScope',function PollItemCtrl($scope, $routeParams, pollservice,socket,userservice,$rootScope) {

  socket.on('userchangeclient', function(accountinfo) {
    $scope.islogin = accountinfo.islogin;
    $scope.currusername = accountinfo.account;
    $scope.poll.userVoted = isvoted($scope.poll,accountinfo.account)
    console.log('userchangeclient')
  })
 /* $scope.$on('userchangeItem',function(event,data){
    $scope.islogin = data.islogin;
    $scope.currusername = data.account;
  })*/
  /*$scope.islogin = $rootScope.accountinfo.islogin;
  $scope.currusername = $rootScope.accountinfo.account;*/
  pollservice.getpoll($routeParams.pollId).then(function(result){
      var poll = result.data
      choicesvotepercent(poll);
      $scope.poll = poll;
      $scope.poll.userVote=[]
      console.log("poll="+$scope.poll)
      $scope.overvoted = false;
      $scope.qrsrc = document.URL;
      $scope.headerstyle = {
        'background-image':'url('+poll.img_Url+')',
      };
      $scope.currusername = poll.current_user;
      $scope.islogin = poll.islogin;
  });
  var updateSelected = function(action,id){
    if(action == 'add' && $scope.poll.userVote.indexOf(id) == -1){
        $scope.poll.userVote.push(id);
      if($scope.poll.max_chosen_num < $scope.poll.userVote.length){
        $scope.overvoted = true;
      }
    }
    if(action == 'remove' && $scope.poll.userVote.indexOf(id)!=-1){
      var idx = $scope.poll.userVote.indexOf(id);
      $scope.poll.userVote.splice(idx,1);
      if($scope.poll.max_chosen_num >= $scope.poll.userVote.length){$scope.overvoted = false;}
    }
  }
  $scope.updateSelection = function($event, id){
    var checkbox = $event.target;
    var action = (checkbox.checked?'add':'remove');
    if($scope.poll.allow_muti_choice){
      updateSelected(action,id);
    }else{

    }
  }
  $scope.vote = function() {
    console.log("PollItemCtrl.vote")
    userservice.getUserStatus()
    .then(function(re){
      var result=re.data
      if(result.islogin){
        var pollId = $scope.poll._id,
            choiceIds = $scope.poll.allow_muti_choice?$scope.poll.userVote:[$scope.poll.nobodycares];
            useraccount = result.account,
            poll=$scope.poll;
        if(poll.userVote.length<=poll.max_chosen_num){
          if(choiceIds) {
            var voteObj = { poll_id: pollId, choices: choiceIds ,useraccount:useraccount};
            socket.emit('send:vote', voteObj);
          } else {
            alert('You must select an option to vote for.你必须至少选择一项。');
          }
        }else{
          alert("You can vote for no more than "+poll.max_chosen_num+" options.你最多只能选择 "+poll.max_chosen_num+" 个选项");
        }
      }else{
        alert('You must login before voting.你必须登陆才能投票。');
      }
    })
  };

/*var socket = io.connect();*/
  socket.on('vote', function(data) {
    /*console.dir(data);*/
    if(data._id === $routeParams.pollId) {
      choicesvotepercent(data);
      $scope.poll.choices = data.choices;
      $scope.poll.totalVotes = data.totalVotes;
      $scope.poll.totalVotedpeople = data.totalVotedpeople;
      $scope.poll.userVoted = true;
      $scope.poll.userChoice = data.userChoice;
      /*choicesvotepercent($scope.poll)*/
    }
  });

}])

polls1.controller('PollNewCtrl',['$scope','$location','userservice','pollservice',function PollNewCtrl($scope, $location, userservice,pollservice) {
  document.body.addEventListener('touchstart', function () { });
  console.log("PollNewCtrl")
  // Define an empty poll model object
  $scope.theme_pic_location=pollservice.getthemepic();
  $scope.poll = {
    question: '',
    max_chosen_num:2,
    allow_muti_choice:false,
    choices: [{ text: '' }, { text: '' }]
  };
  console.dir($scope.poll)
  // Method to add an additional choice option
  $scope.addChoice = function() {
    $scope.poll.choices.push({ text: '' });
    $scope.choicenum.push($scope.poll.choices.length)
  };
  $scope.popChoice = function() {
    $scope.poll.choices.pop();
    $scope.choicenum.pop();
  };
  $scope.fileread={
      srcnode:'#output',
      imgsrc:'',
      file:'',
      target:'#output',
    }
  // Validate and save the new poll to the database
  $scope.createPoll = function() {
    console.log("createPoll");
    /*var fileread = $scope.fileread?$scope.fileread:$scope.theme_pic_location;*/
    var poll = $scope.poll;
   /* var fd = new FormData();
    angular.forEach(poll, function(val, key) {
      fd.append(key, val);
    });
    fd.append('poll_theme', fileread);*/

    userservice.getUserStatus()
    .then(function(re){
      var result=re.data
      /*fd.append('created_user', result.account);*/
      poll.created_user=result.account;
      return pollservice.savepoll(poll,$scope.fileread.file);
    })
    .then(function(result){
      console.log('result=',result)
      $location.path('polls');
    })
  };
  $scope.trigger_input=function(){
    document.querySelector("[name='theme_pic']").click()
  }
}])

.directive("fileread", function () {
  return {
    replace:true,
    scope: {
      fileread: "="
    },
    template: '<input id="in"type="file" ng-hide=true >',
    link: function (scope, element, attributes) {
      var srcnode = document.querySelector(scope.fileread.srcnode);
      srcnode.onclick=function(){
        element[0].click();
      }
      element.bind('change',function(changeEvent){
        scope.fileread.file=element[0].files[0];
        showpic(changeEvent,scope)
        function showpic(changeEvent,scope){
          var reader = new FileReader();
          reader.onload = function (loadEvent) {
            scope.$apply(function () {
              scope.fileread.imgsrc = loadEvent.target.result;
              var target = document.querySelector(scope.fileread.target)
                target.src=scope.fileread.imgsrc
            });
          }
          reader.readAsDataURL(changeEvent.target.files[0]);
        }
      })
    }
  }
})

/*.directive("fileread", function () {
  return{
    link:function(scope,element,attrs){
      element.bind('change',function(changeEvent){
        scope.fileread=element[0].files[0];
        showpic(changeEvent,scope)
      })
    }
  }
})
function showpic(changeEvent,scope){
  var reader = new FileReader();
  reader.onload = function (loadEvent) {
    scope.$apply(function () {
      scope.fileread = loadEvent.target.result;
      scope.theme_pic_location = scope.fileread;
    });
  }
  reader.readAsDataURL(changeEvent.target.files[0]);
}*/
function choicesvotepercent(poll){
  for(var i=0,len=poll.choices.length;i<len;i++){
    var pc = poll.choices[i];
    var vl = (pc.votes.length/poll.totalVotes*100).toFixed(2)*0.9+'%';
    poll.choices[i].choicesvotepercent = vl;
    poll.choices[i].mystyle = {
      "background-color":"lightblue",
      "width":vl,
      "text-align":'left'
    }
  }
}