/*
 AngularJS v1.3.0-beta.14
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(n,e,A){'use strict';function x(s,g,k){return{restrict:"ECA",terminal:!0,priority:400,transclude:"element",link:function(a,b,c,f,w){function y(){p&&(p.remove(),p=null);h&&(h.$destroy(),h=null);l&&(k.leave(l,function(){p=null}),p=l,l=null)}function v(){var c=s.current&&s.current.locals;if(e.isDefined(c&&c.$template)){var c=a.$new(),d=s.current;l=w(c,function(d){k.enter(d,null,l||b,function(){!e.isDefined(t)||t&&!a.$eval(t)||g()});y()});h=d.scope=c;h.$emit("$viewContentLoaded");h.$eval(u)}else y()}
var h,l,p,t=c.autoscroll,u=c.onload||"";a.$on("$routeChangeSuccess",v);v()}}}function z(e,g,k){return{restrict:"ECA",priority:-400,link:function(a,b){var c=k.current,f=c.locals;b.html(f.$template);var w=e(b.contents());c.controller&&(f.$scope=a,f=g(c.controller,f),c.controllerAs&&(a[c.controllerAs]=f),b.data("$ngControllerController",f),b.children().data("$ngControllerController",f));w(a)}}}n=e.module("ngRoute",["ng"]).provider("$route",function(){function s(a,b){return e.extend(new (e.extend(function(){},
{prototype:a})),b)}function g(a,e){var c=e.caseInsensitiveMatch,f={originalPath:a,regexp:a},k=f.keys=[];a=a.replace(/([().])/g,"\\$1").replace(/(\/)?:(\w+)([\?\*])?/g,function(a,e,c,b){a="?"===b?b:null;b="*"===b?b:null;k.push({name:c,optional:!!a});e=e||"";return""+(a?"":e)+"(?:"+(a?e:"")+(b&&"(.+?)"||"([^/]+)")+(a||"")+")"+(a||"")}).replace(/([\/$\*])/g,"\\$1");f.regexp=RegExp("^"+a+"$",c?"i":"");return f}var k={};this.when=function(a,b){k[a]=e.extend({reloadOnSearch:!0},b,a&&g(a,b));if(a){var c=
"/"==a[a.length-1]?a.substr(0,a.length-1):a+"/";k[c]=e.extend({redirectTo:a},g(c,b))}return this};this.otherwise=function(a){this.when(null,a);return this};this.$get=["$rootScope","$location","$routeParams","$q","$injector","$http","$templateCache","$sce",function(a,b,c,f,g,n,v,h){function l(){var d=p(),m=r.current;if(d&&m&&d.$$route===m.$$route&&e.equals(d.pathParams,m.pathParams)&&!d.reloadOnSearch&&!u)m.params=d.params,e.copy(m.params,c),a.$broadcast("$routeUpdate",m);else if(d||m)u=!1,a.$broadcast("$routeChangeStart",
d,m),(r.current=d)&&d.redirectTo&&(e.isString(d.redirectTo)?b.path(t(d.redirectTo,d.params)).search(d.params).replace():b.url(d.redirectTo(d.pathParams,b.path(),b.search())).replace()),f.when(d).then(function(){if(d){var a=e.extend({},d.resolve),b,c;e.forEach(a,function(d,b){a[b]=e.isString(d)?g.get(d):g.invoke(d,null,null,b)});e.isDefined(b=d.template)?e.isFunction(b)&&(b=b(d.params)):e.isDefined(c=d.templateUrl)&&(e.isFunction(c)&&(c=c(d.params)),c=h.getTrustedResourceUrl(c),e.isDefined(c)&&(d.loadedTemplateUrl=
c,b=n.get(c,{cache:v}).then(function(a){return a.data})));e.isDefined(b)&&(a.$template=b);return f.all(a)}}).then(function(b){d==r.current&&(d&&(d.locals=b,e.copy(d.params,c)),a.$broadcast("$routeChangeSuccess",d,m))},function(b){d==r.current&&a.$broadcast("$routeChangeError",d,m,b)})}function p(){var a,c;e.forEach(k,function(f,k){var q;if(q=!c){var g=b.path();q=f.keys;var l={};if(f.regexp)if(g=f.regexp.exec(g)){for(var h=1,p=g.length;h<p;++h){var n=q[h-1],r="string"==typeof g[h]?decodeURIComponent(g[h]):
g[h];n&&r&&(l[n.name]=r)}q=l}else q=null;else q=null;q=a=q}q&&(c=s(f,{params:e.extend({},b.search(),a),pathParams:a}),c.$$route=f)});return c||k[null]&&s(k[null],{params:{},pathParams:{}})}function t(a,b){var c=[];e.forEach((a||"").split(":"),function(a,d){if(0===d)c.push(a);else{var e=a.match(/(\w+)(.*)/),f=e[1];c.push(b[f]);c.push(e[2]||"");delete b[f]}});return c.join("")}var u=!1,r={routes:k,reload:function(){u=!0;a.$evalAsync(l)}};a.$on("$locationChangeSuccess",l);return r}]});n.provider("$routeParams",
function(){this.$get=function(){return{}}});n.directive("ngView",x);n.directive("ngView",z);x.$inject=["$route","$anchorScroll","$animate"];z.$inject=["$compile","$controller","$route"]})(window,window.angular);
//# sourceMappingURL=angular-route.min.js.map
;// Angular module, defining routes for the app
/*var polls1 = angular.module('polls', ['ngRoute','pollServices']).*/
var polls1 = angular.module('polls', ['ngRoute','ngAnimate', 'ngSanitize', 'ui.bootstrap']).
  config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {
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

polls1.run(function ($rootScope, $location, $route, userservice) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      userservice.getUserStatus()
      .then(function(re){
        var result =re.data
        if(next.access!=null){
          if (next.access.restricted && !result.islogin){
            console.log("reload!!!!!!!!!!!!!!")
            $location.path('/login');
            $route.reload();
          }
        }
      });
  });
});;polls1.controller('HomeCtrl',['$timeout','$scope','$location','$route','userservice',function ($timeout,$scope,$location,$route,userservice) {
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
      $scope.polls[p].img_Url= po.img_Url?po.img_Url:'routercomponent/routerimg/logo.png'
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
      poll.created_user=result.account;
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
    var ipt = element.find('input')[0]
    element.children()[0].onclick=function(e){
      ipt.click()
    }

    element.bind('change',function(changeEvent){
      var file=ipt.files[0];
      scope.c[attrs.idx].file=file;
      if(file){
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
};polls1.controller('ModalHeaderCtrl', ['userservice','$uibModal','$rootScope','socket',function (userservice,$uibModal,$rootScope,socket) {
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

polls1.controller('AlertDemoCtrl', function ($scope) {
})

;polls1.factory('userservice',["$q","$http",'socket','$location',function($q,$http,socket,$location){
  var accountinfo={islogin:false,account:""};
  var getUserStatussync=function(){
    return accountinfo;
  }
  var getUserStatus =function() {
    var deferred = $q.defer();
    var promise = deferred.promise;
    $http.get('/user/status')
    .then(function (data) {
      deferred.resolve(data)
    })
    .catch(function (err) {
      deferred.reject(err)
    });
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
  return{
    getUserStatussync:getUserStatussync,
    signout:signout,
    signup:signup,
    signin:signin,
    getUserStatus:getUserStatus
  }
}])
;// Angular service module for connecting to JSON APIs
/*angular.module('pollServices', ['ngResource'])*/
polls1
.factory('pollservice',['$q',"$http",function($q,$http){
  var getallpolls = function(){
    var deferred = $q.defer();
    var promise = deferred.promise;
    $http.get('/polls/polls')
    .then(function(data){
      deferred.resolve(data);
    })
    .catch(function (err) {
      deferred.reject(err);
    });
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
            /*delete val[i].file;*/
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
          /*headers: {'Content-Type': 'multipart/form-data'},*/
          transformRequest: angular.identity
          /*data:{poll:poll}*/
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
  var getmypoll=function(username){
    var deferred = $q.defer();
    var promise = deferred.promise;
    if(username){
      var url = '/mypolls/'+username;
      $http.get(url)
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
  var getmyvote=function(username){
    var deferred = $q.defer();
    var promise = deferred.promise;
    if(username){
      var url = '/myvotes/'+username;
      $http.get(url)
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
  var getthemepic=function(){
    var theme_pic_location = 'pollcomponent/theme_pic/'+Math.floor((Math.random()*21)+1)+'.jpg'
    return theme_pic_location;
  }
  return {
    getthemepic:getthemepic,
    getmypoll:getmypoll,
    getmyvote:getmyvote,
    getpoll:getpoll,
    getallpolls:getallpolls,
    savepoll:savepoll
  }
}])
.factory('socket', function($rootScope,$timeout) {
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
});
