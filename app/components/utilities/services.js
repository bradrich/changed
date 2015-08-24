'use strict';

changedApp.factory('$utils', function($rootScope, localStorageService, $location, $anchorScroll, $timeout, $window, Restangular){

	// API of factory
	var factory = {

		// UI display helper
		ui: {

			// State
			state: {
				showLoader: true,
				showContent: false,
				showError: false
			},

			// Content
			content: {
				showLoader: false,
				showContent: false,
				showNone: false,
				showList: false,
				showError: false
			},

			// Sections
			sections: {
				showFilter: false,
				showCreate: false,
				showExplanation: true,
				showResults: true,
				showPagination: false,
				showLoans: false,
				showLoansFail: false,
				showLoansNone: false,
				showLoansOpen: false,
				showLoansClosed: false,
				showLoansVoid: false,
				showLoansWriteOff: false,
				showComments: false,
				showCommentsNone: false,
				showCommentsFail: false,
				showNotes: false,
				showNotesNone: false,
				showNotesFail: false,
				showTransactions: false,
				showTransactionsNone: false,
				showTransactionsFail: false,
				showLocationNone: false,
				showLocationFail: false,
				showLocationSummary: false,
				showCheckSummary: false,
				completeDashboard: {
					loans: false,
					promises: false,
					comments: false,
					notes: false,
					stats: true
				},
				completeLoanDetails: {
					location: false,
					transactions: false,
					comments: false,
					promises: false
				},
				completeApplicantDashboard: {
					general: false,
					communications: false,
					location: false
				}
			},

			// Actions
			actions: {
				showEditing: false,
				showOpen: false
			},

			// Hidden section
			hiddenSection: {
				iconInfo: true,
				iconLoading: false,
				showSection: false,
				showError: false,
				// Special customer profile form properties
				allowMinimize: true,
				showAddForm: false,
				showAddButton: true
			}

		},

		// Data storage
		dataStorage: {

			// Add
			add: function(name, data){
				$rootScope.utils.dataStorage[name] = data;
				localStorageService.add(name, data);
			},

			// Get
			get: function(name){
				return (angular.isDefined($rootScope.utils.dataStorage[name])) ? $rootScope.utils.dataStorage[name] : localStorageService.get(name);
			},

			// Remove
			remove: function(name){
				if(angular.isDefined($rootScope.utils.dataStorage[name])){
					delete $rootScope.utils.dataStorage[name];
				}
				localStorageService.remove(name);
			},

			// Clear all
			clearAll: function(){

				// Loop through all of dataStorage
				angular.forEach($rootScope.utils.dataStorage, function(value, key){
					if('add' !== key && 'get' !== key && 'remove' !== key && 'clearAll' !== key){
						delete $rootScope.utils.dataStorage[key];
					}
				});
				localStorageService.clearAll();
			}

		},

		// Restangular config
		restangular: {

			// Id config
			idConfig: function(idConfig){
				return Restangular.withConfig(function(config){
					config.setRestangularFields({ 'id': idConfig });
				});
			}

		},

		// Bracketize
		bracketize: function(model, base){
			var props = model.split('.');
			return (base || props.shift()) + (props.length ? "['" + props.join("']['") + "']" : '');
		},

		// Add to array
		// * Function adds a data item to an array, but only if the item does not already exist in the array
		addToArray: function(dest, marker, item){

			// Is the current queue NOT empty?
			if(dest.length > 0){

				// Catcher
				var add = true;

				// Loop through current queue
				angular.forEach(dest, function(dItem){

					// Is there a marker to use?
					if(marker){

						// Does dItem[marker] equal item[marker]?
						if(dItem[marker] === item[marker]){ add = false; }

					}
					else{

						// Does dItem equal item?
						if(dItem === item){ add = false; }

					}

				});

				// Handle add or delete
				if(add){ dest.push(item); }

			}
			// Current queue IS empty
			else{ dest.push(item); }

		},

		// Delete application data
		deleteAppData: function(){
			delete $rootScope.navMainIsMinimized;
			delete $rootScope.quickReferenceIsVisible;
			factory.dataStorage.clearAll();
		},

		// Scroll to anchor
		scrollToAnchor: function(id){
			var old = $location.hash();
			$location.hash(id);
			$anchorScroll();
			$location.hash(old);
		},

		// Redirect to location
		redirectTo: function(path){

			// Configure path
			if(path.indexOf('http') > -1){ path = path.substring(path.indexOf('#') + 1, path.length); }

			// Redirect
			$location.path(path);

		},

		// Alter names after a resource call
		alterNames: function(info){

			// Properly case the info's names
			info.firstName = factory.properCaseName(info.firstName);
			info.middleName = factory.properCaseName(info.middleName);
			info.lastName = factory.properCaseName(info.lastName);
			return info;

		},

		// Properly case names
		properCaseName: function(name){
			if((name && name === name.toUpperCase()) || (name && name === name.toLowerCase())){

				// It is uppercase, convert it
				return name.replace(/\b(ma?c|de|le|fitz)?([a-z]+)/ig, function(whole, prefix, word){
					var ret = [];
					if(prefix){
						ret.push(prefix.charAt(0).toUpperCase());
						ret.push(prefix.substr(1).toLowerCase());
					}
					ret.push(word.charAt(0).toUpperCase());
					ret.push(word.substr(1).toLowerCase());
					return ret.join('');
				});

			}
			else{
				return name;
			}
		},

		// Time zones
		timeZones: {

			// Get name
			getName: function(abbr){
				if('EST' === abbr || 'EDT' === abbr){ return 'America/New_York'; }
				else if('CST' === abbr || 'CDT' === abbr){ return 'America/Chicago'; }
				else if('MST' === abbr || 'MDT' === abbr){ return 'America/Denver'; }
				else{ return 'America/Los_Angeles'; }
			}

		},

		// Common Data
		commonData: {

			// Get banking holidays
			getBankHolidays: function(){
				Restangular.all('commondata/bankholidays').getList().then(function(data){
					$rootScope.utils.commonData.bankHolidays = angular.copy(data);
				});
			}

		}

	};

	return factory;

});