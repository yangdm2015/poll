// Angular module, defining routes for the app
/*var polls1 = angular.module('polls', ['ngRoute','pollServices']).*/
var polls1 = angular.module('polls', ['ngRoute','ngAnimate', 'ngSanitize', 'ui.bootstrap','infinite-scroll'])
  polls1.config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
    .when('/polls', { templateUrl: 'pages/partials/list.html', controller: 'PollListCtrl',access:{restricted:false} })
    .when('/mypolls', { templateUrl: 'pages/partials/list.html', controller: 'MyPollListCtrl',access:{restricted:false} })
    .when('/myvotes', { templateUrl: 'pages/partials/list.html', controller: 'MyVoteListCtrl',access:{restricted:false} })
    .when('/poll/:pollId', { templateUrl: 'pages/partials/item.html', controller: 'PollItemCtrl',access:{restricted:false} })
    .when('/new', { templateUrl: 'pages/partials/new.html', controller: 'PollNewCtrl',access:{restricted:false} })
    .when('/login', { templateUrl: 'pages/partials/login.html', controller: 'UserCtrl',access:{restricted:false} })
    .when('/register', { templateUrl: 'pages/partials/register.html', controller: 'UserCtrl',access:{restricted:false} })
    .otherwise({ redirectTo: '/polls' });
  }]);

polls1.run(['$rootScope','$location','$route','userservice',function ($rootScope, $location, $route, userservice) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      userservice.getUserStatus()
      .then(function(result){
        if(next.access!=null){
          if (next.access.restricted && !result.islogin){
            console.log("reload!!!!!!!!!!!!!!")
            $location.path('/login');
            $route.reload();
          }
        }
      });
  });
}]);



polls1.service('messageService', ['$rootScope', function($rootScope) {
  return {
    publish: function(name, parameters) {
      $rootScope.$emit(name, parameters);
    },
    subscribe: function(name, listener) {
      $rootScope.$on(name, listener);
    }
  };
}]);;polls1.controller('ModalHeaderCtrl', ['userservice','$uibModal','$rootScope','socket','messageService',function (userservice,$uibModal,$rootScope,socket,messageService) {
  var $ctrl = this;
  $ctrl.animationsEnabled = true;
  userservice.getUserStatus()
  .then(function(re){
    var result=re.data
    if(result.status){
      $ctrl.islogin = true;
      $ctrl.curraccount = result.account;
    }else{
       $ctrl.islogin=false;
    }
  })

  $ctrl.select=function(){
    messageService.publish('query4question',{query:$ctrl.query})
  }

  $ctrl.logout=function(){
      userservice.signout()
      .then(function(re){
        var result=re.data
        if(result.status){
          $ctrl.islogin = false;
          $ctrl.currusername = '';
        }
      })
  }

  $ctrl.loginmodalopen = function () {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      templateUrl: 'LoginModalContent',
      controller: 'LoginModalInstanceCtrl',
      controllerAs: '$ctrl'
    });

    modalInstance.result.then(function (account) {
      socket.emit('userchange',{islogin:true,account:account})
      $ctrl.islogin = true;
      $ctrl.curraccount = account;
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };



  $ctrl.registermodalopen = function () {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      templateUrl: 'registerModalContent',
      controller: 'registerModalInstanceCtrl',
      controllerAs: '$ctrl'
    });

    modalInstance.result.then(function (account) {

      $ctrl.islogin = true;
      $ctrl.curraccount = account;
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };
}]);

