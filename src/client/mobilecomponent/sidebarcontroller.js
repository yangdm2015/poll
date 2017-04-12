
polls1.directive('dragMe', ['$drag',function($drag){
      return {
        link: function(scope, $element) {
          var transtmp;
          $drag.bind($element,
              {
                transform: function(element, transform, touch) {
                  if(transtmp){
                    transform.translateX = (transtmp.translateX+touch.distanceX)*1;
                    transform.translateY = (transtmp.translateY+touch.distanceY)*1;
                  }else{
                    transform.translateX = touch.distanceX;
                    transform.translateY = touch.distanceY;
                  }
                  return transform;
                },
                end: function(drag) {
                  transtmp = drag.transform
                }}
          );
        }
      };
    }]);
angular.module("ngTouch", [])
.directive("ngTouchstart", function () {
  return {
    controller: ["$scope", "$element", function ($scope, $element) {

      $element.bind("touchstart", onTouchStart);
      function onTouchStart(event) {
        var method = $element.attr("ng-touchstart");
        $scope.$apply(method);
      }

    }]
  }
})
.directive("ngTouchmove", function () {
  return {
    controller: ["$scope", "$element", function ($scope, $element) {

      $element.bind("touchstart", onTouchStart);
      function onTouchStart(event) {
        event.preventDefault();
        $element.bind("touchmove", onTouchMove);
        $element.bind("touchend", onTouchEnd);
      }
      function onTouchMove(event) {
        var method = $element.attr("ng-touchmove");
        $scope.$apply(method);
      }
      function onTouchEnd(event) {
        event.preventDefault();
        $element.unbind("touchmove", onTouchMove);
        $element.unbind("touchend", onTouchEnd);
      }

    }]
  }
})
.directive("ngTouchend", function () {
  return {
    controller: ["$scope", "$element", function ($scope, $element) {

      $element.bind("touchend", onTouchEnd);
      function onTouchEnd(event) {
        var method = $element.attr("ng-touchend");
        $scope.$apply(method);
      }

    }]
  }
});

polls1.directive("chsheadimg", function () {
  return {
    replace:true,
    scope:{
      user:"=u",
      dddds:'=headpicsrc'
    },
    templateUrl: 'pages/templates/chsheadimg.html',
    link: function (scope, element, attributes) {
      var img = element[0].querySelector('img');
      var ipt = element[0].querySelector('input');
      img.onclick=function(e){
        ipt.click()
      }
      element.bind('change',function(changeEvent){
        scope.user.headpic=ipt.files[0];
        showpic(changeEvent,scope)
        function showpic(changeEvent,scope){
          var reader = new FileReader();
          reader.onload = function (loadEvent) {
            scope.$apply(function () {
              img.src = loadEvent.target.result;
            });
          }
          reader.readAsDataURL(changeEvent.target.files[0]);
        }
      })
    }
  }
})
polls1.directive("backToTop", function () {
    return {
      restrict: "E",
      link: function (scope, element, attr) {
        var e = element;
        e[0].onclick=function(e){
          console.log('sdfsaf')
        }


        e[0].onclick=function () {
          angular.element(document).find('body').animate({         //添加animate动画效果
            scrollTop: 0
          }, 500);
        };
      }
    };
  })


polls1.directive("filefrominput", function () {
  return {
    replace:true,
    scope: {
      fileread: "=",
      dddds:"=tpl",
      changeimgurl:"&ciu"
    },
    templateUrl: 'pages/templates/filefrominput.html',
    link: function (scope, element, attributes) {
      var btn =  element[0].querySelector('button');
      var span =  element[0].querySelector('span');
      var ipt = element[0].querySelector('input')
      var img = element[0].querySelector('img');
      span.onclick=function(){
        console.log('hello!')
        ipt.click();
      }
      element.bind('change',function(changeEvent){
        scope.fileread.file=element[0].querySelector('input').files[0];
        showpic(changeEvent,scope)
        function showpic(changeEvent,scope){
          var reader = new FileReader();
          reader.onload = function (loadEvent) {
            img.src=loadEvent.target.result
          }
          reader.readAsDataURL(changeEvent.target.files[0]);
        }
      })
    }
  }
})
.directive("multiimgup",function(){
  function link(scope,element,attrs){
    scope.name = 'Jeff';
    var img=element.find('img')[0]
    var span=element.find('span')
    var ipt = element.find('input')[0]
    element.children()[0].onclick=function(e){
      ipt.click()
    }

    element.bind('change',function(changeEvent){
      var file=ipt.files[0];
      scope.c[attrs.idx].file=file;
      if(file){
        span.css('display','none')
        showpic(img);
      }
      function showpic(img){
        var reader = new FileReader();
        reader.onload=function(loadEvent){
          img.src=loadEvent.target.result;
        }
        reader.readAsDataURL(ipt.files[0]);
      }
    })
  }
  return{
    link:link,
    transclude: true,
    scope: {
      'index':'@idx',
      'c':'=chos'
    },
    templateUrl:'pages/templates/mbchoiceimg.html'
  }
})

polls1.service('messageService', ['$rootScope', function($rootScope) {
  return {
    publish: function(name, parameters) {
      $rootScope.$emit(name, parameters);
    },
    subscribe: function(name, listener) {
      $rootScope.$on(name, listener);
    }
  };
}]);