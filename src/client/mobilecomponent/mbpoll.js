var polls1 = angular.module('polls', [
  'ngRoute',
  'mobile-angular-ui',

  // touch/drag feature: this is from 'mobile-angular-ui.gestures.js'.
  // This is intended to provide a flexible, integrated and and
  // easy to use alternative to other 3rd party libs like hammer.js, with the
  // final pourpose to integrate gestures into default ui interactions like
  // opening sidebars, turning switches on/off ..
  'mobile-angular-ui.gestures',
  'ngTouch',
  'duScroll'
]);

//
// For this trivial demo we have just a unique MainController
// for everything
//


polls1.config(function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'pages/templates/mb/home.html', reloadOnSearch: false});
  $routeProvider.when('/scroll', {templateUrl: 'pages/templates/mb/scroll.html', reloadOnSearch: false});
  $routeProvider.when('/polllist', {templateUrl: 'pages/mobile/polllist.html', reloadOnSearch: false,controller:'PolllistController'});
  $routeProvider.when('/myvotelist', {templateUrl: 'pages/mobile/myvotelist.html', reloadOnSearch: false,controller:'MyVoteController'});
  $routeProvider.when('/mypollslist', {templateUrl: 'pages/mobile/mypollslist.html', reloadOnSearch: false,controller:'MyPollsController'});
  $routeProvider.when('/newlist', {templateUrl: 'pages/templates/mb/newlist.html', reloadOnSearch: false});
  $routeProvider.when('/poll/:pollId', {templateUrl: 'pages/mobile/mbpollitem.html', reloadOnSearch: false,controller:'PollItemCtrl'});
  $routeProvider.when('/toggle', {templateUrl: 'pages/templates/mb/toggle.html', reloadOnSearch: false});
  $routeProvider.when('/tabs', {templateUrl: 'pages/templates/mb/tabs.html', reloadOnSearch: false});
  $routeProvider.when('/accordion', {templateUrl: 'pages/templates/mb/accordion1.html', reloadOnSearch: false});
  $routeProvider.when('/overlay', {templateUrl: 'pages/templates/mb/overlay.html', reloadOnSearch: false});
  $routeProvider.when('/forms', {templateUrl: 'pages/templates/mb/forms.html', reloadOnSearch: false,controller:'UserController'});
  $routeProvider.when('/new', {templateUrl: 'pages/mobile/new.html', reloadOnSearch: false,controller:'Pollnewcontroller'});
  $routeProvider.when('/usermg', {templateUrl: 'pages/mobile/usermanagement.html', reloadOnSearch: false});
  $routeProvider.when('/dropdown', {templateUrl: 'pages/templates/mb/dropdown.html', reloadOnSearch: false});
  $routeProvider.when('/touch', {templateUrl: 'pages/templates/mb/touch.html', reloadOnSearch: false});
  $routeProvider.when('/touch/:touchid', {templateUrl: 'pages/templates/mb/touch.html', reloadOnSearch: false});
  $routeProvider.when('/swipe', {templateUrl: 'pages/templates/mb/swipe.html', reloadOnSearch: false});
  $routeProvider.when('/drag', {templateUrl: 'pages/templates/mb/drag.html', reloadOnSearch: false,controller:'msgcontroller'});
  $routeProvider.when('/drag2', {templateUrl: 'pages/templates/mb/drag2.html', reloadOnSearch: false});
  $routeProvider.when('/carousel', {templateUrl: 'pages/templates/mb/carousel.html', reloadOnSearch: false});
  $routeProvider.when('/sidebarRight', {templateUrl: 'pages/templates/mb/sidebarRight.html', reloadOnSearch: false});
  $routeProvider.when('/test', {templateUrl: 'pages/templates/mb/overlay.html', reloadOnSearch: false,controller:'testctrl'});
  $routeProvider.when('/mymsgs', {templateUrl: 'pages/mobile/drapscroll.html', reloadOnSearch: false,controller:'msgController'});
  $routeProvider.when('/myfavor', {templateUrl: 'pages/mobile/mycollection.html', reloadOnSearch: false,controller:'myfavorcontroller'});
});






