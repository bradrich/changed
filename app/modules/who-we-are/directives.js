'use strict';

changedApp.directive('whoWeAre', function(){
	return {
		restrict: 'A',
		controller: 'WhoWeAreCtrl'
	};
});

changedApp.directive('teamMember', function(){
	return {
		restrict: 'A',
		controller: 'TeamMemberCtrl'
	};
});