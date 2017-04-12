




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
        .then(function(data){
          messageService.publish('userupdate',{user:data.user})
          $scope.favor=true;
          $scope.user=data.user;
        })
      }else{
        userservice.deletefrommyfavor($scope.poll._id)
        .then(function(data){
          messageService.publish('userupdate',{user:data.user})
          $scope.favor=false;
          $scope.user=data.user;
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
      console.log('告诉我现在能拿到$scope.user吗？',$scope.user)
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

polls1.controller('UserController', ['userservice','messageService','$scope','SharedState','pollservice','$location','commentservice','socket',function(userservice,messageService,$scope,SharedState,pollservice,$location,commentservice,socket){

  messageService.subscribe('userupdate',function(event,data){
    $scope.user=data.user;
  })

  socket.on('newmsg',function(data){
    $scope.msgrem=true;
    $scope.msgsnum=data.num
   /* hasunread($scope.user.msgs).num+1;*/
  })

  $scope.islogin=userservice.getUserStatussync().islogin;
  if(!$scope.islogin){
    userservice.getUserStatus()
    .then(function(result){
      $scope.islogin=result.data.islogin;
      $scope.account=result.data.account;
      if($scope.islogin){
        $scope.user=result.data.user;
        $scope.user.headpicsrc=$scope.user.img_Url?$scope.user.img_Url:pollservice.getheadpic();
        $scope.msgrem=hasunread($scope.user.msgs).hasunread;
        $scope.msgsnum=hasunread($scope.user.msgs).num;
        $scope.profilebg={
          'background':'url('+$scope.user.headpicsrc+')',
           'background-repeat': 'no-repeat',
           'background-size':'100% 100%'
        }
      }
    })
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
    return {hasunread:hasunread,num:num};
  }
  $scope.mylatestmsg=function(){
    $scope.msgrem=false;
    $location.path('/mymsgs')
  }
  $scope.myfavor=function(){
    $location.path('/myfavor')
  }

  $scope.updateuser=function(){
    console.log($scope.user)
    userservice.updateuser($scope.user)
    .then(function(result){
      $scope.user = result.data;
      $scope.user.headpicsrc=$scope.user.img_Url;
      SharedState.turnOff('modal15');
    })
  }
  $scope.zommout=function(event){
    console.log(event)
    $scope.img_zoom=$scope.img_zoom?false:true;
  }
  $scope.getheadpic=function(){
    $scope.user.headpicsrc=pollservice.getheadpic();
  };

  $scope.presibling=function($event){
    var ipt = $event.target.parentNode.nextSibling.nextSibling
    ipt.click()
    console.log(ipt)
  }
  $scope.login=function(){
    var account = $scope.user.account;
    var password = $scope.user.password;
    $scope.error = false;
    $scope.disabled = true;
    userservice.signin({account:account,password:password})
    .then(function(re){
      var result =re.data
      if(result.status=='ok'){
        $scope.user = result.user;
        $scope.user.headpicsrc=result.user.img_Url;
        $scope.islogin = true;
        userservice.setUserStatussync({islogin:true,account:account})
        messageService.publish('userlogin',{account:account,islogin:true,user:result.user})
      }else if(result.status=='wrongpass'){
        $scope.islogin = false;
        $scope.msg="Invalid username and/or password. 用户名/密码不对";
        userservice.setUserStatussync({islogin:false,account:""})
      }else if(result.status=='notexist'){
        $scope.islogin = false;
        $scope.msg='User '+account+' does not exist. 用户'+account+'不存在'
        userservice.setUserStatussync({islogin:false,account:""})
      }
    })
    .catch(function(){
      $scope.error = true;
      $scope.msg = "Invalid username and/or password";
      $scope.disabled = false;
      $scope.user = {};
    });
  }
  $scope.logout=function(){
    userservice.signout()
    .then(function(re){
      var result=re.data
      if(result.status){
        $scope.islogin = false;
        $scope.user = {};
        messageService.publish('userlogin',{account:"",islogin:false})
      }
    })
  }
  $scope.register=function(){
    $scope.error = false;
    $scope.disabled = true;
    var account = $scope.user.account;
    var password = $scope.user.password
    var img_Url = pollservice.getheadpic();
    userservice.signup({account:account,password:password,img_Url:img_Url})
    .then(function(re){
      var result =re.data;
      if(result.status=='ok'){
        if($scope.autologin){
          return userservice.signin({account:account,password:password})
        }else{
          return {data:'tologin'}
        }
      }else if(result.status =='exist'){
        console.log("result.status =='exist'")
        return {data:'exist'}
      }
    })
    .then(function(re){
      var result =re.data
      if(result.status=='ok'){

        $scope.user = result.user;
        $scope.user.headpicsrc=result.user.img_Url;
        $scope.islogin = true;
        userservice.setUserStatussync({islogin:true,account:account})
        messageService.publish('userlogin',{account:account,islogin:true,user:result.user})

        console.log('emituserlogin')
      }else if(result.status=='wrongpass'){
        $scope.msg='Password not matched. 密码不对'
      }else if(result == 'exist'){
        console.log("result == 'exist'")
        $scope.msg='User "'+account+'" alrady exist! 用户 '+account+' 已存在';
      }else if(result=='tologin'){
        $scope.loginswitch=true;
      }
    })
    .catch(function () {
      $scope.error = true;
      $scope.msg = "Something went wrong!";
      $scope.disabled = false;
    });
  }
}])


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



polls1
 .directive('dragToDismiss', ['$drag', '$parse','$timeout','$transform',function($drag, $parse, $timeout,$transform) {
  return {
    restrict: 'A',
    compile: function(elem, attrs) {
      var dismissFn = $parse(attrs.dragToDismiss);
      return function(scope,elem){
        var dismiss = false;
        var isfirst = true,initransform;
        $drag.bind(elem, {
          transform: function(element, transform, touch) {
            if(isfirst){initransform=transform;isfirst=false;}

            if(touch.distanceX>=-touch.rect.width / 4){
              if(touch.distanceX <= 0){
                transform.translateX = touch.distanceX
                transform.translateY = 0;
              }else{
                $transform.set(elem,initransform)
              }
            }
            return transform;
          },
          move: function(drag) {
            if (drag.distanceX<=-drag.rect.width / 8) {
              dismiss = true;
            } else {
              dismiss = false;
            }
          },
          cancel: function() {
            elem.removeClass('dismiss');
          },
          end: function(drag) {
            if (!dismiss) {
              drag.reset();
            }else{
              drag.transform.translateX = -drag.rect.width /4;
              $transform.set(elem,drag.transform)
            }
          }
        });
      }
    }
  };
}])

polls1.controller('sidebarcontroller', ['userservice','messageService','SharedState','$scope',function(userservice,messageService,SharedState,$scope){
  messageService.subscribe('userlogin',function(event, data) {
    $scope.islogin = data.islogin;
    $scope.account=data.account;
  })
  $scope.islogin=userservice.getUserStatussync().islogin;
  $scope.account=userservice.getUserStatussync().account;
}])



polls1.controller('myfavorcontroller',['$scope','SharedState','commentservice','messageService','userservice','socket','$location','$anchorScroll','$timeout',function($scope,SharedState,commentservice,messageService,userservice,socket,$location,$anchorScroll,$timeout){


  $scope.togglemyfavor = function(favorindex) {
    if(SharedState.get('myfavor')==favorindex){
      SharedState.setOne('myfavor',-1)
    }else{
      SharedState.setOne('myfavor',favorindex)
    }
  }
  $scope.deletefavor = function(favor) {
    var pollid = favor.poll;
    userservice.deletefrommyfavor(pollid)
    .then(function(data){
      messageService.publish('userupdate',{user:data.user})
      $scope.user=data.user;
      $scope.favor=false;
    })
  };
  $scope.gopolldetail=function(favor){
     $location.url(favor.url);
  }
  function initscope(){
    userservice.getUserstatusfromdb()
    .then(function(result){
      $scope.user=result.data.user;
      $scope.islogin = result.data.islogin;
    })
  }
  initscope()
}])


polls1.controller('msgController',['$scope','SharedState','commentservice','messageService','userservice','socket','$location','$anchorScroll','$timeout',function($scope,SharedState,commentservice,messageService,userservice,socket,$location,$anchorScroll,$timeout){
  messageService.subscribe('userupdate',function(event,data){
    $scope.user=data.user;
  })
  messageService.subscribe('userlogin',function(event, data) {
    $scope.user = data.user;
    $scope.islogin = data.islogin;
    initscope();
  })
  socket.on('newmsg',function(data){
    $scope.msgrem=true;
    initscope()
  })
  function initscope(){
    userservice.getUserstatusfromdb()
    .then(function(result){
      if(result.data.user){
        $scope.user=result.data.user;
        $scope.islogin = result.data.islogin;
      }
    })
  }

  initscope();
  $scope.tt=function(){
    console.log('sadfge')
  }
  $scope.gocommentdetail=function(notices){
    var abturl = /\/#\/(\w|\/|#)+/gmi.exec(notices.abturl)[0].split('/#')[1];
    var urls = /\/#\/(\w|\/|#)+/gmi.exec(notices.abturl)[0].split('/#')[1].split('#');
    $location.url(urls[0]);
    $timeout(function(){
      $location.hash(urls[1])
    },100)


  }
  $scope.toggle=function(noticeIndex){
    if(SharedState.get('myNotices')==noticeIndex){
      SharedState.setOne('myNotices',-1)
    }else{
      SharedState.setOne('myNotices',noticeIndex)
    }
    if(!$scope.user.msgs[noticeIndex].read){
      setmsgreaded(noticeIndex)
    }
  };
  function setmsgreaded(index){
    userservice.setmsgreaded(index)
    .then(function(result){
      console.log(result)
      $scope.user = result.data;
    })
  }

  $scope.deleteNotice = function(notice) {
    var index = $scope.user.msgs.indexOf(notice);
    if (index > -1) {
      var n = $scope.user.msgs.splice(index, 1);
      console.log('deleted notice=',n)
      commentservice.deleteusercomment(index)
      .then(function(result){
        console.log('传回的数据是：',result.data)
      })
    }
  };
  $scope.testsockit = function(){
  }
  socket.on('testobj', function(accountinfo) {
    console.log('accountinfo是',accountinfo)
    alert('accountinfo是'+accountinfo)
  })
  function genfarray(length){
    var a =  [true,true,true,true,true,true,true,true];
    for(var i= 8;i<length;){
      a = a.concat(a)
      i=a.length;
    }
    return a.slice(0,length);
  }
}])





;polls1
.factory('pollservice',['$q',"$http",function($q,$http){
  var getallpolls = function(query,page){
    var deferred = $q.defer();
    var promise = deferred.promise;
    console.log('query=',query)
    var url = "/polls/polls"
    $http({
      url:url,method:'GET',
      params:{query:query,page:page}
    })
    .then(function(data){
      deferred.resolve(data);
    })
    .catch(function (err) {
      deferred.reject(err);
    });
    return promise;
  }
  var getmypoll=function(username,query,page){
    var deferred = $q.defer();
    var promise = deferred.promise;
    if(username){
      var url = '/mypolls/'+username;
      $http({
        url:url,method:'GET',
        params:{query:query,page:page}
      })
      .then(function(data){
        console.log('in getmypoll, return data=',data)
        deferred.resolve(data);
      })
      .catch(function (err) {
        deferred.reject(err);
      });
    }else{
      deferred.reject('Please login first!');
    }
    return promise;
  }
  var getmyvote=function(account,query,page){
    var deferred = $q.defer();
    var promise = deferred.promise;
    if(account){
      var url = '/myvotes/'+account;
      $http({
        url:url,method:'GET',
        params:{query:query,page:page}
      })
      .then(function(data){
        deferred.resolve(data);
      })
      .catch(function (err) {
        deferred.reject(err);
      });
    }else{
      deferred.reject('Please login first!');
    }
    return promise;
  }
  var getpoll = function(pollId){
    var deferred = $q.defer();
    var promise = deferred.promise;
    $http.get('/polls/'+pollId)
    .then(function(data){
      deferred.resolve(data);
    })
    .catch(function (err) {
      deferred.reject(err);
    });
    return promise;
  }
  function fds(poll,fileread){
    var fd = new FormData();
    var imgchs = poll.allow_img_choice
    angular.forEach(poll, function(val, key) {
      if(key=='choices'){
        if(imgchs){
          for(var i=0,len=val.length;i<len;i++){
            var filetmp = val[i].file;
            fd.append('poll_theme', filetmp);
          }
        }
        fd.append(key, JSON.stringify(val))
      }else fd.append(key, val);
    });
    if(typeof fileread =='string'){/*说明用的是默认图片*/
      fd.append('poll_theme_url', fileread);
    }else{
      fd.append('poll_theme', fileread);
    }
    return fd;
  }
  var savepoll=function(poll,fileread){
    var deferred = $q.defer();
    var promise = deferred.promise;
    if(poll.question.length > 0) {
      var choiceCount = 0;
      for(var i = 0, ln = poll.choices.length; i < ln; i++) {
        var choice = poll.choices[i];
        if(choice.text.length > 0) {
          choiceCount++
        }
      }
      if(choiceCount > 1) {
        var fd = fds(poll,fileread)
         var option = {
          method:'post',
          url:'polls',
          data:fd,
          headers: {'Content-Type': undefined},
          transformRequest: angular.identity
        }
        $http(option).then(function(data){
          console.log("save successful");
          deferred.resolve(data);
        })
        .catch(function (err) {
          deferred.reject(err);
          alert('暂时不能创建投票，请稍后再试');
        });
      } else {
        alert('你必须至少填写两个选项！');
      }
    } else {
      alert('你必须填写投票主题！');
    }
    return promise;
  }

  var getthemepic=function(){
    var theme_pic_location = 'pollcomponent/theme_pic/'+Math.floor((Math.random()*21)+1)+'.jpg'
    return theme_pic_location;
  }
  var getheadpic=function(){
    var head_pic_location = 'pollcomponent/head_pic/'+Math.floor((Math.random()*24)+1)+'.jpg'
    return head_pic_location;
  }
  var genorder=function(polls){
    var ps = polls
    var orders=[];
    for(var p in ps){
      var po = ps[p];
      po.img_Url= po.img_Url?po.img_Url:'routercomponent/routerimg/logo.png'
      var d = new Date(po.meta.updateAt);
      d=(d.getTime()+"").slice(0,10);
      po.order=d;
      orders.push(d)
    }

    orders=orders.sort(sortNumberab);
    for(var p in ps){
      var po = ps[p];
      po.order = orders.indexOf(po.order);
    }
    ps.sort(sortobjorderba);
    return ps
    function sortNumberba(a,b){return b - a} /*降序*/
    function sortNumberab(a,b){return a - b} /*升序*/
    function sortobjorderab(a,b){return a.order - b.order}
    function sortobjorderba(a,b){return b.order - a.order}
  }
  var showItemdetail = function(itemId){
    window.location.href='#/poll/'+itemId
    return false;
  };
  return {
    getheadpic:getheadpic,
    showItemdetail:showItemdetail,
    genorder:genorder,
    getthemepic:getthemepic,
    getmypoll:getmypoll,
    getmyvote:getmyvote,
    getpoll:getpoll,
    getallpolls:getallpolls,
    savepoll:savepoll
  }
}])
.factory('socket',['$rootScope','$timeout',function($rootScope,$timeout) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $timeout(function(){
          callback.apply(socket, args);
        },0)
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $timeout(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        },0);
      })
    }
  };
}]);
polls1.service('commentservice',['$q',"$http",function($q,$http){
  var savecomment = function(comment){
    var deferred = $q.defer();
    var promise = deferred.promise;
    var url = "/comment/create"
    $http({
      url:url,method:'post',
      data:{comment:comment}
    })
    .then(function(data){
      deferred.resolve(data);
    })
    .catch(function (err) {
      deferred.reject(err);
    });
    return promise;
  }
  var getcommentbytouser = function(touserid){
    var deferred = $q.defer();
    var promise = deferred.promise;
    var url = "/comment/getbytouserid"
    $http({
      url:url,method:'post',
      data:{touserid:touserid}
    })
    .then(function(data){
      deferred.resolve(data);
    })
    .catch(function (err) {
      deferred.reject(err);
    });
    return promise;
  }
  var deleteusercomment = function(commentindex){
    var deferred = $q.defer();
    var promise = deferred.promise;
    var url = "/user/deleteusercomment"
    $http({
      url:url,method:'post',
      data:{commentindex:commentindex}
    })
    .then(function(data){
      deferred.resolve(data);
    })
    .catch(function (err) {
      deferred.reject(err);
    });
    return promise;
  }
  var testsockit = function(str){
    var deferred = $q.defer();
    var promise = deferred.promise;
    var url = "/comment/test"
    $http({
      url:url,method:'post',
      data:{name:str}
    })
    .then(function(data){
      deferred.resolve(data);
    })
    .catch(function (err) {
      deferred.reject(err);
    });
    return promise;
  }

  return {
    deleteusercomment:deleteusercomment,
    testsockit:testsockit,
    getcommentbytouser:getcommentbytouser,
    savecomment:savecomment
  }
}])
;polls1.factory('userservice',["$q","$http",'socket','$location',function($q,$http,socket,$location){
  var accountinfo={islogin:false,account:""};
  var getUserStatussync=function(){
    return accountinfo;
  }
  var setUserStatussync=function(ainfo){
     accountinfo=ainfo;
  }
  var getUserStatus =function() {
    var deferred = $q.defer();
    var promise = deferred.promise;
    $http.get('/user/status')
    .then(function (result) {
      var data=result.data;
      if(data.status){
        setUserStatussync({islogin:data.islogin,account:data.account,user:data.user})
      }
      deferred.resolve(result)
    })
    .catch(function (err) {
      deferred.reject(err)
    });
    return promise;
  }

  var getUserstatusfromdb = function(){
    var deferred = $q.defer();
    var promise = deferred.promise;
    $http.get('/user/statusfromdb')
    .then(function (result) {
      var data=result.data;
      if(data.status){
        setUserStatussync({islogin:data.islogin,account:data.account,user:data.user})
      }
      deferred.resolve(result)
    })
    .catch(function (err) {
      deferred.reject(err)
    });
    return promise;
  }


  function user2fd(user){
    var fd = new FormData();
    for(var key in user){
      fd.append(key,user[key]);
    }
    return fd;
  }
  var updateuser=function(user){
    var fd = user2fd(user)
    var deferred = $q.defer();
    var promise = deferred.promise;
    var option = {
      method:'post',
      url:'/user/update',
      data:fd,
      headers: {'Content-Type': undefined}
    }
    $http(option).then(function(data){
      deferred.resolve(data);
    })
    return promise;
  }
  var signin=function(user){
    var deferred = $q.defer();
    var promise = deferred.promise;
    var option = {
      method:'post',
      url:'/user/login',
      data:{
        user:user
      }
    }
    console.log('$location=',$location)
    var pollid = $location.$$path.split('/')[2]
    $http(option).then(function(data){

      deferred.resolve(data);
    })
    return promise;
  }
  var signup=function(user){
    var deferred = $q.defer();
    var promise = deferred.promise;
    var option = {
      method:'post',
      url:'/user/register',
      data:{
        user:user
      }
    }
    $http(option).then(function(data){
      deferred.resolve(data);
    })
    return promise;
  }
  var signout=function(){
    var deferred = $q.defer();
    var promise = deferred.promise;
    $http.get('/user/logout')
    .then(function (data) {
      if(data.status){
        accountinfo.islogin = false;
        accountinfo.account = "";
        deferred.resolve(data);
      }else{
        deferred.resolve(data);
      }
    })
    .catch(function (data) {
      deferred.reject();
    });
    return promise;
  }
  var setmsgreaded=function(index){
    var deferred = $q.defer();
    var promise = deferred.promise;
    var option = {
      method:'get',
      url:'/user/setmsgreaded',
      params:{index:index}
    }
    $http(option).then(function(data){
      deferred.resolve(data);
    })
    return promise;
  }
  var addtomyfavor = function(pollid,url){
    var deferred = $q.defer();
    var promise = deferred.promise;
    var option = {
      method:'get',
      url:'/user/addtomyfavor',
      params:{pollid:pollid,url:url}
    }
    $http(option).then(function(data){
      deferred.resolve(data);
    })
    return promise;
  }
  var deletefrommyfavor = function(pollid){
    var deferred = $q.defer();
    var promise = deferred.promise;
    var option = {
      method:'get',
      url:'/user/deletefrommyfavor',
      params:{pollid:pollid}
    }
    $http(option).then(function(data){
      deferred.resolve(data);
    })
    return promise;
  }


  return{
    updateuser:updateuser,
    setUserStatussync:setUserStatussync,
    getUserStatussync:getUserStatussync,
    signout:signout,
    signup:signup,
    signin:signin,
    getUserStatus:getUserStatus,
    getUserstatusfromdb:getUserstatusfromdb,
    setmsgreaded:setmsgreaded,
    addtomyfavor:addtomyfavor,
    deletefrommyfavor:deletefrommyfavor
  }
}])
;
polls1.directive('dragMe', ['$drag',function($drag){
      return {
        link: function(scope, $element) {
          var transtmp;
          $drag.bind($element,
              {
                transform: function(element, transform, touch) {
                  if(transtmp){
                    transform.translateX = (transtmp.translateX+touch.distanceX)*1;
                    transform.translateY = (transtmp.translateY+touch.distanceY)*1;
                  }else{
                    transform.translateX = touch.distanceX;
                    transform.translateY = touch.distanceY;
                  }
                  return transform;
                },
                end: function(drag) {
                  transtmp = drag.transform
                }}
          );
        }
      };
    }]);
