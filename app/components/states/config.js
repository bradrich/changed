'use strict';

changedApp.config([
	'$urlRouterProvider',
	'$stateProvider',
function ($urlRouterProvider, $stateProvider){

	// For any unmatched url, redirect to /
	$urlRouterProvider.otherwise('/');

	// State configuration that powers the router
	$stateProvider
		.state('home', {
			url: ''
		})
		// Who We Are
		.state('whoWeAre', {
			url: '/who-we-are',
			templateProvider: function($templateCache){ return $templateCache.get('modules/who-we-are/templates/who-we-are.html'); },
			controller: 'StateCtrl'
		})
		.state('teamMember', {
			url: '/who-we-are/:memberId?index',
			templateProvider: function($templateCache){ return $templateCache.get('modules/who-we-are/templates/team-member.html'); },
			controller: 'StateCtrl'
		})
		// Our Work
		.state('ourWork', {
			url: '/our-work',
			templateProvider: function($templateCache){ return $templateCache.get('modules/our-work/templates/our-work.html'); },
			controller: 'StateCtrl'
		})
		.state('work', {
			url: '/our-work/:workId?skill&index',
			templateProvider: function($templateCache){ return $templateCache.get('modules/our-work/templates/work.html'); },
			controller: 'StateCtrl'
		})
		// Contact Us
		.state('contactUs', {
			url: '/contact-us',
			templateProvider: function($templateCache){ return $templateCache.get('modules/contact-us/templates/contact-us.html'); },
			controller: 'StateCtrl'
		});

}]);