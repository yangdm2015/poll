angular.module('redisServices', ['ngResource'])
  .service('remServices',function($http,$q){
  this.savewrds = function(x){
    var deferred = $q.defer()
    console.log(x)
    $http({
      /*method:'POST',*/
      method:'GET',
      url:'/mongo/gw',
      params:{
      'words':x
      }
    })
    .success(function(data){
      console.log('data ',data)
      deferred.resolve(data)
    })
    .error(function(err){
      deferred.reject(err)
    })
    return deferred.promise

 /*   return $http({
      method:'GET',
      url:'/mongo/gw',
      params:{
      'words':x
      }
    })*/
    /*return $resource('redis/', {  }, {
      query: { method: 'GET', params: { words: w}, isArray: true }
    })*/
  }
})

angular.module('remServices', []).
  factory('savewrds',function(){

  })