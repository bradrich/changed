'use strict';
/* exported changedApp */

var changedApp = angular.module('changedApp', [
	'ngAnimate',
	'ngAria',
	'ngCookies',
	'ngSanitize',
	'ngTouch',
	'ngCacheBuster',
	'ngDialog',
	'ngMessages',
	'ngFx',
	'angular-momentjs',
	'LocalStorageModule',
	'ui.utils',
	'ui.router',
	'ui.bootstrap.tpls',
	'ui.bootstrap.datepicker',
	'ui.bootstrap.timepicker',
	'ui.bootstrap.pagination',
	'ui.bootstrap.dropdown',
	'ui.bootstrap.tooltip',
	'ui.mask',
	'ui.utils.masks',
	'angular-loading-bar',
	'ajoslin.promise-tracker',
	'restangular',
	'angular.vertilize'
])

// Configure Cache Buster
.config(function(httpRequestInterceptorCacheBusterProvider){
	httpRequestInterceptorCacheBusterProvider.setMatchlist([/.*template.*/,/.*bower.*/,/.*css.*/,/.*images.*/,/.*modules.*/,/.*components.*/]);
})

// Configure IE fix for form handling
.config(['$provide', function($provide){
	$provide.decorator('$sniffer', ['$delegate', function($sniffer){
		var msie = angular.lowercase(navigator.userAgent).indexOf('trident') > -1 || angular.lowercase(navigator.userAgent).indexOf('msie') > -1;
		var _hasEvent = $sniffer.hasEvent;
		$sniffer.hasEvent = function(event){
			if(event === 'input' && msie){ return false; }
			_hasEvent.call(this, event);
		};
		return $sniffer;
	}]);
}])

// Configure angular loading bar
.config(function(cfpLoadingBarProvider) {
	cfpLoadingBarProvider.includeSpinner = false;
})

// Initialize app
.run(function($document){

	// Initialize Foundation
	$document.foundation();

	// Initialize Frame Busting
	if(self === top){
		var theBody = document.getElementsByTagName('body')[0];
		theBody.style.display = 'block';
	}
	else{ top.location = self.location; }

});