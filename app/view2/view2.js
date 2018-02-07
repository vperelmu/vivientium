'use strict';

var app = angular.module('myApp.view2', ['ngRoute', 'dataService']);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
  		.when('/issue', {
    		templateUrl: 'view2/view2.html',
    		controller: 'IssueViewController'
  		})
		.when('/issue/:issue', {
			templateUrl: 'view2/view2.html',
			controller: 'IssueViewController'
		});
}]);

app.controller('IssueViewController', function($scope, $routeParams, $sce, dataService) {
	$scope.issue = $routeParams.issue;
	$scope.data = dataService.getDataById($routeParams.issue);
	$scope.isEditingText = false;

	$scope.getTagClassFloat = function(tag) {
		return getTagClass(tag) + ' float-right';
	}

	$scope.editIssue = function() {
		$scope.text = $scope.data.text;
		$scope.isEditingText = true;
	}

	$scope.saveIssueChanges = function() {
		$scope.isEditingText = false;
	}

	$scope.cancelEditIssue = function() {
		$scope.isEditingText = false;
		$scope.data.text = $scope.text;
	}

	$scope.addComment = function() {
		$scope.data.comments.push($scope.newComment);
		$scope.newComment = '';
	}
});

app.directive('myDirective', function () {
	return {
		restrict: 'A',
		scope: {
			myDirective: '='
		},
		link: function (scope, element, attrs) {
			element.val(scope.myDirective);
			element.data('old-value', scope.myDirective);

			scope.$watch('myDirective', function (val) {
				element.val(scope.myDirective);
			});

			element.bind('propertychange keyup paste', function (blurEvent) {
				if (element.data('old-value') != element.val()) {
					scope.$apply(function () {
						scope.myDirective = element.val();
						element.data('old-value', element.val());
					});
				}
			});
		}
	};
});

app.filter("trust", ['$sce', function($sce) {
  return function(html){
  	var el = document.createElement('div');
	el.innerHTML = html;

	var scripts = el.getElementsByTagName('script');
	var len = scripts.length;

	while (len--) {
		scripts[len].parentNode.removeChild(scripts[len])
	}

    return $sce.trustAsHtml(el.innerHTML);
  }
}]);
