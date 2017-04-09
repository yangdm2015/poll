polls1.factory('userservice',["$q","$http",'socket','$location',function($q,$http,socket,$location){
  var accountinfo={islogin:false,account:""};
  var getUserStatussync=function(){
    return accountinfo;
  }
  var setUserStatussync=function(ainfo){
     accountinfo=ainfo;
  }
  var getUserStatus =function() {
    var deferred = $q.defer();
    var promise = deferred.promise;
    $http.get('/user/status')
    .then(function (result) {
      var data=result.data;
      if(data.status){
        setUserStatussync({islogin:data.islogin,account:data.account,user:data.user})
      }
      deferred.resolve(result)
    })
    .catch(function (err) {
      deferred.reject(err)
    });
    return promise;
  }

  var getUserstatusfromdb = function(){
    var deferred = $q.defer();
    var promise = deferred.promise;
    $http.get('/user/statusfromdb')
    .then(function (result) {
      var data=result.data;
      if(data.status){
        setUserStatussync({islogin:data.islogin,account:data.account,user:data.user})
      }
      deferred.resolve(result)
    })
    .catch(function (err) {
      deferred.reject(err)
    });
    return promise;
  }


  function user2fd(user){
    var fd = new FormData();
    for(var key in user){
      fd.append(key,user[key]);
    }
    return fd;
  }
  var updateuser=function(user){
    var fd = user2fd(user)
    var deferred = $q.defer();
    var promise = deferred.promise;
    var option = {
      method:'post',
      url:'/user/update',
      data:fd,
      headers: {'Content-Type': undefined}
    }
    $http(option).then(function(data){
      deferred.resolve(data);
    })
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
  var setmsgreaded=function(index){
    var deferred = $q.defer();
    var promise = deferred.promise;
    var option = {
      method:'get',
      url:'/user/setmsgreaded',
      params:{index:index}
    }
    $http(option).then(function(data){
      deferred.resolve(data);
    })
    return promise;
  }
  var addtomyfavor = function(pollid,url){
    var deferred = $q.defer();
    var promise = deferred.promise;
    var option = {
      method:'get',
      url:'/user/addtomyfavor',
      params:{pollid:pollid,url:url}
    }
    $http(option).then(function(data){
      deferred.resolve(data);
    })
    return promise;
  }
  var deletefrommyfavor = function(pollid){
    var deferred = $q.defer();
    var promise = deferred.promise;
    var option = {
      method:'get',
      url:'/user/deletefrommyfavor',
      params:{pollid:pollid}
    }
    $http(option).then(function(data){
      deferred.resolve(data);
    })
    return promise;
  }


  return{
    updateuser:updateuser,
    setUserStatussync:setUserStatussync,
    getUserStatussync:getUserStatussync,
    signout:signout,
    signup:signup,
    signin:signin,
    getUserStatus:getUserStatus,
    getUserstatusfromdb:getUserstatusfromdb,
    setmsgreaded:setmsgreaded,
    addtomyfavor:addtomyfavor,
    deletefrommyfavor:deletefrommyfavor
  }
}])
