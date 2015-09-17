'use strict';

changedApp.controller('OurWorkCtrl', function($scope, $work, $stateParams, filterFilter){

	// Define work
	$scope.work = {

		// Initialize
		init: function(){

			// Watch the current state
			$scope.$watch('state.current', function(newState){
				if('work' === newState.name){

					// Loop through all of the work items
					angular.forEach($work.data, function(item){
						if(item.id === $stateParams.workId){
							$scope.work.current = item;
							$scope.work.current.pagination = {};
							$scope.work.current.pagination.index = parseInt($stateParams.index);
							$scope.work.current.pagination.skill = $stateParams.skill;
							$scope.work.items = filterFilter($scope.work.items, $stateParams.skill);
						}
					});

				}
			});

		},

		// Items
		items: angular.copy($work.data),

		// Current selected item
		current: null

	};

	// Initialize work
	$scope.work.init();

});