polls1.factory('userservice',["$q","$http",'socket','$location',function($q,$http,socket,$location){
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
