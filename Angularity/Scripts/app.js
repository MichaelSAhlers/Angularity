//(function () {
//    // Create Module Outside of Global Namespace
//    var app = angular.module("Angularity", []);

//    var MainController = function ($scope, $http) {
//        //var onUserComplete = function (response) {
//        //    $scope.user = response.data;
//        //};
//        //var onError = function (reason) {
//        //    $scope.error = 'Could not fetch user.';
//        //};
//        //$http.get('https://api.github.com/users/robconery').then(onUserComplete, onError);

//        $scope.message = 'Hello, Angular!';

//        //var person = {
//        //    FirstName: 'Scott',
//        //    LastName: 'Allen',
//        //    ImageSrc: 'http://odetocode.com/Images/scott_allen_2.jpg'
//        //};

//        //$scope.person = person;

//        var onUserComplete = function (response) {
//            $scope.user = response.data;
//        };

//        var onError = function(reason) {
//            $scope.error = 'Could not fetch the user';
//        }

//        /// $http Service: GET, POST, PUT, DELETE
//        // Can ask for $http inside of a controller to get a "promise"
//        $http.get('https://api.github.com/users/MichaelSAhlers')
//            .then(onUserComplete, onError);

//        // GitHub API
//    };

//    // Add the Controller to the Module
//    // Can pass in an array to tell the Controller what $scope and $http are (alias)
//    // , ['$scope', '$http', MainController]
//    app.controller("MainController", MainController);
//}());

//// Module 4
// Directives: 50 with Angular core, lots more with open source projects
//(function () {
//    // Create Module Outside of Global Namespace
//    var app = angular.module("Angularity", []);

//    var MainController = function ($scope, $http) {

//        var onUserComplete = function (response) {
//            $scope.user = response.data;
//            $http.get($scope.user.repos_url)
//                .then(onRepos, onError);
//        };

//        var onRepos = function (response) {
//            $scope.repos = response.data;
//        };

//        var onError = function (reason) {
//            $scope.error = 'Could not fetch the user';
//        }

//        //$http.get('https://api.github.com/users/MichaelSAhlers')
//        //    .then(onUserComplete, onError);
//        $scope.search = function (username) {
//            $http.get('https://api.github.com/users/' + username)
//                .then(onUserComplete, onError);
//        };

//        $scope.username = "Angular";
//        $scope.message = 'GitHub Viewer';

//        // Control Sort Order of Repos on Page (+/- = ASC/DESC)
//        $scope.repoSortOrder = '-stargazers_count';
//    };

//    app.controller("MainController", MainController);
//}());

//// Module 5
(function () {
    // Create Module Outside of Global Namespace
    var app = angular.module('Angularity', []);


    // $timeout = setTimeout, $interval = setInterval
    var MainController = function ($scope, $http, $interval) {

        var onUserComplete = function (response) {
            $scope.user = response.data;
            $http.get($scope.user.repos_url)
                .then(onRepos, onError);
        };

        var onRepos = function (response) {
            $scope.repos = response.data;
        };

        var onError = function (reason) {
            $scope.error = 'Could not fetch the user';
        };

        var decrementCountdown = function () {
            $scope.countdown -= 1;
            if ($scope.countdown < 1) {
                $scope.search($scope.username);
            };
        };

        var startCountdown = function () {
            $interval(decrementCountdown, 1000, $scope.countdown); // Decrement every 1 second 5 times
        };

        $scope.search = function (username) {
            $http.get('https://api.github.com/users/' + username)
                .then(onUserComplete, onError);
        };

        $scope.username = "Angular";
        $scope.message = 'GitHub Viewer';

        // Control Sort Order of Repos on Page (+/- = ASC/DESC)
        $scope.repoSortOrder = '-stargazers_count';
        $scope.countdown = 5;
        startCountdown();
    };

    app.controller('MainController', MainController);
}());