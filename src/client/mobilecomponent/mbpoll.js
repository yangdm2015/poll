var polls1 = angular.module('polls', [
  'ngRoute',
  'mobile-angular-ui',
  'mobile-angular-ui.gestures',
  'ngTouch',
]);



polls1.config(['$routeProvider',function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'pages/mobile/polllist.html', reloadOnSearch: false,controller:'PolllistController'});
  $routeProvider.when('/polllist', {templateUrl: 'pages/mobile/polllist.html', reloadOnSearch: false,controller:'PolllistController'});
  $routeProvider.when('/myvotelist', {templateUrl: 'pages/mobile/myvotelist.html', reloadOnSearch: false,controller:'MyVoteController'});
  $routeProvider.when('/mypollslist', {templateUrl: 'pages/mobile/mypollslist.html', reloadOnSearch: false,controller:'MyPollsController'});
  $routeProvider.when('/poll/:pollId', {templateUrl: 'pages/mobile/mbpollitem.html', reloadOnSearch: false,controller:'PollItemCtrl'});
  $routeProvider.when('/new', {templateUrl: 'pages/mobile/new.html', reloadOnSearch: false,controller:'Pollnewcontroller'});
  $routeProvider.when('/usermg', {templateUrl: 'pages/mobile/usermanagement.html', reloadOnSearch: false});
  $routeProvider.when('/mymsgs', {templateUrl: 'pages/mobile/drapscroll.html', reloadOnSearch: false,controller:'msgController'});
  $routeProvider.when('/myfavor', {templateUrl: 'pages/mobile/mycollection.html', reloadOnSearch: false,controller:'myfavorcontroller'});
}]);

polls1.controller('HomeCtrl', ['userservice','pollservice','$rootScope','$scope','messageService','SharedState','$anchorScroll', '$location','$window','$document','$drag',function(userservice,pollservice,$rootScope, $scope,messageService,SharedState,$anchorScroll,$location,$window,$document,$drag) {
  $hctrl = this;
  $scope.goback = function () {
    history.back();
  };
  $hctrl.gotop = function () {
    $location.hash('abtop')
    $anchorScroll()
  };
  $hctrl.togglefloatmenu = function (fm) {
    var toggledfm = fm ? false : true;
    $hctrl.fm = toggledfm;
  };
  $scope.gobaktotop = function () {
    $location.hash('abtop')
    $anchorScroll()
  };
  $scope.islogin = false;
  messageService.subscribe('navbarbtnchange', function (event, data) {
    SharedState.setOne('navbarbtn', data.navbarbtn)
  });
  $scope.swiped = function (direction) {
    alert('Swiped ' + direction);
  };
  $scope.userAgent = navigator.userAgent;

  $rootScope.$on('$routeChangeStart', function () {
    $rootScope.loading = true;
  });

  $rootScope.$on('$routeChangeSuccess', function () {
    $rootScope.loading = false;
  });
}]);

