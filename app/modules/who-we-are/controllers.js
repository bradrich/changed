'use strict';

changedApp.controller('WhoWeAreCtrl', function($scope, $we, $stateParams){

	// Define we
	$scope.we = {

		// Initialize
		init: function(){

			// Watch the current state
			$scope.$watch('state.current', function(newState){
				if('teamMember' === newState.name){

					// Loop through all team members
					angular.forEach($we.team, function(member){
						if(member.id === $stateParams.memberId){
							$scope.we.current = member;
							$scope.we.current.pagination = {};
							$scope.we.current.pagination.index = parseInt($stateParams.index);
						}
					});

				}
			});

		},

		// Team members
		team: angular.copy($we.team),

		// Current selected member
		current: null

	};

	// Initialize we
	$scope.we.init();

});