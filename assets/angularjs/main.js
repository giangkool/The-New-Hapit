/**
 * AngularJS Tutorial 1
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 */

/**
 * Main AngularJS Web Application
 */
angular.module('webtab', ['ngRoute','webtab.controller'])
.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/home", {templateUrl: "templates/Home.html", controller: "WebCtrl"})
    // Login
    .when("/login", {templateUrl: "templates/Login.html", controller: "LoginCtrl"})
    // Pages
    // .when("/word", {templateUrl: "partials/word.html", controller:"WordCtrl"})
    
    .otherwise({ redirectTo: '/login' });
}]);

