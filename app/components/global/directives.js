'use strict';

changedApp.directive('disableAnimate', function($animate){
	return function(scope, element){
		$animate.enabled(false, element);
	};
});

changedApp.directive('customScrollbar', function(){
	return {
		restrict: 'A',
		link: function(scope, element, attrs){

			// Set max-height
			element.css('max-height', attrs.maxHeight);

			// Put nicescroll on element
			element.niceScroll({
				zindex: '9999',
				cursorcolor: attrs.customScrollbar,
				cursorwidth: '6px',
				cursorborder: '0px solid ' + attrs.customScrollbar,
				cursorborderradius: '4px',
				cursoropacitymax: .25,
				bouncescroll: true,
				hidecursordelay: '800',
				railpadding: { top:0, right:6, left:0, bottom:0 }
			});
			element.getNiceScroll().resize().hide();

		}
	};
});

changedApp.directive('coolFade', function($timeout, $parse){
	return {
		restrict: 'A',
		link: function(scope, element, attrs){

			// Necessities
			var att, model;

			// Set att
			if(angular.isDefined(attrs.elementShow)){ att = attrs.elementShow; }
			else{ att = attrs.ngShow; }

			// Watch for element to be shown
			if(att){
				scope.$watch(att, function(newValue){
					if(newValue){

						// Fade after marked time
						$timeout(function(){

							// Set model
							if(angular.isDefined(att)){ model = $parse(att); }
							else{ model = $parse(att); }

							// Assign value to model
							model.assign(scope, false);

						}, parseInt(attrs.coolFade) * 1000);

					}
				});
			}

		}
	};
});

changedApp.directive('ngThumb', function($window){
	var helper = {
		support: !!($window.FileReader && $window.CanvasRenderingContext2D),
		isFile: function(item) {
			return angular.isObject(item) && item instanceof $window.File;
		},
		isImage: function(file) {
			var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
			return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
		}
	};

	return {
		restrict: 'A',
		template: '<canvas/>',
		link: function(scope, element, attrs){

			if(!helper.support){ return; }

			var params = scope.$eval(attrs.ngThumb);

			if(!helper.isFile(params.file)){ return; }
			if(!helper.isImage(params.file)){ return; }

			var canvas = element.find('canvas');
			var reader = new FileReader();

			reader.onload = onLoadFile;
			reader.readAsDataURL(params.file);

			function onLoadFile(event) {
				var img = new Image();
				img.onload = onLoadImage;
				img.src = event.target.result;
			}

			function onLoadImage() {
				var width = params.width || this.width / this.height * params.height;
				var height = params.height || this.height / this.width * params.width;
				canvas.attr({ width: width, height: height });
				canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
			}

		}
	};
});

