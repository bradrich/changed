'use strict';

changedApp.directive('navPanel', function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'components/navigation/templates/nav-panel.html',
		controller: 'NavCtrl',
		link: function(scope, element){

			// Necessities
			var noOfChildren, childHeight, childHeightHalf;

			// Set child element future height
			var setChildHeight = function(){

				// Get number of children elements
				noOfChildren = element.children().length;

				// Divide element height by noOfChildren to set height
				childHeight = element.height() / noOfChildren;
				childHeightHalf = childHeight / 2;

				// Loop through each child element and set its height
				element.children().each(function(){

					// Set style values
					$(this).height(childHeight);
					if($(this).hasClass('nav-menu-button')){
						$(this).find('.hamburger').css('top', childHeightHalf);
						$(this).find('.icon').find('i').css('top', childHeightHalf);
					}
					else{
						$(this).find('.text').css('top', childHeightHalf);
						$(this).find('.icon').find('i').css('top', childHeightHalf);
					}

				});

			};

			// Call setChildHeight
			setChildHeight();

			// Call setChildHeight after screen resize
			$(window).resize(function(){ setChildHeight(); });

			// Loop through each child element and set its height
			element.children().each(function(){

				// Make sure that you are not working with nav-menu-button
				if(!$(this).hasClass('nav-menu-button')){

					// Handle hover event
					$(this).hover(function(){
						if(!element.hasClass('move-right')){ $(this).addClass('move-right-again'); }
					}, function(){
						if(!element.hasClass('move-right')){ $(this).removeClass('move-right-again'); }
					});

				}

			});

		}
	};
});

changedApp.directive('navMenuButton', function($timeout){
	return {
		restrict: 'C',
		link: function(scope, element){

			// Handle nav-hamburger click event
			element.on('click', function(){

				// Only do this if nav-panel is NOT moved right
				if(!element.closest('.nav-panel').hasClass('move-right')){

					// Add or remove close class from nav-hamburger element
					element.toggleClass('active').find('.hamburger').toggleClass('close');

					// Timeout setting
					var timer = 0;

					// Loop through each child element and slide over the non-nav-menu elements
					element.closest('.nav-panel').children().each(function(){

						// Make sure that you are not working with the nav-menu-button
						if(!$(this).hasClass('nav-menu-button')){

							// Wait a bit and slide it over to the right
							var el = $(this);
							$timeout(function(){
								el.toggleClass('move-right');
							}, timer);
							timer += 200;

						}

					});

				}
				// Element nav-panel IS moved right
				else{

					// Hide menu close and show hamburger
					element.find('.hamburger').removeClass('ng-hide');
					element.find('.icon').addClass('ng-hide');

					// Remove move-right from nav-panel
					element.closest('.nav-panel').removeClass('move-right');

					// Set navMain
					var navMain = element.closest('body').find('.nav-main');

					// Add collapsed class to nav-main - For smooth animation
					navMain.addClass('collapsed');

					// Wait to remove all classes and add back nav-main and collapsed classes
					$timeout(function(){
						navMain.removeClass().addClass('nav-main collapsed');
					}, 300);

				}

			});

		}
	};
});

changedApp.directive('navMain', function($nav){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'components/navigation/templates/nav.html',
		link: function(scope, element){

			// Necessities
			var classList,
				clickedClass,
				navPanel = element.closest('body').find('.nav-panel');

			// Loop through all of nav-panel's children elements
			element.closest('body').find('.nav-panel').children().each(function(){

				// Make sure that you are not working with the nav-menu-button
				if(!$(this).hasClass('nav-menu-button')){

					// Handle click event
					$(this).on('click', function(){

						// Remove all classes from nav-main and then add back nav-main
						element.removeClass().addClass('nav-main');

						// Get clicked elements class list
						classList = $(this).attr('class').split(/\s+/);

						// Loop through all nav elements (from the service) and see which one we clicked on
						angular.forEach($nav.elements, function(el){
							if(classList.indexOf(el) > -1){ clickedClass = el; }
						});

						// Remove move-right-again from the clicked element
						$(this).removeClass('move-right-again');

						// Remove collapsed class and add clickedClass to nav-main
						element.toggleClass(clickedClass);

						// Add move-right class to nav-panel and change menu button from hamburger to icon
						if(!navPanel.hasClass('move-right')){
							navPanel.addClass('move-right');
							navPanel.find('.nav-menu-button').find('.hamburger').addClass('ng-hide').parent().find('.icon').removeClass('ng-hide');
						}

					});

				}

			});

		}
	};
});