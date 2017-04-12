
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