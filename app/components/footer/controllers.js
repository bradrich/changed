'use strict';

changedApp.controller('FooterCtrl', function($scope, $http){

	// Define footer
	$scope.footer = {

		// Initialize
		init: function(){

			// Get the Twitter feed
			$scope.footer.twitter.get.exec();

		},

		// Twitter
		twitter: {

			// UI
			ui: {
				showFeed: false,
				showNone: false,
				showError: false
			},

			// Get Changed feed
			get: {

				// Execute
				exec: function(){

					// Make call
					$http({
						method: 'GET',
						url: 'https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=1287700658',
						headers: {
							'Access-Control-Allow-Origin': 'http://0.0.0.0:9200/',
							'Access-Control-Allow-Methods': 'GET,OPTIONS',
							'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type',
							'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
							'Authorization': 'OAuth oauth_consumer_key="zEvmyKbu4ibXb0Dc52LjvL2m3",' +
								'oauth_token="1287700658-yePvoGBfvbWoVCUGnYke1lXmQFzkNECTnaC51xr",' +
								'oauth_signature_method="HMAC-SHA1",' +
								'oauth_timestamp="1441935765",' +
								'oauth_nonce="VbNnfe",' +
								'oauth_version="1.0",' +
								'oauth_signature="rNNGlZruO3oGOCui6Z5t%2BScdsqc%3D"'
						},
						params: {
							'user_id': '1287700658'
						},
						cache: false,
						withCredentials: true
					})
					.then(function(data){
						$scope.footer.twitter.get.success(data);
					}, function(error){
						$scope.footer.twitter.get.fail(error);
					});

				},

				// Success
				success: function(data){
					console.log('Success: ');
					console.log(data);
				},

				// Fail
				fail: function(error){
					console.log('Fail: ');
					console.log(error);
				}

			}

		}

	};

	// Initialize footer
	$scope.footer.init();

});