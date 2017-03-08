polls1.factory('userservice',["$q","$http",function($q,$http){
  var accountinfo={islogin:false,account:""};
  var getUserStatus =function() {
    var deferred = $q.defer();
    var promise = deferred.promise;
    $http.get('/user/status')
    .success(function (data) {
      /*if(data.status=='ok'){
        accountinfo.islogin = true;
        accountinfo.account = data.account;
      } else {
        accountinfo.islogin = false;
        accountinfo.account = "";
      }
      deferred.resolve(accountinfo)*/
      deferred.resolve(data)
    })
    .error(function (err) {
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
    $http(option).success(function(data){
      /*if(data.status=='OK'){
        accountinfo.islogin = true;
        accountinfo.name = user.name;
      }else{
        accountinfo.islogin = false;
        accountinfo.name = "";
      }
      deferred.resolve(data);*/
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
    $http(option).success(function(data){
      deferred.resolve(data);
    })
    return promise;
  }
  var signout=function(){
    var deferred = $q.defer();
    var promise = deferred.promise;
    $http.get('/user/logout')
    .success(function (data) {
      if(data.status){
        accountinfo.islogin = false;
        accountinfo.name = "";
        deferred.resolve(data);
      }else{
        deferred.resolve(data);
      }
    })
    .error(function (data) {
      deferred.reject();
    });
    return promise;
  }
  return{
    signout:signout,
    signup:signup,
    signin:signin,
    getUserStatus:getUserStatus
  }
}])
