// Angular module, defining routes for the app
/*var polls1 = angular.module('polls', ['ngRoute','pollServices']).*/
var polls1 = angular.module('polls', ['ngRoute']).
  config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    .when('/polls', { templateUrl: 'public/partials/list.html', controller: 'PollListCtrl',access:{restricted:false} })
    .when('/mypolls', { templateUrl: 'public/partials/list.html', controller: 'MyPollListCtrl',access:{restricted:false} })
    .when('/myvotes', { templateUrl: 'public/partials/list.html', controller: 'MyVoteListCtrl',access:{restricted:false} })
    .when('/poll/:pollId', { templateUrl: 'public/partials/item.html', controller: 'PollItemCtrl',access:{restricted:false} })
    .when('/new', { templateUrl: 'public/partials/new.html', controller: 'PollNewCtrl',access:{restricted:false} })
    .when('/login', { templateUrl: 'public/partials/login.html', controller: 'UserCtrl',access:{restricted:false} })
    .when('/register', { templateUrl: 'public/partials/register.html', controller: 'UserCtrl',access:{restricted:false} })
    .otherwise({ redirectTo: '/polls' });
  }]);

polls1.run(function ($rootScope, $location, $route, userservice) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      userservice.getUserStatus()
      .then(function(result){
        if(next.access!=null){
          if (next.access.restricted && !result.islogin){
            console.log("reload!!!!!!!!!!!!!!")
            $location.path('/login');
            $route.reload();
          }
        }
      });
  });
});