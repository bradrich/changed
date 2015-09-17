'use strict';

changedApp.controller('ContactUsCtrl', function($scope, $contact, $email){

	// Define contact
	$scope.contact = {

		// Initialize
		init: function(){

			// Initialize form
			$scope.contact.send.form.init();

		},

		// Send
		send: {

			// UI
			ui: {
				showForm: true,
				showSending: false,
				showSent: false,
				showError: false
			},

			// Form
			form: {

				// Necessities
				data: null,
				model: null,
				template: angular.copy($contact.form.template),

				// Initialize
				init: function(){
					$scope.contact.send.form.model = angular.copy($contact.form.object);
				}

			},

			// Send to Changed
			sendToChanged: {

				// Execute
				exec: function(){

					// Set UI
					$scope.contact.send.ui.showForm = false;
					$scope.contact.send.ui.showSending = true;

					// Set template info
					var template = 'contact-notification';
					var templateContent = [
						{
							'name': 'contactName',
							'content': $scope.contact.send.form.model.name
						},
						{
							'name': 'contactCompany',
							'content': $scope.contact.send.form.model.company
						},
						{
							'name': 'contactEmail',
							'content': $scope.contact.send.form.model.email
						},
						{
							'name': 'contactPhone',
							'content': $scope.contact.send.form.model.phone
						},
						{
							'name': 'contactComments',
							'content': $scope.contact.send.form.model.message
						}
					];

					// Set message
					var message = {};
					message.to = [{ 'email': 'brad@designchanged.us', 'name': 'Brad Richardson', 'type': 'to' }];
					message.from_email = $scope.contact.send.form.model.email;
					message.subject = $scope.contact.send.form.model.subject;

					// Send the email
					$email.send(template, templateContent, message, $scope.contact.send.sendToChanged.success, $scope.contact.send.sendToChanged.fail, $scope.contact.send.sendToChanged.fallback);

				},

				// Success
				success: function(){

					// Set UI
					$scope.contact.send.ui.showSending = false;
					$scope.contact.send.ui.showSent = true;

					// Send the email to the visitor
					$scope.contact.send.sendToVisitor.exec();

				},

				// Fail
				fail: function(){

					// Set UI
					$scope.contact.send.ui.showSending = false;
					$scope.contact.send.ui.showError = true;

					// Send the email to the visitor
					$scope.contact.send.sendToVisitor.exec();

				},

				// Fallback
				fallback: function(){

					// Set mailTo string
					var mailTo = 'mailto:brad@designchanged.us' +
						'?subject=' + $scope.contact.send.form.model.subject +
						'&body=Dude!%0D%0A%0D%0A' +
							'Someone%20has%20tried%20to%20contact%20you%20through%20your%20website.%20That\'s%20cool%20right?%20Below%20is%20the%20information%20that%20they%20submitted:%0D%0A%0D%0A' +
							'Name%0D%0A' +
							$scope.contact.send.form.model.name + '%0D%0A%0D%0A' +
							'Company%0D%0A' +
							$scope.contact.send.form.model.company + '%0D%0A%0D%0A' +
							'Email%0D%0A' +
							$scope.contact.send.form.model.email + '%0D%0A%0D%0A' +
							'Phone%0D%0A' +
							$scope.contact.send.form.model.phone + '%0D%0A%0D%0A' +
							'Comments%0D%0A' +
							$scope.contact.send.form.model.message;

					// Open mailTo string
					window.location.href = mailTo;

				}

			},

			// Send to visitor
			sendToVisitor: {

				// Execute
				exec: function(){

					// Set template info
					var template = 'automated-email-response';

					// Set message
					var message = {};
					message.to = [{ 'email': $scope.contact.send.form.model.email, 'name': $scope.contact.send.form.model.name, 'type': 'to' }];
					message.from_email = 'websolutions@designchanged.us';
					message.subject = 'Thank you for contacting Changed!';

					// Send the email
					$email.send(template, null, message, null, null, null);

				},

				// Success
				success: function(){},

				// Fail
				fail: function(){}

			}

		}

	};

	// Initialize contact
	$scope.contact.init();

});