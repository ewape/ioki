var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
	.when('/exercise-1', {
		templateUrl: 'views/exercise-1.html',
		controller: 'ex1Controller'
	})
	.when('/exercise-2', {
		templateUrl: 'views/exercise-2.html',
		controller: 'ex2Controller'
	});
}]);

myApp.directive('sectionheader', function() {
	return {
		restrict: 'AE',
		templateUrl: 'directives/sectionheader.html',
		replace: true
	};
});

myApp.directive('controls', function() {
	return {
		restrict: 'AE',
		templateUrl: 'directives/controls.html',
		replace: true
	};
});

myApp.factory('labels', [function () {
	return {
		'Exercise 1': {
			labels: [
			{
				name: 'Gauge',
				id: 1
			},
			{
				name: 'Chart',
				id: 2
			},
			{
				name: 'Globe',
				id: 3
			},
			{
				name: 'Share',
				id: 4
			},
			{
				name: 'Book',
				id: 5
			},
			{
				name: 'Conversation',
				id: 6
			}
			],
			icons: [
			{
				name: 'Icon_globe2.jpg',
				id: 'Globe'
			},
			{
				name: 'Icon_book.jpg',
				id: 'Book'
			},
			{
				name: 'Icon_share.jpg',
				id: 'Share'
			},
			{
				name: 'Icon_graph.jpg',
				id: 'Chart'
			},

			{
				name: 'Icon_speechBubble2.jpg',
				id: 'Conversation'
			},
			{
				name: 'Icon_gauge.jpg',
				id: 'Gauge'
			},

			]

		},
		'Exercise 2': {
			labels: [
				{
					name: 'Bring learning to life',
					id: 1
				},
				{
					name: 'Establish a common standard',
					id: 2
				},
				{
					name: 'Let talent speak for itself',
					id: 3
				}
				],

			icons: [
			{
				name: 'PE_Bringing_learning_to_life.jpg',
				id: 'Bring learning to life'
			},
			{
				name: 'PE_Reach_a_common_standard.jpg',
				id: 'Establish a common standard'
			},
			{
				name: 'Time_talent_spoke_for_itself.jpg',
				id: 'Let talent speak for itself'
			}
			]
		}
		};
}]);

myApp.controller('appController', ['$scope', '$timeout', '$routeParams', '$log', 'labels',  function($scope, $timeout, $routeParams, $log, labels) {

	$scope.page = $routeParams.page || 1;

	$scope.labels = labels;

	$scope.$watch('labels', function() {
		labels = $scope.labels;
	});

	$scope.formState = {};

	$scope.exercises = ['Exercise 1', 'Exercise 2'];

	$scope.selected = {};

	$scope.selectedCount = {};

	$scope.allSelected = {};

	$scope.selectedOption = {};

	$scope.assignExercises = function() {

		return $scope.exercises.map(function(el) {
			$scope.selected[el] = {};
			$scope.formState[el] = {};
			$scope.formState[el].submitted = false;
			$scope.formState[el].header = 'Label the images';
			$scope.formState[el].button = 'Check answers';
			$scope.formState[el]['class'] = 'btn-success';
			$scope.selectedCount[el] = 0;
			$scope.allSelected[el] = false;

		});

	};

	$scope.formReady = function(name) {
		$scope.formState[name].header = 'Check your answers';
	};

	$scope.formSubmitted = function(name) {
		$scope.formState[name].button = 'Try again';
		$scope.formState[name]['class'] = 'btn-default';
		$('.exercise-item').each(function() {
			var select = $(this).find('select');
			$timeout(function () {
                $(this).find('select').$pristine = true;
            });
		});
	};

	$scope.setExercises = function(name) {
		$scope.selected[name] = {};
		$scope.formState[name].submitted = true;
		$scope.formState[name].header = 'Check your answers';

	};

	$scope.exercisesDone = function(name) {
		$scope.formState[name].button = 'Try again';
		$scope.formState[name]['class'] = 'btn-default';
		$scope.submit = function() {
			document.location.reload(true);
		};
	};

	$scope.assignExercises();

	$scope.updateSelectedCount = function(name, pageId) {
		$scope.selectedCount[name] += 1;

		var currentExercise = '.exercise-' + pageId;
		currentExercise = $(currentExercise);

		var select = currentExercise.find('select');

		if (select.length === $scope.selectedCount[name]) {
			$scope.formReady(name);
		}
	};

	$scope.refreshSelectClasses = function($event) {
		$($event.currentTarget).removeClass('warning');
	};

	$scope.updateSelected = function(index, label, icon, name) {
		$scope.selected[name][index] = {};
		$scope.selected[name][index].icon = icon;
		$scope.selected[name][index].label = label;
		$scope.selectedOption[name] = {};
		$scope.selectedOption[name][index] = {};
		$scope.selectedOption[name][index].label = label;
	};

	$scope.submit = function(pageId, name) {

		var currentExercise = '.exercise-' + pageId;
		currentExercise = $(currentExercise);

		for (var prop in $scope.selected[name]) {

			var field = '.field-' + prop;
			field = $(currentExercise).find(field);
			var select = field.find('select');

			if ($scope.selected[name][prop].icon === $scope.selected[name][prop].label) {
				select.addClass('success');
				select.removeClass('warning');
			}

			else {
				select.addClass('error');
				select.removeClass('warning');
			}

			if (!select.hasClass('ng-pristine')) {
				select.removeClass('warning');
			}

		}

		$('.exercise-item').each(function() {
			var select = $(this).find('select');

			if (select.hasClass('ng-pristine')) {
				select.addClass('warning');
			}

			else {
				select.prop('disabled', true);
			}

		});

		if ($('.warning').length <= 0) {
			$scope.formReady(name);
			$scope.exercisesDone(name);
		}

		else {
			$scope.assignExercises();
		}

	};

}]);

myApp.controller('ex1Controller', ['$scope', '$routeParams', 'labels', function($scope, $routeParams, labels) {
	$scope.name = 'Exercise 1';
	$scope.page = $routeParams.page || 1;

	$scope[$scope.name] = labels[$scope.name];

	$scope.$watch('name', function() {
		labels[$scope.name] = $scope[$scope.name];
	});
}]);

myApp.controller('ex2Controller', ['$scope', '$routeParams', 'labels', function($scope, $routeParams, labels) {
	$scope.name = 'Exercise 2';
	$scope.page = $routeParams.page || 2;

	$scope[$scope.name] = labels[$scope.name];

	$scope.$watch('name', function() {
		labels[$scope.name] = $scope[$scope.name];
	});
}]);






