'use strict';

changedApp.controller('ContactUsCtrl', function($scope, $contact){

	// Define contact
	$scope.contact = {

		// Initialize
		init: function(){

			// Initialize form
			$scope.contact.form.init();

		},

		// Form
		form: {

			// Necessities
			data: null,
			model: null,
			template: angular.copy($contact.form.template),

			// Initialize
			init: function(){
				$scope.contact.form.model = angular.copy($contact.form.object);
			}

		},

		// Send
		send: {

			// Execute
			exec: function(){},

			// Success
			success: function(){},

			// Fail
			fail: function(){},

			// Fallback
			fallback: function(){}

		}

	};

	// Initialize contact
	$scope.contact.init();

});