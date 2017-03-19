// Angular module, defining routes for the app
/*var polls1 = angular.module('polls', ['ngRoute','pollServices']).*/
var polls1 = angular.module('polls', ['ngRoute','ngAnimate', 'ngSanitize', 'ui.bootstrap']).
  config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
    .when('/polls', { templateUrl: 'pages/partials/list.html', controller: 'PollListCtrl',access:{restricted:false} })
    .when('/mypolls', { templateUrl: 'pages/partials/list.html', controller: 'MyPollListCtrl',access:{restricted:false} })
    .when('/myvotes', { templateUrl: 'pages/partials/list.html', controller: 'MyVoteListCtrl',access:{restricted:false} })
    .when('/poll/:pollId', { templateUrl: 'pages/partials/item.html', controller: 'PollItemCtrl',access:{restricted:false} })
    .when('/new', { templateUrl: 'pages/partials/new.html', controller: 'PollNewCtrl',access:{restricted:false} })
    .when('/login', { templateUrl: 'pages/partials/login.html', controller: 'UserCtrl',access:{restricted:false} })
    .when('/register', { templateUrl: 'pages/partials/register.html', controller: 'UserCtrl',access:{restricted:false} })
    .otherwise({ redirectTo: '/polls' });
  }]);

polls1.run(function ($rootScope, $location, $route, userservice) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      userservice.getUserStatus()
      .then(function(re){
        var result =re.data
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