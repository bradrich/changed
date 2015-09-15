'use strict';

changedApp.controller('OurWorkCtrl', function($scope, $work){

	// Define work
	$scope.work = {

		// Data
		data: angular.copy($work.data)

	};

});