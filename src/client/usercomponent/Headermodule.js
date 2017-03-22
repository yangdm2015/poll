polls1.controller('ModalHeaderCtrl', ['userservice','$uibModal','$rootScope','socket','messageService',function (userservice,$uibModal,$rootScope,socket,messageService) {
  var $ctrl = this;
  $ctrl.animationsEnabled = true;
  userservice.getUserStatus()
  .then(function(re){
    var result=re.data
    if(result.status){
      $ctrl.islogin = true;
      $ctrl.curraccount = result.account;
    }else{
       $ctrl.islogin=false;
    }
  })

  $ctrl.select=function(){
    messageService.publish('query4question',{query:$ctrl.query})
  }

  $ctrl.logout=function(){
      userservice.signout()
      .then(function(re){
        var result=re.data
        if(result.status){
          $ctrl.islogin = false;
          $ctrl.currusername = '';
        }
      })
  }

  $ctrl.loginmodalopen = function () {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      templateUrl: 'LoginModalContent',
      controller: 'LoginModalInstanceCtrl',
      controllerAs: '$ctrl'
    });

    modalInstance.result.then(function (account) {
      socket.emit('userchange',{islogin:true,account:account})
      $ctrl.islogin = true;
      $ctrl.curraccount = account;
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };



  $ctrl.registermodalopen = function () {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      templateUrl: 'registerModalContent',
      controller: 'registerModalInstanceCtrl',
      controllerAs: '$ctrl'
    });

    modalInstance.result.then(function (account) {

      $ctrl.islogin = true;
      $ctrl.curraccount = account;
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };
}]);

polls1.controller('registerModalInstanceCtrl', ['$uibModalInstance','userservice','$q',function ($uibModalInstance,userservice,$q) {
  var $ctrl = this;
  $ctrl.autologin=true;
  $ctrl.alerts = []
  $ctrl.addAlert = function(m) {
    $ctrl.alerts.push({msg:m});
  };
  $ctrl.closeAlert = function(index) {
    $ctrl.alerts.splice(index, 1);
  };


  $ctrl.ok = function () {
    userservice.signup({account:$ctrl.account,password:$ctrl.password})
    .then(function(re){
      var deferred = $q.defer();
      var promise = deferred.promise;
      var result = re.data;
      if(result.status=='ok'){
        if($ctrl.autologin){
          return userservice.signin({account:$ctrl.account,password:$ctrl.password})
        }else{
          deferred.reject('tologin')
        }
      }else if(result.status =='exist'){
        deferred.reject('exist')
      }
      return promise;
    })
    .then(function(re){
      var result = re.data;
      if(result.status=='ok'){
        $uibModalInstance.close($ctrl.account);
      }else if(result.status=='wrongpass'){
        $ctrl.addAlert("Invalid username and/or password. 用户名/密码不对")
      }else if(result.status=='notexist'){
        $ctrl.addAlert('User '+$ctrl.account+' does not exist. 用户'+$ctrl.account+'不存在')
      }
    })
    .catch(function(err){
      if(err=='tologin'){
        $uibModalInstance.dismiss('cancel');
      }else{
        $ctrl.addAlert('User "'+$ctrl.account+'" alrady exist! 用户 '+$ctrl.account+' 已存在')
      }
      console.log(err)
    });
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);


polls1.controller('LoginModalInstanceCtrl', ['$uibModalInstance','userservice',function ($uibModalInstance,userservice) {
  var $ctrl = this;

  /*$ctrl.alerts = [{ type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' }]*/
  $ctrl.alerts = []
  $ctrl.addAlert = function(m) {
    $ctrl.alerts.push({msg:m});
  };
  $ctrl.closeAlert = function(index) {
    $ctrl.alerts.splice(index, 1);
  };


  $ctrl.ok = function () {
    userservice.signin({account:$ctrl.account,password:$ctrl.password})
    .then(function(re){
      var result = re.data;
      if(result.status=='ok'){
        $uibModalInstance.close($ctrl.account);
      }else if(result.status=='wrongpass'){
        $ctrl.addAlert("Invalid username and/or password. 用户名/密码不对")
      }else if(result.status=='notexist'){
        $ctrl.addAlert('User '+$ctrl.account+' does not exist. 用户'+$ctrl.account+'不存在')
      }
    })
    .catch(function(err){
      console.log(err)
    });
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);

polls1.controller('AlertDemoCtrl', function ($scope) {
})

