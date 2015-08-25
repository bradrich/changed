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

					// Handle click event
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

			});

		}
	};
});

changedApp.directive('navMain', function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'components/navigation/templates/nav.html',
		link: function(scope, element){

			// Necessities
			var classList, clickedClass;

			// Loop through all of nav-panel's children elements
			element.closest('body').find('.nav-panel').children().each(function(){

				// Make sure that you are not working with the nav-menu-button
				if(!$(this).hasClass('nav-menu-button')){

					// Handle click event
					$(this).on('click', function(){

						// Get clicked elements class list
						classList = $(this).attr('class').split(/\s+/);

						// Who We Are
						if(classList.indexOf('who-we-are') > -1){ clickedClass = 'who-we-are'; }
						else if(classList.indexOf('our-work') > -1){ clickedClass = 'our-work'; }
						else if(classList.indexOf('contact-us') > -1){ clickedClass = 'contact-us'; }

						// Remove move-right-again from the clicked element
						$(this).removeClass('move-right-again');

						// Remove collapsed class and add clickedClass to nav-main
						element.removeClass('collapsed').toggleClass(clickedClass);

						// Add move-right class to nav-panel
						element.closest('body').find('.nav-panel').toggleClass('move-right');

					});

				}

			});

		}
	};
});