'use strict';

changedApp.controller('UtilsCtrl', function($rootScope, $utils){

	// Define necessary $rootScope objects
	$rootScope.utils = {

		// Data Storage
		dataStorage: {
			add: function(name, data){ $utils.dataStorage.add(name, data); },
			get: function(name){ return $utils.dataStorage.get(name); },
			remove: function(name){ $utils.dataStorage.remove(name); },
			clearAll: function(){ $utils.dataStorage.clearAll(); }
		},

		// Scroll to anchor
		scrollToAnchor: $utils.scrollToAnchor,

		// Alter names
		alterNames: $utils.alterNames,

		// Common data
		commonData: {}

	};

});