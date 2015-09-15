'use strict';

changedApp.directive('navPanel', function($timeout){
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

			// Handle click event for nav-menu-button element
			var menuClick = function(menu){
				menu.on('click', function(){

					// Is nav panel NOT moved right?
					if(!element.hasClass('move-right')){

						// Add or remove close class from nav-hamburger
						menu.toggleClass('active').find('.hamburger').toggleClass('close');

						// Timeout setting
						var timer = 0;

						// Loop through each child element of nav panel and slide over the non nav-menu-buttom element
						element.children().each(function(index){

							// Make sure that you are not working with the nav-menu-buttom
							if(!$(this).hasClass('nav-menu-button')){

								// Wait a bit
								var el = $(this);
								$timeout(function(){

									// Slide the nav element over to the right
									el.toggleClass('move-right');

									// Wait until the last nav element to slide and also slide the footer
									if(index === element.children().length - 1){
										element.closest('body').find('.footer-container').toggleClass('move-right');
									}

								}, timer);
								timer += 200;

							}

						});

					}
					// Is nav panel moved right?
					else{

						// Broadcast event
						scope.$broadcast('event:state-change', 'home');

					}

				});
			};

			// Handle hover event for non nav-menu-button elements
			var elementHover = function(el){
				el.hover(function(){

					// Change configuration as long as nav panel is not moved right
					if(!element.hasClass('move-right')){ el.addClass('move-right-again'); }

				}, function(){

					// Change configuration as long as nav panel is not moved right
					if(!element.hasClass('move-right')){ el.removeClass('move-right-again'); }

				});
			};

			// Loop through each child element
			element.children().each(function(){

				// Handle click event for nav-menu-button element
				if($(this).hasClass('nav-menu-button')){ menuClick($(this)); }
				// Handle hover event for non nav-menu-button elements
				else{ elementHover($(this)); }

			});

			// Watch the current nav element
			scope.$watch('nav.elements.current', function(newEl, oldEl){

				// Showing content
				if(newEl){

					// Move the nav panel to the right
					element.addClass('move-right');

					// Change the nav-menu-button state
					element.find('.nav-menu-button').addClass('active').find('.hamburger').addClass('ng-hide').parent().find('.icon').removeClass('ng-hide');

					// Reconfigure navigation elements
					element.children().each(function(){
						if(!$(this).hasClass('nav-menu-button')){
							$(this).removeClass('move-right-again');
							if(!$(this).hasClass('move-right')){ $(this).addClass('move-right'); }
						}
					});

				}
				// Going home
				else if(!newEl && newEl !== oldEl){

					// Move the nav panel back
					element.removeClass('move-right');

					// Change the nav-menu-button state
					element.find('.nav-menu-button').find('.hamburger').removeClass('ng-hide').parent().find('.icon').addClass('ng-hide');

				}

			});

		}
	};
});

changedApp.directive('navMain', function(){
	return {
		retrict: 'A',
		replace: true,
		templateUrl: 'components/navigation/templates/nav.html',
		link: function(scope, element){

			// Watch the current nav element
			scope.$watch('nav.elements.current', function(newEl, oldEl){

				// Showing content
				if(newEl){

					// Remove collapsed class from nav-main and add newEl class
					element.removeClass().addClass('nav-main').addClass(newEl);

				}
				// Going home
				else if(!newEl && newEl !== oldEl){

					// Rmeove the oldEl class from nav-main and add add collapsed class
					element.removeClass().addClass('nav-main').addClass('collapsed');

				}

			});

		}
	};
});