polls1.controller('registerModalInstanceCtrl', ['$uibModalInstance','userservice','$q',function ($uibModalInstance,userservice,$q) {
  var $ctrl = this;
  $ctrl.autologin=true;
  $ctrl.alerts = []
  $ctrl.addAlert = function(m) {
    $ctrl.alerts.push({msg:m});
  };
  $ctrl.closeAlert = function(index) {
    $ctrl.alerts.splice(index, 1);
  };


  $ctrl.ok = function () {
    userservice.signup({account:$ctrl.account,password:$ctrl.password})
    .then(function(re){
      var deferred = $q.defer();
      var promise = deferred.promise;
      var result = re.data;
      if(result.status=='ok'){
        if($ctrl.autologin){
          return userservice.signin({account:$ctrl.account,password:$ctrl.password})
        }else{
          deferred.reject('tologin')
        }
      }else if(result.status =='exist'){
        deferred.reject('exist')
      }
      return promise;
    })
    .then(function(re){
      var result = re.data;
      if(result.status=='ok'){
        $uibModalInstance.close($ctrl.account);
      }else if(result.status=='wrongpass'){
        $ctrl.addAlert("Invalid username and/or password. 用户名/密码不对")
      }else if(result.status=='notexist'){
        $ctrl.addAlert('User '+$ctrl.account+' does not exist. 用户'+$ctrl.account+'不存在')
      }
    })
    .catch(function(err){
      if(err=='tologin'){
        $uibModalInstance.dismiss('cancel');
      }else{
        $ctrl.addAlert('User "'+$ctrl.account+'" alrady exist! 用户 '+$ctrl.account+' 已存在')
      }
      console.log(err)
    });
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);


polls1.controller('LoginModalInstanceCtrl', ['$uibModalInstance','userservice',function ($uibModalInstance,userservice) {
  var $ctrl = this;

  /*$ctrl.alerts = [{ type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' }]*/
  $ctrl.alerts = []
  $ctrl.addAlert = function(m) {
    $ctrl.alerts.push({msg:m});
  };
  $ctrl.closeAlert = function(index) {
    $ctrl.alerts.splice(index, 1);
  };


  $ctrl.ok = function () {
    userservice.signin({account:$ctrl.account,password:$ctrl.password})
    .then(function(re){
      var result = re.data;
      if(result.status=='ok'){
        $uibModalInstance.close($ctrl.account);
      }else if(result.status=='wrongpass'){
        $ctrl.addAlert("Invalid username and/or password. 用户名/密码不对")
      }else if(result.status=='notexist'){
        $ctrl.addAlert('User '+$ctrl.account+' does not exist. 用户'+$ctrl.account+'不存在')
      }
    })
    .catch(function(err){
      console.log(err)
    });
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);

;polls1.controller('HomeCtrl',['$timeout','$scope','$location','$route','userservice',function ($timeout,$scope,$location,$route,userservice) {
  $scope.loadMore = function() {
    console.log('hello')}
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



polls1.controller('PollListCtrl',['$timeout','$scope','$location','pollservice','messageService','$timeout',function ($timeout,$scope,$location,pollservice,messageService,$timeout) {
  var page,nomore=false,limit=15;
  $scope.query = ""
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
    $scope.query=data.query
    pollservice.getallpolls(data.query)
    .then(function(result){
      $scope.polls=genorder(result.data)
    });
  })
  /*pollservice.getallpolls()
  .then(function(result){
    $scope.polls=genorder(result.data)
  });*/
  var timeout;
  $scope.loadMore = function() {
    $timeout.cancel(timeout)
    timeout= $timeout(function(){
      if(pollservice.getalreadyloaded()){
        pollservice.setalreadyloaded(false)
        if($scope.polls){
          page=(Math.floor($scope.polls.length/10)+1);
        }else{page=1}
        if(!nomore){
          pollservice.getallpolls($scope.query,page)
          .then(function(result){
            console.log('page=',page)
            nomore=result.data.length<limit?true:false;
            $scope.polls = $scope.polls?$scope.polls.concat(result.data):result.data
            one=true;
            pollservice.setalreadyloaded(true)
            /*$scope.polls= $scope.polls.concat(result.data)*/
          })
        }
      }
    },50)



  };
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
  var alreadyloaded=false
  var getalreadyloaded=function(){
    if(!alreadyloaded){
      alreadyloaded=true;
    }
    return alreadyloaded;
  }
  var setalreadyloaded=function(b){
    alreadyloaded=b;
  }
  return {
    getalreadyloaded:getalreadyloaded,
    setalreadyloaded:setalreadyloaded,
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
