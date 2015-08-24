'use strict';

changedApp.factory('$forms', function(){

	// API of factory
	var factory = {

		// Regular expressions
		regExps: {
			name: new RegExp('^[a-zA-Z0-9 ]+$'),
			email: new RegExp('^[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$', 'i'),
			phoneNumber: new RegExp('^[0-9]{10}$'),
			address: new RegExp('^[a-zA-Z0-9 \\/]+$'),
			zipPostalCode: new RegExp('^[ABCEGHJKLMNPRSTVXY]\\d[ABCEGHJKLMNPRSTVWXYZ](?: )?\\d[ABCEGHJKLMNPRSTVWXYZ]\\d$|^\\d{5}$', 'i'),
			ssn: new RegExp('^\\d{9}$'),
			zipCode: new RegExp('^\\d{5}$'),
			city: new RegExp('^[a-zA-Z ]+$'),
			number: new RegExp('^[0-9]+$'),
			numberGreaterThan0: new RegExp('^[1-9][0-9]*$'),
			bankingNumber: new RegExp('^[X]+\\d{4}$|^\\d+$'),
			invalidCharacters: new RegExp('^[-a-zA-Z\\d\\s\'.,]*$'),
			invalidCharactersNoPeriods: new RegExp('^[-a-zA-Z\\d\\s\',]*$'),
			usdCurrency: new RegExp('^((\\$?\\-?)|(\\-?\\$?))([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)?(\\.[0-9]{2})?$'),
			numbersCommaDelimitedNoSpace: new RegExp('^\\d{1,4}(?:,\\d{1,4})*$'),
			stateCodesCommaDelimitedNoSpace: new RegExp('^[a-zA-Z]{2}(?:,[a-zA-Z]{2})*$'),
			date: new RegExp('^\\d{2}-\\d{2}-\\d{4}$'),
			customerSearch: {
				firstLast: new RegExp('^([-a-zA-Z\'.]{2,})\\s([-a-zA-Z\'.]{2,})$'), // First Last
				lastFirst: new RegExp('^([-a-zA-Z\'.\\s]{2,}),\\s([-a-zA-Z\'.]{2,})$'), // Last, First
				lastLast4: new RegExp('^([-a-zA-Z\'.]{2,})\\s(\\d{4})$'), // Last XXXX
				last4Last: new RegExp('^(\\d{4})\\s([-a-zA-Z\'.]{2,})$'), // XXXX Last
				firstLastLast4: new RegExp('^([-a-zA-Z\'.]{2,})\\s([-a-zA-Z\'.]{2,})\\s(\\d{4})$'), // First Last XXXX
				last4FirstLast: new RegExp('^(\\d{4})\\s([-a-zA-Z\'.]{2,})\\s([-a-zA-Z\'.]{2,})$'), // XXXX First Last
				lastFirstLast4: new RegExp('^([-a-zA-Z\'.\\s]{2,}),\\s([-a-zA-Z\'.]{2,})\\s(\\d{4})$'), // Last, First XXXX
				last4LastFirst: new RegExp('^(\\d{4})\\s([-a-zA-Z\'.\\s]{2,}),\\s([-a-zA-Z\'.]{2,})$') // XXXX Last, First
			}
		}

	};

	return factory;

});