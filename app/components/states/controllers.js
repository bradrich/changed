'use strict';

changedApp.controller('StateCtrl', function($scope, $state){

	// Define state
	$scope.state = {

		// Initialize
		init: function(){

			// Watch the current state and emit the new state
			$scope.$watch('state.current', function(newState){
				if(newState){ $scope.$emit('event:state-change', newState.name); }
			});

		},

		// Necessities
		service: $state,

		// Current
		current: $state.current

	};

	// Initialize state
	$scope.state.init();

});