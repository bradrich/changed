'use strict';

changedApp.config([
	'$urlRouterProvider',
	'$stateProvider',
function ($urlRouterProvider, $stateProvider){

	// For any unmatched url, redirect to /
	$urlRouterProvider.otherwise('/');

	// State configuration that powers the router
	$stateProvider
		.state('main', {
			url: '/',
			// templateUrl: 'components/states/templates/state.html',
			controller: 'StateCtrl'
		});

}]);