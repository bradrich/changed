'use strict';

changedApp.controller('NavCtrl', function($scope, $nav){

	// Define nav
	$scope.nav = {

		// Current
		current: null,

		// Contact
		contact: {

			// Form
			form: {

				// Necessities
				data: null,
				model: null,
				template: angular.copy($nav.contact.form.template),

				// Initialize
				init: function(){
					$scope.nav.contact.form.model = angular.copy($nav.contact.form.object);
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

		}

	};

});