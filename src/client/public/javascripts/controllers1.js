rem.controller('HomeCtrl',function ($scope,$http,remServices) {

  $scope.ee='1'
  $scope.change=function(){
    var inputw = $scope.rem

    function su(data){
      $scope.items = data;
    }
    function er(err){
      console.log(err)
    }
    remServices.savewrds(inputw)
    .then(su,er)
  }

  $scope.getredis=function(){
    console.log('getredis')
    $http({
      method:'GET',
      url:'/redis/iw',
      params:{
      'words':'inputw'
      }
    }).success(function(data){
      console.log('data=',data)
      $scope.red = data.result;
    }).error(function(err){
      console.log(err)
    })
  }
  $scope.getredissession=function(){
    $http({
      method:'GET',
      url:'/redis/sess',
      params:{
      'words':'inputw'
      }
    }).success(function(data){
      console.log('data=',data)
      $scope.sess = data.account;
    }).error(function(err){
      console.log(err)
    })
  }
  $scope.iptwds=function(){
    var inputw = $scope.rem
    $http({
      method:'GET',
      url:'/mongo/iw',
      params:{
      'words':inputw
      }
    }).success(function(data){
      $scope.items = data;
    }).error(function(err){
      console.log(err)
    })
  }
})