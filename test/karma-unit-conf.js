var sharedConfig = require('./karma-shared-conf');

module.exports = function(config){
	var conf = sharedConfig();

	// Combine files configurations
	conf.files = conf.files.concat([

		// Tests
		// injector:js
		'app/components/footer/controllers.unit-spec.js',
		'app/components/footer/directives.unit-spec.js',
		// endinjector

	]);

	config.set(conf);
};