'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope','$http','$location','$timeout',
  function($scope, $http, $location, $timeout) {
      $scope.loginErrorMsg1 = '';
      $scope.loginErrorMsg2 = '';

    $scope.handleSubmit = function() {
        $scope.submit = function() {
            if($scope.Company && $scope.UserName) {
                $http({
                    method: 'GET',
                    url: 'https://jsonplaceholder.typicode.com/users'
                }).then(function successCallback(response) {
                    angular.forEach(response.data, function(user){
                      if(user.username === $scope.UserName && user.company.name === $scope.Company) {
                          $location.path('/user/'+user.id);
                      }
                      $scope.loginErrorMsg2 = 'Bad user name or company!';
                      $timeout(function(){$scope.loginErrorMsg2=null;},2000)
                    });
                });
            } else {
              $scope.loginErrorMsg1 = 'Please fill in user name and company!';
              $timeout(function(){$scope.loginErrorMsg1=null;},2000)
            }
        };
    };
    $scope.handleSubmit();

}]);