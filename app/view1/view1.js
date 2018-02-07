'use strict';

angular.module('myApp.view1', ['ngRoute', 'dataService'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'view1/view1.html',
			controller: 'ListController'
		});
}])

.controller('ListController', function($scope, dataService) {
	$scope.tags = dataService.getAllTags();
	$scope.data = dataService.getAllData();
	$scope.activeTag = 'All';

	$scope.isActive = function (item) {
		return 'nav-link' + (item === $scope.activeTag ? ' active' : '');
	};

	$scope.setActiveTag = function (tagName) {
		$scope.activeTag = tagName;

		if (tagName === 'All') {
			$scope.data = dataService.getAllData();
		}
		else {
			$scope.data = dataService.getDataByTag(tagName);
		}
	};

	$scope.getTagClass = getTagClass;
});