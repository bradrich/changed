'use strict';

describe('Directive: footer', function(){

	// Load the app's module
	beforeEach(module('changedApp'));

	// Load the footer template
	beforeEach(module('changedApp.templates'));

	// Necessities
	var scope, element;

	// Initialize directive starting point
	beforeEach(inject(function($rootScope, $compile){
		element = angular.element('<footer></footer>');
		scope = $rootScope;
		$compile(element)(scope);
		scope.$digest();
	}));

	it('should replace element with proper html template', function(){
		var footerContainer = element.find('.footer-container');
		var footerInterior = element.find('.footer');

		expect(footerContainer.length).toBe(1);
		expect(footerInterior.length).toBe(1);
	});

});