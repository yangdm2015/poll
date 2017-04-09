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
      //$scope.iarrow=genfarray($scope.user.msgs.length);
    })
  }

  initscope();
  $scope.tt=function(){
    console.log('sadfge')
  }
  /*$scope.notices = [];

  for (var j = 0; j < 10; j++) {
    $scope.notices.push({icon: 'envelope', message: 'Notice ' + (j + 1)});
  }*/
  $scope.gocommentdetail=function(notices){
    var abturl = /\/#\/(\w|\/|#)+/gmi.exec(notices.abturl)[0].split('/#')[1];
    var urls = /\/#\/(\w|\/|#)+/gmi.exec(notices.abturl)[0].split('/#')[1].split('#');
    /*console.log('绝对路径是abturl',abturl)
    window.location.href='#'+urls[0]*/
    $location.url(urls[0]);
    /*$location.url(urls[0])*/
    /*$location.path(abturl[0]);*/
    $timeout(function(){
      $location.hash(urls[1])
      /*$anchorScroll();*/
    },100)


  }
  $scope.toggle=function(noticeIndex){
    if(SharedState.get('myNotices')==noticeIndex){
      SharedState.setOne('myNotices',-1)
    }else{
      SharedState.setOne('myNotices',noticeIndex)
      /*$scope.iarrow[noticeIndex]=true;*/
    }
    if(!$scope.user.msgs[noticeIndex].read){
      setmsgreaded(noticeIndex)
    }
      /*$scope.iarrow[noticeIndex]=false;*/
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
    /*commentservice.testsockit('hr')*/
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
/*polls1.controller('UserController', ['userservice','messageService','$scope','SharedState','pollservice',function(userservice,messageService,$scope,SharedState,pollservice){*/
polls1.controller('UserController', ['userservice','messageService','$scope','SharedState','pollservice','$location','commentservice','socket',function(userservice,messageService,$scope,SharedState,pollservice,$location,commentservice,socket){

  messageService.subscribe('userupdate',function(event,data){
    $scope.user=data.user;
  })

  socket.on('newmsg',function(data){
    $scope.msgrem=true;
    $scope.msgsnum=hasunread($scope.user.msgs).num;
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
        /*$location.path('/login');
        $scope.disabled = false;*/
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
      /*img.src=scope.dddds;
      scope.$watch()*/
      img.onclick=function(e){
        ipt.click()
      }
      /*element.bind("click",function(e){
        console.log('hello')
      })*/
      element.bind('change',function(changeEvent){
        scope.user.headpic=ipt.files[0];
        showpic(changeEvent,scope)
        function showpic(changeEvent,scope){
          var reader = new FileReader();
          reader.onload = function (loadEvent) {
            scope.$apply(function () {
              img.src = loadEvent.target.result;
              /*if(scope.fileread.target){
                var target = document.querySelector(scope.fileread.target)
                target.src=scope.fileread.imgsrc
              }*/
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
        /*window.scroll(function () {         //滚动时触发
          if (angular.element(document).scrollTop() > 300)     //获取滚动条到顶部的垂直高度,到相对顶部300px高度显示
            e.fadeIn(300)
          else
            e.fadeOut(200);
        });*/
        /*点击回到顶部*/
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

