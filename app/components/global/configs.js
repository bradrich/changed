'use strict';

// Configure Cache Buster
changedApp.config(function(httpRequestInterceptorCacheBusterProvider){
	httpRequestInterceptorCacheBusterProvider.setMatchlist([/.*template.*/,/.*bower.*/,/.*css.*/,/.*images.*/,/.*modules.*/,/.*components.*/,/.*twitter.*/]);
});

// Configure IE fix for form handling
changedApp.config(['$provide', function($provide){
	$provide.decorator('$sniffer', ['$delegate', function($sniffer){
		var msie = angular.lowercase(navigator.userAgent).indexOf('trident') > -1 || angular.lowercase(navigator.userAgent).indexOf('msie') > -1;
		var _hasEvent = $sniffer.hasEvent;
		$sniffer.hasEvent = function(event){
			if(event === 'input' && msie){ return false; }
			_hasEvent.call(this, event);
		};
		return $sniffer;
	}]);
}]);

// Configure angular loading bar
changedApp.config(function(cfpLoadingBarProvider) {
	cfpLoadingBarProvider.includeSpinner = false;
});