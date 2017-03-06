polls1.controller('UserCtrl',['$scope','$http','userservice','$location',function ($scope,$http,userservice,$location){
  $scope.test='test'
  $scope.login=function(){
    var account = $scope.user.account;
    var password = $scope.user.password;
    $scope.error = false;
    $scope.disabled = true;
    userservice.signin({account,password}).then(function(result){
      if(result.status){
        $scope.$emit('userchange', { islogin:true,account: $scope.user.account });
        $location.path('/');
        $scope.islogin = true;
        $scope.currusername = $scope.user.account;
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
      if(result.status){
        $location.path('/login');
        $scope.disabled = false;
        $scope.registerForm = {};
      }
    })
    .catch(function () {
      $scope.error = true;
      $scope.errorMessage = "Something went wrong!";
      $scope.disabled = false;
      $scope.registerForm = {};
    });
  }
}])
