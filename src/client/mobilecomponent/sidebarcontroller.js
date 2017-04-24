
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



polls1.directive('dragToDismiss', ['$drag', '$parse','$timeout','$transform',function($drag, $parse, $timeout,$transform) {
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
    messageService.publish('msgread',true)
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
      messageService.publish('userupdate',{user:result.data})
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
polls1.controller('UserController', ['userservice','messageService','$scope','SharedState','pollservice','$location','commentservice','socket',function(userservice,messageService,$scope,SharedState,pollservice,$location,commentservice,socket){

  messageService.subscribe('userupdate',function(event,data){
    $scope.user=data.user;
    $scope.msgsnum=hasunread($scope.user.msgs).num;
  })
  messageService.subscribe('msgread',function(event,data){
    if(data){
      $scope.msgsnum--;
    }
  })

  socket.on('newmsg',function(data){
    $scope.msgrem=true;
    $scope.msgsnum=data.num;
    /*alert($scope.msgsnum)*/
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
    /*$scope.msgrem=false;*/
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
