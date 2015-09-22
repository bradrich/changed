module.exports = function(){
	'use strict';

	return {

		// Enable / disable watching file and executing tests whenever any file changes,
		// this can also be watched from Grunt (so set it to false)
		autoWatch: false,

		// Base path, that will be used to resolve files and excludes
		basePath: '../',

		// Continuous integration mode
		// If true, it captures browsers, run tests and exits
		singleRun: false,

		// Colors
		colors: true,

		// Testing framework to use (jasmine, mocha, qunit...)
		// as well as any additional frameworks (requirejs, chai, sinon...)
		frameworks: [ 'jasmine' ],

		// Reporters, progress is the default reporter
		reporters: [ 'progress', 'coverage' ],

		// Start these browsers, currently available (if karma browser launcher is installed):
		// Possibilities to use (Chrome, ChromeCanary, Firefox, Opera, Safari - only Mac, PhantomJS, IE - only Windows)
		browsers: [ 'PhantomJS', 'Chrome', 'Firefox', 'Safari' ],

		// Uncomment the following lines if you are using Grunt's server to run the tests
		proxies: { '/': 'http://localhost:9001' },
		// URL root prevent conflicts with the site root
		urlRoot: '_karma_',

		// Which plugins to enable
		plugins: [
			'karma-junit-reporter',
			'karma-chrome-launcher',
			'karma-firefox-launcher',
			'karma-phantomjs-launcher',
			'karma-safari-launcher',
			'karma-jasmine',
			'karma-coverage',
			'karma-ng-html2js-preprocessor'
		],

		// Plugin settings
		coverageReporter: {
			// Type of file to output, use text to output to console
			type : 'text',
			// Directory where coverage results are saved
			dir: 'test/coverage/',
			// If type is text or text-summary, you can set the file name
			// file: 'coverage.txt'
		},
		junitReporter: {
			outputFile: 'test-results/junit-results.xml'
		},
		ngHtml2JsPreprocessor: {
			moduleName: 'changedApp.templates'
		},

		// List of files / patterns to load in the browsers
		files: [

			// 3rd party code
			// bower:js
			'bower_components/jquery/dist/jquery.js',
			'bower_components/angular/angular.js',
			'bower_components/angular-animate/angular-animate.js',
			'bower_components/angular-aria/angular-aria.js',
			'bower_components/angular-base64/angular-base64.js',
			'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
			'bower_components/angular-cache-buster/angular-cache-buster.js',
			'bower_components/angular-cookies/angular-cookies.js',
			'bower_components/angular-foundation/mm-foundation-tpls.js',
			'bower_components/br-validations/releases/br-validations.js',
			'bower_components/string-mask/src/string-mask.js',
			'bower_components/angular-input-masks/angular-input-masks-standalone.min.js',
			'bower_components/angular-loading-bar/build/loading-bar.js',
			'bower_components/angular-local-storage/dist/angular-local-storage.js',
			'bower_components/angular-material/angular-material.js',
			'bower_components/angular-messages/angular-messages.js',
			'bower_components/moment/moment.js',
			'bower_components/angular-momentjs/angular-momentjs.js',
			'bower_components/angular-promise-tracker/promise-tracker.js',
			'bower_components/angular-resource/angular-resource.js',
			'bower_components/angular-route/angular-route.js',
			'bower_components/angular-sanitize/angular-sanitize.js',
			'bower_components/angular-touch/angular-touch.js',
			'bower_components/angular-ui-mask/dist/mask.js',
			'bower_components/angular-ui-router/release/angular-ui-router.js',
			'bower_components/angular-ui-scroll/dist/ui-scroll.js',
			'bower_components/angular-ui-scrollpoint/dist/scrollpoint.js',
			'bower_components/angular-ui-event/dist/event.js',
			'bower_components/angular-ui-validate/dist/validate.js',
			'bower_components/angular-ui-indeterminate/dist/indeterminate.js',
			'bower_components/angular-ui-uploader/dist/uploader.js',
			'bower_components/angular-ui-utils/index.js',
			'bower_components/angular-vertilize/angular-vertilize.js',
			'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js',
			'bower_components/fastclick/lib/fastclick.js',
			'bower_components/jquery.cookie/jquery.cookie.js',
			'bower_components/jquery-placeholder/jquery.placeholder.js',
			'bower_components/foundation/js/foundation.js',
			'bower_components/jquery-nicescroll/jquery.nicescroll.js',
			'bower_components/json3/lib/json3.js',
			'bower_components/moment-timezone/builds/moment-timezone-with-data-2010-2020.js',
			'bower_components/ngDialog/js/ngDialog.js',
			'bower_components/gsap/src/uncompressed/TweenMax.js',
			'bower_components/ngFx/dist/ngFx.js',
			'bower_components/lodash/lodash.js',
			'bower_components/restangular/dist/restangular.js',
			'bower_components/watch-once/index.js',
			'bower_components/angular-mocks/angular-mocks.js',
			// endbower

			// App code
			'app/components/global/app.js',
			// '.tmp/templates.js',
			// 'app/components/email/services.js',
			'app/components/footer/controllers.js',
			'app/components/footer/directives.js',
			// 'app/components/forms/controllers.js',
			// 'app/components/forms/directives.js',
			// 'app/components/forms/services.js',
			// 'app/components/global/directives.js',
			// 'app/components/navigation/controllers.js',
			// 'app/components/navigation/directives.js',
			// 'app/components/navigation/services.js',
			// 'app/components/states/config.js',
			// 'app/components/states/controllers.js',
			// 'app/components/utilities/controllers.js',
			// 'app/components/utilities/directives.js',
			// 'app/components/utilities/services.js',
			// 'app/modules/contact-us/controllers.js',
			// 'app/modules/contact-us/directives.js',
			// 'app/modules/contact-us/services.js',
			// 'app/modules/our-work/controllers.js',
			// 'app/modules/our-work/directives.js',
			// 'app/modules/our-work/services.js',
			// 'app/modules/who-we-are/controllers.js',
			// 'app/modules/who-we-are/directives.js',
			// 'app/modules/who-we-are/services.js',

			// App HTML
			// injector:html
			'app/components/footer/templates/footer.html',
			'app/components/navigation/templates/nav-panel.html',
			'app/components/navigation/templates/nav.html',
			'app/modules/contact-us/templates/contact-us.html',
			'app/modules/our-work/templates/our-work.html',
			'app/modules/our-work/templates/work.html',
			'app/modules/who-we-are/templates/brichardson/short-bio.html',
			'app/modules/who-we-are/templates/brichardson/why-changed.html',
			'app/modules/who-we-are/templates/team-member.html',
			'app/modules/who-we-are/templates/who-we-are.html',
			// endinjector

		],

		// List of files / patterns to exclude
		exclude: [],

		// Map of preprocessors that are mostly used for plugins
		preprocessors: {
			'app/components/**/*.html': ['ng-html2js'],
			'app/modules/**/*.html': ['ng-html2js']
		}

	}

};