changedApp.directive('sectionToggle', function($parse, $timeout){
	return {
		restrict: 'A',
		link: function(scope, element, attrs){

			// Possible attributes
			// section-toggle
			// section-parent
			// section-callback
			// section-toggle-time

			// Necessities
			var section = null, click = null;

			// Build necessities
			var build = function(){
				section = element;
				click = element.closest('#' + attrs.sectionParent).find('#' + attrs.sectionParent + 'Click');
				return section && click;
			};

			// Initialize section
			var initSection = function(){

				// Hide section
				section.removeClass('ng-hide').hide();

				// Section toggle is defined
				if('' !== attrs.sectionToggle){

					// Check on section ui.showSection for initial run
					if(angular.isDefined($parse(attrs.sectionToggle)(scope).ui.showSection)){

						// Show section if ui model requests it
						if($parse(attrs.sectionToggle)(scope).ui.showSection){
							preToggle(false);
						}

						// Watch UI model for further changes
						scope.$watch(attrs.sectionToggle + '.ui.showSection', function(newValue, oldValue){
							if(newValue !== oldValue){
								if(newValue){ preToggle(false); }
								if(!newValue){ toggle(false); }
							}
						});

					}

				}

			};

			// Things to do before you toggle the section
			var preToggle = function(scrollTo){

				// Switch UI icons
				switchIcons(true);

				// Is there a callback?
				if(!section.hasClass('loaded') && angular.isDefined(attrs.sectionCallback)){

					// Make call
					scope.$eval(attrs.sectionCallback).then(function(data){

						// Set data
						if('' !== attrs.sectionToggle){
							if(angular.isDefined($parse(attrs.sectionToggle)(scope))){ $parse(attrs.sectionToggle)(scope).callbackData = angular.copy(data); }
						}
						else{
							scope.callback = {};
							scope.callback.data = angular.copy(data);
						}

						// Get all of the codes from the links
						// if(angular.isDefined(data.links)){ $codes.parseLinks(data.links); }
						// else if(angular.isDefined(data[0].links)){ $codes.parseLinks(data[0].links); }
						// $codes.get.exec('eadv', 'codes', 'state');

						// Wait a little bit
						$timeout(function(){

							// Toggle section
							toggle(scrollTo);

							// Switch icons
							switchIcons(false);

							// Mark section as loaded
							markLoaded();

						}, 200);

					}, function(error){
						console.log(error);
					});

				}
				// Already loaded or no callback
				else{

					// Toggle section
					toggle(scrollTo);

					// Switch icons
					switchIcons(false);

					// Mark section as loaded
					markLoaded();

				}

			};

			// Toggle section
			var toggle = function(scrollTo){

				// Section toggle logic
				if(angular.isDefined(attrs.sectionToggleTime) && parseInt(attrs.sectionToggleTime) > 0){ section.slideToggle(parseInt(attrs.sectionToggleTime), 'linear'); }
				else{ section.toggle(); }
				if(scrollTo){ scrollToShow(); }

			};

			// Switch the UI icons
			var switchIcons = function(loading){
				if('' !== attrs.sectionToggle){
					if(angular.isDefined($parse(attrs.sectionToggle)(scope).ui.iconInfo)){ $parse(attrs.sectionToggle)(scope).ui.iconInfo = !loading; }
					if(angular.isDefined($parse(attrs.sectionToggle)(scope).ui.iconLoading)){ $parse(attrs.sectionToggle)(scope).ui.iconLoading = loading; }
				}
			};

			// Scroll to show
			var scrollToShow = function(){
				$timeout(function(){
					if(outOfViewport()){
						var scrollTo = section.offset().top - 70;
						$('html, body').animate({ scrollTop: scrollTo }, 300);
					}
				}, 200);
			};

			// Section is out of viewport
			var outOfViewport = function(){
				var top = section.offset().top,
					bottom = top + section.outerHeight(),
					viewportTop = window.pageYOffset,
					viewportBottom = viewportTop + window.innerHeight;
				return (top < viewportTop || bottom > viewportBottom);
			};

			// Mark section as loaded
			var markLoaded = function(){
				if(!section.hasClass('loaded')){ section.addClass('loaded'); }
			};

			// Make sure certian things are present
			if('' !== attrs.sectionToggle){

				// Are we ready?
				if(build()){

					// Initialize section
					initSection();

					// Handle click onClick event
					click.on('click', function(event, scrollTo){
						event.preventDefault();

						// On click do all of this if the element is not disabled
						if(!click.hasClass('disabled') && 'disabled' !== click.attr('disabled')){

							// Alter UI model to the opposite of its current visible state
							// * Altering the UI model will fire the toggle feature
							if(angular.isDefined($parse(attrs.sectionToggle)(scope).ui.showSection)){
								$parse(attrs.sectionToggle)(scope).ui.showSection = !section.is(':visible');
							}

						}

					});

				}
				else{
					console.error('All of the elements have not properly been defined.');
				}

			}

		}
	};
});

changedApp.directive('equalizerElement', function($timeout){
	return {
		restrict: 'A',
		link: function(scope, element, attrs){

			$timeout(function(){
				scope.$emit('onAfterRender');
			});

			scope.$on('onAfterRender', function(){
				console.log(element.height());
			});

		}
	};
});