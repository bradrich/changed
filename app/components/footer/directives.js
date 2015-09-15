'use strict';

changedApp.directive('footer', function(){
	return {
		restrict: 'E',
		templateUrl: 'components/footer/templates/footer.html',
		replace: true,
		controller: 'FooterCtrl'
	};
});