module.exports = function(){
	'use strict';

	return {

		// Location of the E2E test specs
		specs: [ 'test/e2e/**/*.js' ],

		// Configure multiple browsers to run tests
		multiCapabilities: [
			{ 'browserName': 'firefox' },
			{ 'browserName': 'chrome' },
			{ 'browserName': 'safari' }
		],

		// Or configure a single browser
		// capabilities: { 'browserName': 'chrome' },

		// URL where your app is running, relative URLs are prepending with this URL
		baseUrl: 'http://localhost:9001',

		// Testing framework, jasmine is the default
		framework: 'jasmine'

	}

};