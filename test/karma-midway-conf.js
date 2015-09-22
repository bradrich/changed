var sharedConfig = require('./karma-shared-conf');

module.exports = function(config){
	var conf = sharedConfig();

	// Combine files configurations
	conf.files = conf.files.concat([

		// Extra testing code
		'node_modules/ng-midway-tester/src/ngMidwayTester.js',

		// Test files
		// injector:js
		// endinjector

	]);

	// Set needed proxies
	conf.proxies = {
		'/': 'http://localhost:9999/'
	};

	config.set(conf);
};