polls1.controller('testscroll11',['$anchorScroll', '$location', '$scope',function($anchorScroll, $location, $scope){
  var as = [1,2,3,4,5,6,7,8,9,10,11,12,13]
   $anchorScroll.yOffset = 550;
  $scope.gotoAnchor = function(x) {
    var newHash = 'anchor' + x;
    if ($location.hash() !== newHash) {
      // set the $location.hash to `newHash` and
      // $anchorScroll will automatically scroll to it
      /*$location.hash('anchor' + x);*/
      $location.path('anchor' + x);

    } else {
      // call $anchorScroll() explicitly,
      // since $location.hash hasn't changed
      $anchorScroll();
    }
  };
}])
polls1.controller('testctrl1',function(){

})
polls1.controller('HomeCtrl', ['userservice','pollservice','$rootScope','$scope','messageService','SharedState','$anchorScroll',    '$location','$window','$document','$drag',function(userservice,pollservice,$rootScope, $scope,messageService,SharedState,$anchorScroll,$location,$window,$document,$drag) {
   $hctrl=this;
   /*$scope.qrsrc = document.URL;*/
  /*var fm = document.getElementById('fm')
  $drag.bind(fm,{transform: $drag.TRANSLATE_BOTH},document)*/
  $scope.goback=function(){
    history.back();
  }
  $hctrl.gotop=function(){
    $location.hash('abtop')
    $anchorScroll()
  }
  $hctrl.togglefloatmenu=function(fm){
    var toggledfm=fm?false:true;
    $hctrl.fm=toggledfm;
  }
  $scope.gobaktotop=function(){
    /*$location.hash('abtop1')*/
    /*$anchorScroll(0,0);*/
    /*window.scrollTo(0, 0);*/
    /*$anchorScroll();*/
    /*$window.scrollTo(0, 0);*/

    /*$document.scrollTopAnimated(0, 1000)*/
    $location.hash('abtop')
    $anchorScroll()
  }
  $scope.islogin=false;
  messageService.subscribe('navbarbtnchange',function(event, data) {
    SharedState.setOne('navbarbtn',data.navbarbtn)
  })
  $scope.array=[0,1,2,3,4]
  $scope.array=[{idx:0},{idx:1},{idx:2},{idx:3},{idx:4}]
  $scope.swiped = function(direction) {
    alert('Swiped ' + direction);
  };


  // User agent displayed in home page
  $scope.userAgent = navigator.userAgent;

  // Needed for the loading screen
  $rootScope.$on('$routeChangeStart', function() {
    $rootScope.loading = true;
  });

  $rootScope.$on('$routeChangeSuccess', function() {
    $rootScope.loading = false;
  });
  /*document.addEventListener("load",function(){
    stroll.bind( '#main ul' );
  })*/
/*$scope.$on('$viewContentLoaded', function(){
  stroll.bind( '#main ul' );
});*/

  $scope.chatUsers = [
    {name: 'Carlos  Flowers', online: true},
    {name: 'Byron Taylor', online: true},
    {name: 'Jana  Terry', online: true},
    {name: 'Darryl  Stone', online: true},
    {name: 'Fannie  Carlson', online: true},
    {name: 'Holly Nguyen', online: true},
    {name: 'Bill  Chavez', online: true},
    {name: 'Veronica  Maxwell', online: true},
    {name: 'Jessica Webster', online: true},
    {name: 'Jackie  Barton', online: true},
    {name: 'Crystal Drake', online: false},
    {name: 'Milton  Dean', online: false},
    {name: 'Joann Johnston', online: false},
    {name: 'Cora  Vaughn', online: false},
    {name: 'Nina  Briggs', online: false},
    {name: 'Casey Turner', online: false},
    {name: 'Jimmie  Wilson', online: false},
    {name: 'Nathaniel Steele', online: false},
    {name: 'Aubrey  Cole', online: false},
    {name: 'Donnie  Summers', online: false},
    {name: 'Kate  Myers', online: false},
    {name: 'Priscilla Hawkins', online: false},
    {name: 'Joe Barker', online: false},
    {name: 'Lee Norman', online: false},
    {name: 'Ebony Rice', online: false}
  ];
$scope.lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
    'Vel explicabo, aliquid eaque soluta nihil eligendi adipisci error, illum ' +
    'corrupti nam fuga omnis quod quaerat mollitia expedita impedit dolores ipsam. Obcaecati.';
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
      $scope.polls=pollservice.genorder(result.data)
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
}])

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
}])

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
}])

