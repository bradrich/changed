'use strict';

changedApp.directive('navPanel', function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'components/navigation/templates/nav-panel.html',
		controller: 'NavCtrl'
	};
});

// changedApp.directive('navMain', function(){
// 	return {
// 		restrict: 'E',
// 		replace: true,
// 		templateUrl: 'components/navigation/templates/nav.html',
// 		controller: 'NavCtrl'
// 	};
// });

// changedApp.directive('navHamburger', function(){
// 	return {
// 		restrict: 'E',
// 		replace: true,
// 		templateUrl: 'components/navigation/templates/nav-hamburger.html',
// 		link: function(scope, element, attrs){

// 			// Handle nav-hamburger click event
// 			element.on('click', function(){

// 				// Add or remove close class from nav-hamburger element
// 				element.toggleClass('close');

// 				// Add or remove collapsed class from nav-main element
// 				$('.nav-main').toggleClass('collapsed');

// 			});

// 		}
// 	};
// });