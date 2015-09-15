'use strict';

changedApp.controller('WhoWeAreCtrl', function($scope, $we){

	// Define we
	$scope.we = {

		// Team
		team: angular.copy($we.team)

	};

});

changedApp.controller('TeamMemberCtrl', function($scope, $we, $stateParams){

	// Define team member
	$scope.teamMember = {

		// Initialize
		init: function(){

			// Watch the current state
			$scope.$watch('state.current', function(newState){
				if('teamMember' === newState.name){

					// Loop through all team members
					angular.forEach($we.team, function(member){
						if(member.id === $stateParams.memberId){
							$scope.teamMember.current = member;
						}
					});

				}
			});

		},

		// Current
		current: null

	};

	// Initialize team member
	$scope.teamMember.init();

});