polls1.controller('PollItemCtrl',['userservice','pollservice','$scope','messageService','$routeParams','socket','commentservice','SharedState','$location','$anchorScroll','$window',function(userservice,pollservice,$scope,messageService,$routeParams,socket,commentservice,SharedState,$location,$anchorScroll,$window){

  /*$scope.togglefloatmenu=function(fm){
    var toggledfm=fm?false:true;
    $scope.fm=toggledfm;
  }*/

  $scope.gotop=function(){
    /*window.scrollTo(0,0);*/
    /*angular.element(document).find('body').animate({
      scrollTop: 0
    }, 500);*/
/*$window.scrollTo(0, 0)*/
    $location.hash('abtop')
    $anchorScroll()
    /*$location.hash('abtop');*/
  }
  $scope.anchor=function(){
    $anchorScroll.yOffset = 150;
    /*var ff = $location.absUrl() +'#58e740b1448e9040ac5fcf86';
    window.location.href = ff*/
    $location.hash('58e740b1448e9040ac5fcf86');
    /*$location.hash('#/poll/58e72aad6eea0005f0caa358#58e74086448e9040ac5fcf84');*/
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
            useraccount = result.account,
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
      /*messageService.publish('userupdate',{user:user})*/
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
    /*console.dir(data);*/
    if(data._id === $routeParams.pollId) {
      choicesvotepercent(data);
      $scope.poll.choices = data.choices;
      $scope.poll.totalVotes = data.totalVotes;
      $scope.poll.totalVotedpeople = data.totalVotedpeople;
      $scope.poll.userVoted = true;
      $scope.poll.userChoice = data.userChoice;
      messageService.publish('userupdate',{user:data.user})
      /*choicesvotepercent($scope.poll)*/
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
      /*$scope.qrsrc = document.URL;*/
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
      /*var srcnode = document.querySelector(scope.fileread.srcnode);
      if(srcnode){
        srcnode.onclick=function(){
          element[0].querySelector('input').click();
        }
      }
      element.bind('click',function(e){
        console.log('input!')
      })*/
      element.bind('change',function(changeEvent){
        scope.fileread.file=element[0].querySelector('input').files[0];
        showpic(changeEvent,scope)
        function showpic(changeEvent,scope){
          var reader = new FileReader();
          reader.onload = function (loadEvent) {
            img.src=loadEvent.target.result
            /*scope.$apply(function () {
              scope.fileread.imgsrc = loadEvent.target.result;
              if(scope.fileread.target){
                var target = document.querySelector(scope.fileread.target)
                target.src=scope.fileread.imgsrc
              }
            });*/
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
.directive('dragToDismiss', function($drag, $parse, $timeout,$transform) {
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
            /*if(touch.distanceX<=0&&touch.distanceX>=-touch.rect.width / 8){
              transform.translateX = -touch.rect.width / 4
              transform.translateY = 0;
            }*/
            return transform;
          },
          move: function(drag) {
            if (drag.distanceX<=-drag.rect.width / 8) {
              dismiss = true;

              /*elem.addClass('dismiss');*/
            } else {
              dismiss = false;

              /*elem.removeClass('dismiss');*/
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
              /*alert(elem)*/
              /*alert("drag.transform.translateX="+drag.transform.translateX+"\ndrag.distanceX="+drag.distanceX)*/
              /*drag.transform
              drag.transform.set(e,)*/
              /*alert("touch.distanceX="+touch.distanceX+'\n-drag.rect.width / 4='+-drag.rect.width / 4)
              transform.translateX = drag.rect.width /4;*/
            }
              //alert('dismitted')
              /*elem.addClass('dismitted');
              $timeout(function() {
                scope.$apply(function() {
                  dismissFn(scope);
                });
              }, 300);
            } else {
              drag.reset();
            }*/
          }
        });
      }
    }
  };
})
.directive('dragMe', ['$drag', function($drag){
  return {
    controller: function($scope, $element) {
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
            /*$transform.set($element,drag.transform)*/
          }}
      );
    }
  };
}]);

"use strict";
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