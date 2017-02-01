'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/user/:id', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope','$http','$routeParams',
    function($scope, $http, $routeParams) {
        $scope.display = 'display: block';
        $scope.names = [];

        $scope.getAlbumsById = function() {
            $http({
                method: 'GET',
                url: 'https://jsonplaceholder.typicode.com/albums?userId='+$routeParams.id
            }).then(function successCallback(response) {
                $scope.display = 'display: none';
                var arr=[];
                angular.forEach(response.data, function(album){
                    arr.push(album);
                });
                $scope.names = arr;
            });
        };
        $scope.getAlbumsById();

        $scope.changedValue = function(albumId){
            $scope.display = 'display: block';
            console.log(albumId);
            $http({
                method: 'GET',
                url: 'https://jsonplaceholder.typicode.com/photos?albumId='+albumId
            }).then(function successCallback(response) {
                $scope.tmpArr = [];
                angular.forEach(response.data, function(photo, i){
                    $scope.display = 'display: none';
                    $scope.tmpArr.push(photo);
                });
            });
        }
}]);