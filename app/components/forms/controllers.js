'use strict';

changedApp.controller('FormsCtrl', function($rootScope, $forms){

	// Define forms
	$rootScope.forms = {

		// Regular expressions
		regExps: $forms.regExps,

		// Textarea
		textarea: {

			// Necessities
			characterMaxLength: 255,
			charactersLeft: null,

			// Countdown the amount of characters left out of the character max
			setCharactersLeft: function(input){
				if(angular.isDefined(input)){ $rootScope.forms.textarea.charactersLeft = $rootScope.forms.textarea.characterMaxLength - input.length; }
			}

		}

	};

});