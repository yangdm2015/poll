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
      }else{
        $scope.islogin = false;
        $scope.msg=result.status;
      }
    })
    .catch(function(){
      $scope.error = true;
      $scope.errorMessage = "Invalid username and/or password";
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
  $scope.register=function(){
    $scope.error = false;
    $scope.disabled = true;
    var account = $scope.user.account;
    var password = $scope.user.password
    userservice.signup({account,password})
    .then(function(result){
      if(result.status=='ok'){
        $location.path('/login');
        $scope.disabled = false;
        if($scope.autologin){
          return userservice.signin({account,password})
        }
      }else{
        $scope.msg=result.status;
      }
      return "goon"
    })
    .then(function(result){
      if(result.status=='ok'){
        $scope.$emit('userchange', { islogin:true,account: $scope.user.account });
        $location.path('/');
        $scope.islogin = true;
        $scope.currusername = $scope.user.account;
      }else{
        $location.path('/login');
        $scope.disabled = false;
      }
    })
    .catch(function () {
      $scope.error = true;
      $scope.errorMessage = "Something went wrong!";
      $scope.disabled = false;
    });
  }
}])
