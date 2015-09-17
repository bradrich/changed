'use strict';

changedApp.directive('whoWeAre', function(){
	return {
		restrict: 'A',
		controller: 'WhoWeAreCtrl'
	};
});