polls1.controller('PollItemCtrl',['userservice','pollservice','$scope','messageService','$routeParams','socket','commentservice','SharedState','$location','$anchorScroll','$window',function(userservice,pollservice,$scope,messageService,$routeParams,socket,commentservice,SharedState,$location,$anchorScroll,$window){

  $scope.gotop=function(){
    $location.hash('abtop')
    $anchorScroll()
  }
  $scope.anchor=function(){
    $anchorScroll.yOffset = 150;
    $location.hash('58e740b1448e9040ac5fcf86');
    $anchorScroll();
  }
  $scope.addtomyfavor=function(){
    console.log($scope.favor)
    if($scope.user){
      if(!$scope.favor){
        var url = $location.url()
        userservice.addtomyfavor($scope.poll._id,url)
        .then(function(result){
          console.log('添加用户收藏成功')
          messageService.publish('userupdate',{user:result.data})
          $scope.favor=true;
          $scope.user=result.data;
          console.log('添加用户收藏成功，user=',result.data)
        })
      }else{
        userservice.deletefrommyfavor($scope.poll._id)
        .then(function(result){
          messageService.publish('userupdate',{user:result.data})
          $scope.favor=false;
          $scope.user=result.data;
        })
      }
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
            var useraccount = result.account,
            useraccount = result.user_id,
            poll=$scope.poll;
        if(poll.userVote.length<=poll.max_chosen_num){
          if(choiceIds.length>0) {
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
  function replacecomm(arr,comment){
    for(var i=0,len=arr.length;i<len;i++){
      var item = arr[i];
      if(item._id==comment._id){
        arr.splice(i,1,comment);
        break;
      }
    }
  }
  $scope.createcomment=function(){
    userservice.getUserStatus()
    .then(function(re){
      var id = re.data.user_id;
      if($scope.curreplayto){
        return commentservice.savecomment({from:id,content:$scope.curcomment,to:$scope.curreplayto,incomment:$scope.curcomid,tocreateuser:$scope.poll.created_user,aburl:$location.absUrl()})
      }else{
        return commentservice.savecomment({from:id,content:$scope.curcomment,poll:$scope.poll._id,tocreateuser:$scope.poll.created_user,aburl:$location.absUrl()})
      }
    })
    .then(function(result){
      var comment = result.data.comment;
      var user = result.data.user;
      if($scope.curreplayto){
        $scope.curreplayto="";
        $scope.curcomid="";
        replacecomm($scope.poll.comments,comment);
      }else{
        $scope.poll.comments.push(comment);
      }
      $scope.curcomment = ""
      console.log(comment)
    })
    .catch(function(err){
      console.log(err)
    })
  }
  $scope.replytocomment=function(replytouser_id,replyto_useraccount,currentcom){/*走到这里说明回复的是楼中楼，replycom是回复的用户id，currentcom是当前评论的主楼*/
    /*alert('楼中楼！')*/
    $scope.curreplayto=replytouser_id;
    $scope.curcomid = currentcom._id;
    $scope.curcomment_ph = "回复 "+replyto_useraccount+':'
    angular.element(document).find('textarea')[0].focus();
  }
  $scope.toggle_c_show=function(){
    $scope.commentshow=$scope.commentshow==true?false:true;
  }
  socket.on('vote', function(data) {
    if(data._id === $routeParams.pollId) {
      choicesvotepercent(data);
      $scope.poll.choices = data.choices;
      $scope.poll.totalVotes = data.totalVotes;
      $scope.poll.totalVotedpeople = data.totalVotedpeople;
      $scope.poll.userVoted = true;
      $scope.poll.userChoice = data.userChoice;
      messageService.publish('userupdate',{user:data.user})
    }
  });

  function initscope(){
    messageService.subscribe('userlogin',function(event, data) {
      $scope.islogin = data.islogin;
      $scope.account=data.account;
      getpoll()
    })
    messageService.subscribe('userupdate',function(event,data){
      $scope.user=data.user;
    })
     $scope.qrsrc = document.URL;
    userservice.getUserStatus()
    .then(function(result){
      $scope.islogin=result.data.islogin;
      $scope.account = result.data.account;
      $scope.user = result.data.user;
      return $scope.user;
    })
    .then(function(user){
      getpoll();
    })

    $scope.commentshow=true;

  }
  function getpoll(){
    pollservice.getpoll($routeParams.pollId)
    .then(function(result){
      var poll = result.data
      choicesvotepercent(poll);
      $scope.poll = poll;
      if($scope.user){
        $scope.favor= isinmyfavor($scope.user.favor,poll._id)
      }else{$scope.favor=false}
      $scope.poll.userVote=[]
      console.log("poll="+$scope.poll)
      $scope.overvoted = false;
      $scope.headerstyle = {
        'background-image':'url('+poll.img_Url+')',
      };

      $scope.currusername = poll.current_user;
      $scope.islogin = poll.islogin;
    })
    .catch(function(err){
      console.log(err)
    });
  }
  function isinmyfavor(arr,pollid){
    if(arr instanceof Array&& arr.length>0){
      for(var i=0,len=arr.length;i<len;i++){
        var item = arr[i];
        if(pollid.toString() == item.poll){
          return true;
        }
      }
    }
    return false;
  }
  $scope.updateSelection=function($event,id){
    var muti = $scope.poll.allow_muti_choice
    if(muti){
      var checkbox = $event.currentTarget.getElementsByTagName("input")[1]
      checkbox.checked=checkbox.checked?false:true;
      var action = (checkbox.checked?'add':'remove');
      console.log('checkbox DETECTED!，action=',action)
      updateSelected(action,id,$event.currentTarget);

    }else{
    }
  }
  $scope.updateRadio=function(id){
    console.log(id);
    var target,arry
    if($scope.poll.allow_img_choice){
      target= document.querySelectorAll('.choicewrap[name="'+id+'"]')[1]
      arry = document.querySelectorAll('.choicewrap[ng-show]')
    }else{
      target= document.querySelectorAll('.choicewrap[name="'+id+'"]')[0]
      arry = document.querySelectorAll('.choicewrap[ng-hide]')
    }
    for(var i=0,len=arry.length;i<len;i++){
      removeClass(arry[i],"choicewrapactive")
    }
    addClass(target,"choicewrapactive")
  }
  var addClass=function(dom,className){
    if(dom.className.indexOf(className)<0){
      dom.className = dom.className+" "+className
    }
  }
  var removeClass=function(dom,className){
    if(dom.className.indexOf(className)>0){
      var reg = new RegExp(className,'gm');
      dom.className = dom.className.replace(reg,"").replace(/\s+/gm," ").replace(/\s$/,"");
    }
  }
  initscope();
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
  var updateSelected = function(action,id,dom){
    if(action == 'add' && $scope.poll.userVote.indexOf(id) == -1){
        $scope.poll.userVote.push(id);
        dom.className=dom.className+' choicewrapactive';
      if($scope.poll.max_chosen_num < $scope.poll.userVote.length){
        $scope.overvoted = true;
      }
    }
    if(action == 'remove' && $scope.poll.userVote.indexOf(id)!=-1){
      var idx = $scope.poll.userVote.indexOf(id);
      $scope.poll.userVote.splice(idx,1);
      dom.className=dom.className.split('choicewrapactive')[0].split(' ')[0];
      if($scope.poll.max_chosen_num >= $scope.poll.userVote.length){$scope.overvoted = false;}
    }
  }
}]);



polls1.controller('MyVoteController',['userservice','pollservice','$scope','messageService','$rootScope','SharedState',function(userservice,pollservice,$scope,messageService,$rootScope,SharedState){
  $scope.qrsrc = document.URL;
  messageService.publish('navbarbtnchange',{navbarbtn:3})
  var page=1,nomore = false,limit=15;
  $scope.iarrow=[];
  $scope.bottomReached = function() {
    $rootScope.loading = true;
    page=(Math.floor($scope.polls.length/10)+1);
    if(!nomore){
      userservice.getUserStatus()
      .then(function(re){
        var account = re.data.account;
        return pollservice.getmyvote(account,$scope.query,page)
      })
      .then(function(result){
        nomore=result.data.length<limit?true:false;
        $scope.polls=pollservice.genorder($scope.polls.concat(result.data))
        $rootScope.loading = false;
      })
    }else{
      $rootScope.loading = false;
    }
  };
  $scope.toggle=function(order){
    console.log("SharedState.get('myAccordion')=",SharedState.get('myAccordion'))
    console.log("order=",order)
    if(SharedState.get('myAccordion')==order){
      SharedState.setOne('myAccordion',-1)
      console.log("after,SharedState.get('myAccordion')=",SharedState.get('myAccordion'))
      $scope.iarrow[order]=false;
    }else{
      $scope.iarrow[order]=true;
      SharedState.setOne('myAccordion',order)
    }
  };
  $scope.queryquestion=function(){
    page=1
    getmyvote($scope.query)
  }

  function getmyvote(query){
    $rootScope.loading = true;
    $scope.polls =[];
    userservice.getUserStatus()
    .then(function(re){
      var account = re.data.account;
      var user_id = re.data.user_id;
      return pollservice.getmyvote(user_id,query,page)
    })
    .then(function(po){
      $scope.polls = pollservice.genorder(po.data);
      $rootScope.loading = false;
    })
    .catch(function (err) {
      console.log(err);
      $rootScope.loading = false;
    });
  }
  getmyvote()
  messageService.subscribe('userlogin',function(event, data) {
    $scope.islogin = data.islogin;
    $scope.account=data.account;
    getmyvote(data.query)
  })
  $scope.showItemdetail = pollservice.showItemdetail;
}]);

polls1.controller('MyPollsController',['userservice','pollservice','$scope','messageService','$rootScope','SharedState',function(userservice,pollservice,$scope,messageService,$rootScope,SharedState){
  $scope.qrsrc = document.URL;
  messageService.publish('navbarbtnchange',{navbarbtn:4})
  var page=1,nomore = false,limit=15;
  $scope.iarrow=[];
  $scope.bottomReached = function() {
    $rootScope.loading = true;
    page=(Math.floor($scope.polls.length/10)+1);
    if(!nomore){
      userservice.getUserStatus()
      .then(function(re){
        var account = re.data.account;
        return pollservice.getmypoll(account,$scope.query,page)
      })
      .then(function(result){
        nomore=result.data.length<limit?true:false;
        $scope.polls=pollservice.genorder($scope.polls.concat(result.data))
        $rootScope.loading = false;
      })
      .catch(function (err) {
        console.log(err);
        $rootScope.loading = false;
      });
    }else{
      $rootScope.loading = false;
    }
  };
  $scope.toggle=function(order){
    console.log("SharedState.get('myAccordion')=",SharedState.get('myAccordion'))
    console.log("order=",order)
    if(SharedState.get('myAccordion')==order){
      SharedState.setOne('myAccordion',-1)
      console.log("after,SharedState.get('myAccordion')=",SharedState.get('myAccordion'))
      $scope.iarrow[order]=false;
    }else{
      $scope.iarrow[order]=true;
      SharedState.setOne('myAccordion',order)
    }
  }
  $scope.queryquestion=function(){
    page=1;
    getmypoll($scope.query);
  }

  function getmypoll(query){
    $rootScope.loading = true;
    $scope.polls =[];
    userservice.getUserStatus()
    .then(function(re){
      var account = re.data.account;
      var user_id = re.data.user_id;
      return pollservice.getmypoll(user_id,query,page)
    })
    .then(function(po){
      $scope.polls = pollservice.genorder(po.data);
      $rootScope.loading = false;
    })
    .catch(function (err) {
      $rootScope.loading = false;
      console.log(err);
    });
  }
  getmypoll()
  $scope.showItemdetail = pollservice.showItemdetail;
}]);


polls1.controller('PolllistController', ['userservice','pollservice','$rootScope','$scope','messageService','SharedState',function(userservice,pollservice,$rootScope, $scope,messageService,SharedState) {
  $scope.showItemdetail=pollservice.showItemdetail;
  var page=1,nomore = false,limit=15;
  $scope.iarrow=[];
  $scope.bottomReached = function() {
    $rootScope.loading = true;
    page=(Math.floor($scope.polls.length/10)+1);
    if(!nomore){
      pollservice.getallpolls($scope.query,page)
      .then(function(result){
        nomore=result.data.length<limit?true:false;
        var polltmp = pollservice.genorder($scope.polls.concat(result.data))
        $scope.iarrow=genfarray(polltmp.length);
        $scope.polls = polltmp;
        $rootScope.loading = false;
      })
    }else{
      $rootScope.loading = false;
    }
  };
  $scope.toggle=function(order){
    console.log("SharedState.get('myAccordion')=",SharedState.get('myAccordion'))
    console.log("order=",order)
    if(SharedState.get('myAccordion')==order){
      SharedState.setOne('myAccordion',-1)
      console.log("after,SharedState.get('myAccordion')=",SharedState.get('myAccordion'))
      $scope.iarrow[order]=false;
    }else{
      $scope.iarrow[order]=true;
      SharedState.setOne('myAccordion',order)
    }
  }
  initscope()

  $scope.queryquestion=function(){
    page=1;
    getallpolls($scope.query);
  }

  function initscope(){
     $scope.qrsrc = document.URL;
    $rootScope.loading = true;
    $scope.uiif=[];
    if(!userservice.getUserStatussync().islogin){
      userservice.getUserStatus()
      .then(function(result){
        $scope.islogin=result.data.islogin;
        $scope.account = result.data.account;
      })
    }else{
      $scope.islogin = true;
      $scope.account=userservice.getUserStatussync().account;
    }
    getallpolls();
    messageService.publish('navbarbtnchange',{navbarbtn:1})
    $rootScope.loading = false;
  }

  function getallpolls(query){
    $rootScope.loading = true;
    pollservice.getallpolls(query,page)
    .then(function(result){
      if(result.data&&result.data.length>0){
        $scope.polls=pollservice.genorder(result.data)
      }
      $rootScope.loading = false;
    });
  }
  function genfarray(length){
    var a =  [false,false,false,false,false,false,false,false];
    for(var i= 8;i<length;){
      a = a.concat(a)
      i=a.length;
    }
    return a.slice(0,length);
  }
  messageService.subscribe('userlogin',function(event, data) {
    $scope.islogin = data.islogin;
    $scope.account=data.account;
  })
}]);


polls1.controller('Pollnewcontroller',['userservice','pollservice','$scope','messageService','$routeParams','socket','$q','$location',function(userservice,pollservice,$scope,messageService,$routeParams,socket,$q,$location){
  console.log("PollNewCtrl")
  messageService.publish('navbarbtnchange',{navbarbtn:2})
  // Define an empty poll model object
  $scope.changeimgurl=function(){
    $scope.theme_pic_location=pollservice.getthemepic();
  }

  function initscope(){
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
    messageService.subscribe('userlogin',function(event, data) {
      $scope.islogin = data.islogin;
      $scope.account=data.account;
    })
  }
  initscope();


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
  $scope.createPoll = function() {
    console.log("createPoll");
    var defered = $q.defer();
    var current_user;
    userservice.getUserStatus()
        .then(function(re){
          var result=re.data;
          current_user = result.user;
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
          messageService.publish('userupdate',{user:current_user})
          console.log('result=',result)
          var pollid = result.data._id;

          $location.path('poll/'+pollid);
        })
        .catch(function (err) {
          alert(err)
          console.log(err);
        })
  };
  $scope.test=function(){
    console.log('test!!s')
  }
}])






