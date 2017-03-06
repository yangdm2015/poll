// Angular service module for connecting to JSON APIs
/*angular.module('pollServices', ['ngResource'])*/
polls1
.factory('pollservice',['$q',"$http",function($q,$http){
  var getallpolls = function(){
    var deferred = $q.defer();
    var promise = deferred.promise;
    $http.get('/polls/polls')
    .success(function(data){
      deferred.resolve(data);
    })
    .error(function (err) {
      deferred.reject(err);
    });
    return promise;
  }
  var getpoll = function(pollId){
    var deferred = $q.defer();
    var promise = deferred.promise;
    $http.get('/polls/'+pollId)
    .success(function(data){
      deferred.resolve(data);
    })
    .error(function (err) {
      deferred.reject(err);
    });
    return promise;
  }
  var savepoll=function(poll){
    var deferred = $q.defer();
    var promise = deferred.promise;
    if(poll.question.length > 0) {
      var choiceCount = 0;
      for(var i = 0, ln = poll.choices.length; i < ln; i++) {
        var choice = poll.choices[i];
        if(choice.text.length > 0) {
          choiceCount++
        }
      }
      if(choiceCount > 1) {
         var option = {
          method:'post',
          url:'polls',
          data:{poll:poll}
        }
        $http(option).success(function(data){
          console.log("save successful");
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
          alert('暂时不能创建投票，请稍后再试');
        });
      } else {
        alert('你必须至少填写两个选项！');
      }
    } else {
      alert('你必须填写投票主题！');
    }
    return promise;
  }
  var getmypoll=function(username){
    var deferred = $q.defer();
    var promise = deferred.promise;
    if(username){
      var url = '/mypolls/'+username;
      $http.get(url)
      .success(function(data){
        console.log('in getmypoll, return data=',data)
        deferred.resolve(data);
      })
      .error(function (err) {
        deferred.reject(err);
      });
    }else{
      deferred.reject('Please login first!');
    }
    return promise;
  }
  var getmyvote=function(username){
    var deferred = $q.defer();
    var promise = deferred.promise;
    if(username){
      var url = '/myvotes/'+username;
      $http.get(url)
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function (err) {
        deferred.reject(err);
      });
    }else{
      deferred.reject('Please login first!');
    }
    return promise;
  }
  return {
    getmypoll:getmypoll,
    getmyvote:getmyvote,
    getpoll:getpoll,
    getallpolls:getallpolls,
    savepoll:savepoll
  }
}])
.factory('socket', function($rootScope,$timeout) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $timeout(function(){
          callback.apply(socket, args);
        },0)
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $timeout(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        },0);
      })
    }
  };
});
