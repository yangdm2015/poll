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
polls1.controller('MyPollListCtrl',['$timeout','$scope','$location','$route','pollservice','userservice','messageService',function ($timeout,$scope,$location,$route,pollservice,userservice,messageService) {
  messageService.subscribe('query4question', function(event, data) {
    console.log("MyVoteListCtrl",data.query)
    getmypoll(data.query)
  })

  function getmypoll(query){
    userservice.getUserStatus()
    .then(function(re){
      var result=re.data
      var name = result.account;
      name = result.user_id;
     /* $scope.polls =MyPolls.query({cuser:username})*/
      return pollservice.getmypoll(name,query)
    })
    .then(function(po){
      $scope.polls = po.data;
    })
    .catch(function (err) {
      console.log(err);
    });
  }
  getmypoll()
  $scope.showItemdetail = pollservice.showItemdetail;


}])
polls1.controller('MyVoteListCtrl',['$timeout','$scope','$location','$route','pollservice','userservice','messageService',function ($timeout,$scope,$location,$route,pollservice,userservice,messageService) {
  messageService.subscribe('query4question', function(event, data) {
    console.log("MyVoteListCtrl",data.query)
    getmyvote(data.query)
  })
  function getmyvote(query){
    userservice.getUserStatus()
    .then(function(re){
      var result=re.data
      var username = result.account;
      username = result.user_id;
      return pollservice.getmyvote(username,query)
      /*$scope.polls =MyVotes.query({cuser:username})*/
    })
    .then(function(po){
      $scope.polls = po.data;
    })
    .catch(function (err) {
      console.log(err);
    });
  }
  getmyvote()
  $scope.showItemdetail = pollservice.showItemdetail;
}])



polls1.controller('PollListCtrl',['$timeout','$scope','$location','pollservice','messageService',function ($timeout,$scope,$location,pollservice,messageService) {
  console.log('PollListCtrl')
  $scope.showItemdetail = pollservice.showItemdetail;
  function genorder(polls){
    var ps = polls
    for(var p in ps){
      var po = ps[p];
      po.img_Url= po.img_Url?po.img_Url:'routercomponent/routerimg/logo.png'
      var d = new Date(po.meta.updateAt);
      d=(d.getTime()+"").slice(0,7);
      po.order=d;
    }
    return ps
  }
  messageService.subscribe('query4question', function(event, data) {
    console.log(data.query)
    pollservice.getallpolls(data.query)
    .then(function(result){
      $scope.polls=genorder(result.data)
    });
  })
  pollservice.getallpolls()
  .then(function(result){
    $scope.polls=genorder(result.data)
  });
}])



