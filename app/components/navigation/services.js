'use strict';

changedApp.factory('$nav', function(){

	// API of the factory
	var factory = {

		// Elements
		elements: [
			{
				name: 'who-we-are',
				state: 'whoWeAre',
				subs: [ 'teamMember' ]
			},
			{
				name: 'our-work',
				state: 'ourWork'
			},
			{
				name: 'contact-us',
				state: 'contactUs'
			}
		]

	};

	return factory;

});