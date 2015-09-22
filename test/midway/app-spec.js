describe('Midway: Testing Modules', function(){
	describe('changedApp Module:', function(){

		var module;
		before(function(){
			module = angular.module('changedApp');
		});

		it('should be registered', function(){
			expect(module).not.to.equal(null);
		});

		describe('Dependencies', function(){

			var dependencies;
			var hasModule = function(m){
				return dependencies.indexOf(m) >= -1;
			};
			before(function(){
				dependencies = module.value('appName').requires;
			});

			// You can, and should, also test the module's dependencies
			it('should have ngAnimate as a dependency', function(){
				expect(hasModule('ngAnimate')).to.equal(true);
			});
			it('should have ngAria as a dependency', function(){
				expect(hasModule('ngAria')).to.equal(true);
			});
			it('should have ngCookies as a dependency', function(){
				expect(hasModule('ngCookies')).to.equal(true);
			});
			it('should have ngSanitize as a dependency', function(){
				expect(hasModule('ngSanitize')).to.equal(true);
			});
			it('should have ngTouch as a dependency', function(){
				expect(hasModule('ngTouch')).to.equal(true);
			});
			it('should have ngCacheBuster as a dependency', function(){
				expect(hasModule('ngCacheBuster')).to.equal(true);
			});
			it('should have ngDialog as a dependency', function(){
				expect(hasModule('ngDialog')).to.equal(true);
			});
			it('should have ngMessages as a dependency', function(){
				expect(hasModule('ngMessages')).to.equal(true);
			});
			it('should have ngFx as a dependency', function(){
				expect(hasModule('ngFx')).to.equal(true);
			});
			it('should have angular-momentjs as a dependency', function(){
				expect(hasModule('angular-momentjs')).to.equal(true);
			});
			it('should have LocalStorageModule as a dependency', function(){
				expect(hasModule('LocalStorageModule')).to.equal(true);
			});
			it('should have ui.utils as a dependency', function(){
				expect(hasModule('ui.utils')).to.equal(true);
			});
			it('should have ui.router as a dependency', function(){
				expect(hasModule('ui.router')).to.equal(true);
			});
			it('should have ui.bootstrap.tpls as a dependency', function(){
				expect(hasModule('ui.bootstrap.tpls')).to.equal(true);
			});
			it('should have ui.bootstrap.datepicker as a dependency', function(){
				expect(hasModule('ui.bootstrap.datepicker')).to.equal(true);
			});
			it('should have ui.bootstrap.timepicker as a dependency', function(){
				expect(hasModule('ui.bootstrap.timepicker')).to.equal(true);
			});
			it('should have ui.bootstrap.pagination as a dependency', function(){
				expect(hasModule('ui.bootstrap.pagination')).to.equal(true);
			});
			it('should have ui.bootstrap.dropdown as a dependency', function(){
				expect(hasModule('ui.bootstrap.dropdown')).to.equal(true);
			});
			it('should have ui.bootstrap.tooltip as a dependency', function(){
				expect(hasModule('ui.bootstrap.tooltip')).to.equal(true);
			});
			it('should have ui.mask as a dependency', function(){
				expect(hasModule('ui.mask')).to.equal(true);
			});
			it('should have ui.utils.masks as a dependency', function(){
				expect(hasModule('ui.utils.masks')).to.equal(true);
			});
			it('should have angular-loading-bar as a dependency', function(){
				expect(hasModule('angular-loading-bar')).to.equal(true);
			});
			it('should have angular.promise-tracker as a dependency', function(){
				expect(hasModule('angular.promise-tracker')).to.equal(true);
			});
			it('should have restangular as a dependency', function(){
				expect(hasModule('restangular')).to.equal(true);
			});
			it('should have angular.vertilize as a dependency', function(){
				expect(hasModule('angular.vertilize')).to.equal(true);
			});
			it('should have base64 as a dependency', function(){
				expect(hasModule('base64')).to.equal(true);
			});

		});

	});
});