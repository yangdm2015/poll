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


    /*remServices.savewrds(inputw)
    .success(function(data){
      console.log('receive data:',data)
      $scope.items = data;
    }).error(function(err){
      console.log(err)
    })*/
    /*$scope.items = remServices.savewrds.query(inputw);*/

    /*$scope.items = [
      {'value':inputw+1},
      {'value':inputw+2},
      {'value':inputw+3},
      {'value':inputw+4},
    ]*/
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