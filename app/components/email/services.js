'use strict';

changedApp.factory('$email', function($log, $http){

	// Factory for sending transactional email through the Mandrill RESTFul API
	// https://mandrillapp.com/api/docs/messages.JSON.html#method=send

	// API of factory
	var factory = {

		// Default configuration
		default: {
			'key': 'wfbrKza6hK74d-uHuKZFgw',
			'template_name': null,
			'template_content': null,
			'message': {
				'html': null,
				'text': null,
				'subject': null,
				'from_email': null,
				'from_name': 'Changed',
				'to': null,
				'headers': {
					'Reply-To': 'no-reply@designchanged.us'
				},
				'important': true,
				'track_opens': null,
				'track_clicks': null,
				'auto_text': null,
				'auto_html': null,
				'inline_css': null,
				'url_strip_qs': null,
				'preserve_recipients': null,
				'view_content_link': null,
				'bcc_address': null,
				'tracking_domain': null,
				'signing_domain': null,
				'return_path_domain': null,
				'merge': true,
				'merge_language': 'mailchimp',
				'global_merge_vars': null,
				'merge_vars': null,
				'tags': null,
				'subaccount': null,
				'google_analytics_domains': null,
				'google_analytics_campaign': null,
				'metadata': null,
				'recipient_metadata': null,
				'attachments': null,
				'images': null
			},
			'async': false,
			'ip_pool': 'Main Pool',
			'send_at': null
		},

		// Send email
		send: function(template, templateContent, message, success, fail, fallback){

			// Define data
			var data = angular.copy(factory.default);

			// Add in template info
			data.template_name = template;
			data.template_content = templateContent;

			// Add in message data
			angular.forEach(message, function(value, key){
				data.message[key] = value;
			});

			// Make the http request
			$http({
				method: 'POST',
				url: 'https://mandrillapp.com/api/1.0/messages/send-template.json',
				data: data
			})
			.success(function(){

				// Call success function
				if(angular.isDefined(success) && success){ success(); }

			})
			.error(function(){
				$log.error('Mandrill email send request failed!');

				// Call fallback
				if(angular.isDefined(fallback) && fallback){ fallback(); }

				// Call fail function
				if(angular.isDefined(fail) && fail){ fail(); }

			});

		}

	};

	return factory;

});