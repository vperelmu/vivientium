'use strict';

var TagMapper = {
	'bug': 'badge badge-danger',
	'issue': 'badge badge-warning'
};

function getTagClass(tag) {
	return TagMapper[tag] || 'badge badge-info';
}

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/'});
}]);