angular.module("ngTouch", [])
.directive("ngTouchstart", function () {
  return {
    controller: ["$scope", "$element", function ($scope, $element) {

      $element.bind("touchstart", onTouchStart);
      function onTouchStart(event) {
        var method = $element.attr("ng-touchstart");
        $scope.$apply(method);
      }

    }]
  }
})
.directive("ngTouchmove", function () {
  return {
    controller: ["$scope", "$element", function ($scope, $element) {

      $element.bind("touchstart", onTouchStart);
      function onTouchStart(event) {
        event.preventDefault();
        $element.bind("touchmove", onTouchMove);
        $element.bind("touchend", onTouchEnd);
      }
      function onTouchMove(event) {
        var method = $element.attr("ng-touchmove");
        $scope.$apply(method);
      }
      function onTouchEnd(event) {
        event.preventDefault();
        $element.unbind("touchmove", onTouchMove);
        $element.unbind("touchend", onTouchEnd);
      }

    }]
  }
})
.directive("ngTouchend", function () {
  return {
    controller: ["$scope", "$element", function ($scope, $element) {

      $element.bind("touchend", onTouchEnd);
      function onTouchEnd(event) {
        var method = $element.attr("ng-touchend");
        $scope.$apply(method);
      }

    }]
  }
});

polls1.directive("chsheadimg", function () {
  return {
    replace:true,
    scope:{
      user:"=u",
      dddds:'=headpicsrc'
    },
    templateUrl: 'pages/templates/chsheadimg.html',
    link: function (scope, element, attributes) {
      var img = element[0].querySelector('img');
      var ipt = element[0].querySelector('input');
      img.onclick=function(e){
        ipt.click()
      }
      element.bind('change',function(changeEvent){
        scope.user.headpic=ipt.files[0];
        showpic(changeEvent,scope)
        function showpic(changeEvent,scope){
          var reader = new FileReader();
          reader.onload = function (loadEvent) {
            scope.$apply(function () {
              img.src = loadEvent.target.result;
            });
          }
          reader.readAsDataURL(changeEvent.target.files[0]);
        }
      })
    }
  }
})
polls1.directive("backToTop", function () {
    return {
      restrict: "E",
      link: function (scope, element, attr) {
        var e = element;
        e[0].onclick=function(e){
          console.log('sdfsaf')
        }


        e[0].onclick=function () {
          angular.element(document).find('body').animate({         //添加animate动画效果
            scrollTop: 0
          }, 500);
        };
      }
    };
  })


polls1.directive("filefrominput", function () {
  return {
    replace:true,
    scope: {
      fileread: "=",
      dddds:"=tpl",
      changeimgurl:"&ciu"
    },
    templateUrl: 'pages/templates/filefrominput.html',
    link: function (scope, element, attributes) {
      var btn =  element[0].querySelector('button');
      var span =  element[0].querySelector('span');
      var ipt = element[0].querySelector('input')
      var img = element[0].querySelector('img');
      span.onclick=function(){
        console.log('hello!')
        ipt.click();
      }
      element.bind('change',function(changeEvent){
        scope.fileread.file=element[0].querySelector('input').files[0];
        showpic(changeEvent,scope)
        function showpic(changeEvent,scope){
          var reader = new FileReader();
          reader.onload = function (loadEvent) {
            img.src=loadEvent.target.result
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
    templateUrl:'pages/templates/mbchoiceimg.html'
  }
})

polls1.service('messageService', ['$rootScope', function($rootScope) {
  return {
    publish: function(name, parameters) {
      $rootScope.$emit(name, parameters);
    },
    subscribe: function(name, listener) {
      $rootScope.$on(name, listener);
    }
  };
}]);