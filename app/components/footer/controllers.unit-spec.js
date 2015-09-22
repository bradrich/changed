'use strict';

describe('Controller: FooterCtrl', function(){

	// Load the app's module
	beforeEach(module('changedApp'));

	// Necessities
	var FooterCtrl, scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function($controller, $rootScope){
		scope = $rootScope.$new();
		FooterCtrl = $controller('FooterCtrl', {
			$scope: scope
		});
	}));

	it('should be defined', function(){
		expect(FooterCtrl).toBeDefined();
	});

	it('should have a parameter of footer that is defined', function(){
		expect(scope.footer).toBeDefined();
	});

	it('should have a parameter of footer that is an empty object', function(){
		var x = {};
		expect(scope.footer).toEqual(x);
	});

});