polls1.controller('UserCtrl',['$scope','$http','userservice','$location',function ($scope,$http,userservice,$location){
  $scope.test='test'
  $scope.login=function(){
    var account = $scope.user.account;
    var password = $scope.user.password;
    $scope.error = false;
    $scope.disabled = true;
    userservice.signin({account,password}).then(function(result){
      if(result.status=='ok'){
        $scope.$emit('userchange', { islogin:true,account: $scope.user.account });
        $location.path('/');
        $scope.islogin = true;
        $scope.currusername = $scope.user.account;
      }else if(result.status=='wrongpass'){
        $scope.islogin = false;
        $scope.msg="Invalid username and/or password. 用户名/密码不对";
      }else if(result.status=='notexist'){
         $scope.islogin = false;
        $scope.msg='User '+account+' does not exist. 用户'+account+'不存在'
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
    .then(function(result){
      if(result.status){
      $scope.$emit('userchange', { islogin:false,account: "" });
      $scope.islogin = false;
      $scope.currusername = '';
      }
    })
  }
  var t =0
  $scope.tt=function(){
    var account = 'dd';
    var password = 'rere';
    /*userservice.signup({'dd','rere'})*/
      userservice.signup({account,password})
    .then(function(result){
      if(result.status =='exist'){
        return userservice.signin({account,password})
      }
    })
    .then(function(result){
      if(result.status=='wrongpass'){
         $scope.$emit('userchange', {islogin:true,test:true,t:t});
      }
    })
    /*userservice.getUserStatus()
    .then(function(result){
      if(!result.status){
        t=t+1;
        $scope.$emit('userchange', {islogin:true,test:true,t:t});
      }
    })*/
  }
  $scope.register=function(){
    $scope.error = false;
    $scope.disabled = true;
    var account = $scope.user.account;
    var password = $scope.user.password
    userservice.signup({account,password})
    .then(function(result){
      if(result.status=='ok'){
        /*$location.path('/login');
        $scope.disabled = false;*/
        if($scope.autologin){
          return userservice.signin({account,password})
        }else{
          return 'tologin'
        }
      }else if(result.status =='exist'){
        return 'exist'
      }
    })
    .then(function(result){
      if(result.status=='ok'){
        t=t+1
        $scope.$emit('userchange', { islogin:true,account: account });
        /*$scope.$emit('userchange', {islogin:true,test:true,t:t});*/
        console.log('emituserchange')
        /*$scope.islogin = true;
        $scope.currusername = $scope.user.account;*/
        $location.path('/');
      }else if(result.status=='wrongpass'){
        $scope.msg='Password not matched. 密码不对'
        $location.path('/login');
        $scope.disabled = false;
      }else if(result == 'exist'){
        t=t+1
        console.log('emituserchange test:true,t=',t)
        /*$scope.$emit('userchange', {islogin:true,test:true,t:t});*/
        $scope.msg='User "'+account+'" alrady exist! 用户 '+account+' 已存在';
      }else if(result=='tologin'){
        $location.path('/login');
      }
    })
    .catch(function () {
      $scope.error = true;
      $scope.msg = "Something went wrong!";
      $scope.disabled = false;
    });
  }
}])
