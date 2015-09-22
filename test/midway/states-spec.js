describe('Midway: Testing States', function(){

	var tester;
	beforeEach(function(){
		tester = ngMidwayTester('changedApp');
	});

	afterEach(function(){
		tester.destroy();
		tester = null;
	});

	beforeEach(module('ui-router'));

	var state;
	beforeEach(inject(function($state){
		state = $state;
	}));

	console.log(state);

});