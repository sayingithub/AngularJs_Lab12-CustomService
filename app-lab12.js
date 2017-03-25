/**
 * Created by Niyas on 12/12/2016.
 */

// Include all dependencies required for your app in the array
// Here we want to use the SPA, for which we need Route service.
var angularApp = angular.module('angularApp', ['ngRoute']);


// configure the routing part for Single Page Application
angularApp.config(function($routeProvider){

    $routeProvider

        .when('/main',{
            templateUrl: 'pages/main.html',
            controller: 'mainController'
        })

        .when('/second',{
            templateUrl: 'pages/second.html',
            controller: 'secondController'
        })

        // If we want to pass the query string SPA
        .when('/third/:num',{
            templateUrl: 'pages/third.html',
            controller: 'thirdController'
        })


});


angularApp.controller('mainController', ['$scope','$location','$log',function ($scope, $location, $log) {

    $log.info("This is for information from mainController");
    $log.info($location.path()); // returns the string after the # tag

    $scope.name = "Main";

    // to Proof AngularJS services are singletons.
    // AngularJS will create a singleton $log object and all the controllers will have the same copy
    // the $log.main will be overwrite when calling secondController, thirdController
    $log.main = "Property from main";
    $log.first = "Property from MAIN";
    $log.log($log);

}]);


angularApp.controller('secondController', ['$scope','$location','$log','nameService',function ($scope, $location, $log, nameService) {

    $log.info("This is for information from secondController");
    $log.info($location.path()); // returns the string after the # tag

    $scope.name = "Second";

    // to Proof AngularJS services are singletons.
    // AngularJS will create a singleton $log object and all the controllers will have the same copy
    $log.main = "Property from second";
    $log.second = "Property from SECOND";
    $log.log($log);

    //Custom Service
    $log.log(nameService.empname);
    //$log.log(nameService.namelength());

    $scope.empname = nameService.empname;
    //$scope.emplen = nameService.namelength();

    // Without below watch whatever empname changed in page third won;t be reflected/updated in page second and vice-cersa
    // Please $scope service is not Singleton, but the Custom Service nameService is Singleton
	// specify which variable to watch for changes - 'empname'
    $scope.$watch('empname',function(){
        nameService.empname = $scope.empname;
    });

}]);

// dependency inject your custom services like other  AngularJS services without the $ sign
// make use of the services in your controller's scope (model)
angularApp.controller('thirdController', ['$scope','$location','$log','$routeParams','nameService', function ($scope, $location, $log, $routeParams, nameService) {

    $log.info("This is for information from thirdController");
    $log.info($location.path()); // returns the string after the # tag

    $scope.name = "Third";
    $scope.num = $routeParams.num;


    // to Proof AngularJS services are singletons.
    // AngularJS will create a singleton $log object and all the controllers will have the same copy
    $log.main = "Property from third";
    $log.third = "Property from THIRD";
    $log.log($log);

    //Custom Service
    $log.log(nameService.empname);
    $log.log(nameService.namelength());

    $scope.empname = nameService.empname;

    // Without below watch whatever empname changed in page third won;t be reflected/updated in page second and vice-cersa
    // Please $scope service is not Singleton, but the Custom Service nameService is Singleton
	// specify which variable to watch for changes - 'empname'
    $scope.$watch('empname',function(){
       nameService.empname = $scope.empname;
    });
    $scope.emplen = nameService.namelength();

}]);

// Writing your own Custom Services
// These custom services are Singleton objects by default
angularApp.service('nameService', function(){
   var self = this;
   this.empname = 'John Doe';
   this.namelength = function(){
      // alert("In NameService.")
       return self.empname.length;
   }
});