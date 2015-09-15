'use strict';

changedApp.controller('NavCtrl', function($scope, $nav){

	// Define nav
	$scope.nav = {

		// Elements
		elements: {

			// Current
			current: null

		}

	};

	// Watch for state change event
	$scope.$on('event:state-change', function($event, state){

		// Loop through the nav service to associate the state with a nav element
		angular.forEach($nav.elements, function(element){

			// Does the state match a navigation element state?
			if(state === element.state){

				// Set the current nav element
				$scope.nav.elements.current = element.name;

			}
			// Is state home?
			else if('home' === state){

				// Set the current nav element
				$scope.nav.elements.current = null;

			}
			else{

				// Does the state match a sub of a navigation element state?
				angular.forEach(element.subs, function(sub){
					if(state === sub){

						// Set the current nav element
						$scope.nav.elements.current = element.name;

					}
				});

			}

		});

	});

});