/*polls1.controller('PollItemCtrl',function PollItemCtrl($scope, $routeParams, socket, pollservice,userservice) {*/
polls1.controller('PollItemCtrl',['$scope', '$routeParams', 'pollservice','socket','userservice','$rootScope',function ($scope, $routeParams, pollservice,socket,userservice,$rootScope) {

  socket.on('userchangeclient', function(accountinfo) {
    $scope.islogin = accountinfo.islogin;
    $scope.currusername = accountinfo.account;
    $scope.poll.userVoted = isvoted($scope.poll,accountinfo.account)
    console.log('userchangeclient')
  })
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
  var updateRadio = function(action,id,dom){
    if(action == 'add' && $scope.poll.userVote.indexOf(id) == -1){
        $scope.poll.userVote.pop();
        $scope.poll.userVote.push(id);
        dom.className=dom.className+' choicewrapactive';
    }
    if(action == 'remove' && $scope.poll.userVote.indexOf(id)!=-1){
      $scope.poll.userVote.pop();
      dom.className=dom.className.split('choicewrapactive')[0].split(' ')[0];
    }
  }
  $scope.updateSelection = function($event, id){
    var checkbox = $event.target;
    var action = (checkbox.checked?'add':'remove');
    if($scope.poll.allow_muti_choice){
      updateSelected(action,id);
    }else{
      updateRadio(action,id,$event.currentTarget);
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
            /*useraccount = result.account,*/
            useraccount = result.user_id,
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
  socket.on('vote', function(data) {
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

}])

polls1.controller('PollNewCtrl',['$scope','$location','userservice','pollservice','socket','$q',function PollNewCtrl($scope, $location, userservice,pollservice,socket,$q) {
  console.log("PollNewCtrl")
  // Define an empty poll model object
  userservice.getUserStatus()
    .then(function(re){
      var result=re.data
      $scope.currusername = result.account;
      $scope.islogin = result.islogin;
      $scope.theme_pic_location=pollservice.getthemepic();
      $scope.poll = {
        question: '',
        max_chosen_num:1,
        allow_muti_choice:false,
        allow_img_choice:true,
        test:false,
        choices: [{ text: '' }, { text: '' }],
        choicefileread:[{srcnode:'#choice_img_0'},{srcnode:'#choice_img_1'}]
      };
    })
    .catch(function (err) {
      console.log(err);
    });
  socket.on('userchangeclient', function(accountinfo) {
    $scope.islogin = accountinfo.islogin;
    $scope.currusername = accountinfo.account;
    console.log('userchangeclient')
  })

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
    var defered = $q.defer();
    userservice.getUserStatus()
    .then(function(re){
      var result=re.data
      var file = $scope.fileread.file?$scope.fileread.file:$scope.theme_pic_location;
      var poll = $scope.poll;
      poll.created_user=result.user_id;
      if(poll.allow_img_choice){
        for(var i=0,len=poll.choices.length;i<len;i++){
          var c = poll.choices[i];
          if(!c.file){
            defered.reject("Please upload images! 请上传选项的图片！")
          }
        }
      }
      return pollservice.savepoll(poll,file);
    })
    .then(function(result){
      console.log('result=',result)
      $location.path('polls');
    })
    .catch(function (err) {
      alert(err)
      console.log(err);
    })
  };
  /*$scope.trigger_input=function(){
    document.querySelector("[name='theme_pic']").click()
  }*/
}])

.directive("filefrominput", function () {
  return {
    replace:true,
    scope: {
      fileread: "="
    },
    template: '<input id="in" type="file" ng-hide=true >',
    link: function (scope, element, attributes) {
      var srcnode = document.querySelector(scope.fileread.srcnode);
      if(srcnode){
        srcnode.onclick=function(){
          element[0].click();
        }
      }
      element.bind('change',function(changeEvent){
        scope.fileread.file=element[0].files[0];
        showpic(changeEvent,scope)
        function showpic(changeEvent,scope){
          var reader = new FileReader();
          reader.onload = function (loadEvent) {
            scope.$apply(function () {
              scope.fileread.imgsrc = loadEvent.target.result;
              if(scope.fileread.target){
                var target = document.querySelector(scope.fileread.target)
                target.src=scope.fileread.imgsrc
              }
            });
          }
          reader.readAsDataURL(changeEvent.target.files[0]);
        }
      })
    }
  }
})
.directive("multiimgup",function(){
  function link(scope,element,attrs){
    scope.name = 'Jeff';
    var img=element.find('img')[0]
    var span=element.find('span')
    var ipt = element.find('input')[0]
    element.children()[0].onclick=function(e){
      ipt.click()
    }

    element.bind('change',function(changeEvent){
      var file=ipt.files[0];
      scope.c[attrs.idx].file=file;
      if(file){
        span.css('display','none')
        showpic(img);
      }
      function showpic(img){
        var reader = new FileReader();
        reader.onload=function(loadEvent){
          img.src=loadEvent.target.result;
        }
        reader.readAsDataURL(ipt.files[0]);
      }
    })
  }
  return{
    link:link,
    transclude: true,
    scope: {
      'index':'@idx',
      'c':'=chos'
    },
    templateUrl:'pages/templates/choiceimg.html'
  }
})


