'use strict';

changedApp.directive('forms', function(){
	return {
		restrict: 'A',
		controller: 'FormsCtrl'
	};
});

changedApp.directive('dynamicForm', function($parse, $q, $document, $compile, $http, $templateCache){

	// Supported element types
	var supported = {
		// Text-based elements
		'text': { element: 'input', type: 'text', editable: true, textBased: true },
		'date': { element: 'input', type: 'date', editable: true, textBased: true },
		'datetime': { element: 'input', type: 'datetime', editable: true, textBased: true },
		'datetime-local': { element: 'input', type: 'datetime-local', editable: true, textBased: true },
		'datepicker': { element: 'input', type: 'text', editable: true, textBased: true },
		'email': { element: 'input', type: 'email', editable: true, textBased: true },
		'month': { element: 'input', type: 'month', editable: true, textBased: true },
		'number': { element: 'input', type: 'number', editable: true, textBased: true },
		'password': { element: 'input', type: 'password', editable: true, textBased: true },
		'search': { element: 'input', type: 'search', editable: true, textBased: true },
		'tel': { element: 'input', type: 'tel', editable: true, textBased: true },
		'textarea': { element: 'textarea', editable: true, textBased: true },
		'text-angular': { element: 'text-angular', editable: true, textBased: true },
		'time': { element: 'input', type: 'time', editable: true, textBased: true },
		'url': { element: 'input', type: 'url', editable: true, textBased: true },
		'week': { element: 'input', type: 'week', editable: true, textBased: true },
		// Specialized editables
		'checkbox': { element: 'input', type: 'checkbox', editable: true, textBased: false },
		'survey-checkbox': { element: 'input', type: 'checkbox', editable: true, textBased: false },
		'color': { element: 'input', type: 'color', editable: true, textBased: false },
		'file': { element: 'input', type: 'file', editable: true, textBased: false },
		'range': { element: 'input', type: 'range', editable: true, textBased: false },
		'select': { element: 'select', editable: true, textBased: false },
		'timepicker': { element: 'timepicker', editable: true, textBased: false },
		// Pseudo-non-editables (containers)
		'checklist': { element: 'div', editable: false, textBased: false },
		'fieldset': { element: 'fieldset', editable: false, textBased: false },
		'radio': { element: 'div', editable: false, textBased: false },
		// Non-editables (mostly buttons)
		'button': { element: 'button', type: 'button', editable: false, textBased: false },
		'hidden': { element: 'input', type: 'hidden', editable: false, textBased: false },
		'image': { element: 'input', type: 'image', editable: false, textBased: false },
		'legend': { element: 'legend', editable: false, textBased: false },
		'reset': { element: 'button', type: 'reset', editable: false, textBased: false },
		'submit': { element: 'button', type: 'submit', editable: false, textBased: false },
		'alert-box': { element: 'alert-box', editable: false, textBased: false },
		'strong': { element: 'strong', editable: false, textBased: false }
	};

	return {
		restrict: 'E',
		link: function(scope, element, attrs){

			// Necessities
			var newElement = null,
				newPrefixLabel = null,
				newCharacterCountElement = null,
				newChild = null,
				optGroups = {},
				cbAtt = '',
				foundOne = false,
				iterElem = element,
				model = null,
				error = null,
				errorExt = null,
				errorClass = null,
				errorMessage = null,
				containerClass = null,
				nonEditValue = null,
				formName = null,
				formIndex = null,
				optionalFlag = null;

			// Check that the required attributes are in place
			if(angular.isDefined(attrs.ngModel) && (angular.isDefined(attrs.template) || angular.isDefined(attrs.templateUrl)) && !element.hasClass('dynamic-form')){

				// Define model
				model = $parse(attrs.ngModel)(scope);

				// Fix attrs.name
				if(angular.isDefined(attrs.nameChange) && angular.isDefined(attrs.formIndex)){
					formName = scope.$eval(attrs.nameChange);
					formIndex = scope.$eval(attrs.formIndex);
					var count = 0,
						formNameFinal;
					angular.forEach(formName, function(name){
						if(count === formIndex){ formNameFinal = name; }
						count++;
					});
					attrs.name = formNameFinal;
				}

				// Grab the template, either from the template attribute or from the URL in templateUrl
				(attrs.template ? $q.when($parse(attrs.template)(scope)) :
					$http.get(attrs.templateUrl, { cache: $templateCache }).then(function(result){
						return result.data;
					})
				).then(function(template){

					// Function to build each form template field
					var bracket = function(model, base) {
						var props = model.split('.');
						return (base || props.shift()) + (props.length ? "['" + props.join("']['") + "']" : '');
					},
            		buildFields = function(field, id){

            			// Reset necessities
            			error = null;
						errorExt = null;
						errorClass = null;
						errorMessage = null;
						optionalFlag = null;

						// Is the requested field not supported?
						if(
							angular.isUndefined(supported[field.type]) ||
							!supported[field.type] ||
							(angular.isDefined(field.editable) && !field.editable && (angular.isUndefined(field.editableOverride) || !scope.$eval(field.editableOverride)))
						){

							// NOT SUPPORTED - Create label element instead
							newElement = angular.element('<label></label>');

							// Make the label the html content
							if(angular.isDefined(field.label)){ angular.element(newElement).html(field.label); }

							// Put attrs into element
							// angular.forEach(field, function(value, attr){
							// 	if(['label', 'type'].indexOf(attr) > -1){ return; }
							// 	newElement.attr(attr, value);
							// });

							// Create container unless it was eliminated
							if(angular.isUndefined(field.eliminateContainer) || !field.eliminateContainer){

								// Create container class
								containerClass = (angular.isDefined(field.containerClass)) ? field.containerClass : ['medium-6', 'large-6'];

								// Build wrap and add class
								newElement = newElement.wrap('<div></div>').parent();
								if(angular.isArray(containerClass)){
									angular.forEach(containerClass, function(className){
										newElement.addClass(className);
									});
								}
								else if(containerClass.indexOf('{') > -1){ newElement.attr('ng-class', containerClass); }
								else{ newElement.addClass(containerClass); }
								newElement.addClass('columns');

								// Handle button alignment
								if(['button', 'legend', 'reset', 'submit'].indexOf(field.type) > -1){ newElement.addClass('end'); }

								// Add on container attributes
								if(angular.isDefined(field.containerAttributes)){
									angular.forEach(field.containerAttributes, function(value, attr){
										newElement.attr(attr, value);
									});
								}

							}

							// Show value if requested
							if(angular.isDefined(field.showModelValue) && field.showModelValue){

								// Create nonEditValue element
								nonEditValue = angular.element('<p></p>').addClass('input-model-highlight');

								// Add model to it
								var bind = null;
								if(angular.isDefined(field.modelFilters) && angular.isArray(field.modelFilters)){
									if(angular.isDefined(field.modelCodes)){ bind = field.modelCodes + '[' + bracket(field.model, attrs.ngModel) + '].description'; }
									else{ bind = bracket(field.model, attrs.ngModel); }
									angular.forEach(field.modelFilters, function(value){
										bind += ' | ' + value;
									});
								}
								else if(angular.isDefined(field.modelFilters)){
									if(angular.isDefined(field.modelCodes)){ bind = field.modelCodes + '[' + bracket(field.model, attrs.ngModel) + '].description'; }
									else{ bind = bracket(field.model, attrs.ngModel); }
									bind += ' | ' + field.modelFilters;
								}
								else{
									if(angular.isDefined(field.modelCodes)){ bind = field.modelCodes + '[' + bracket(field.model, attrs.ngModel) + '].description'; }
									else{ bind = bracket(field.model, attrs.ngModel); }
								}
								nonEditValue.attr('ng-bind', bind + ' | emptyProp');

								// Append it to newElement
								newElement.append(nonEditValue);

							}

							// Add newElement to element.contents()
							this.append(newElement);
							newElement = null;

						}
						else{

							// SUPPORTED - Create field or container according to type
							if(angular.isUndefined(field.model)){ field.model = id; }

							// Begin newElement
							newElement = angular.element($document[0].createElement(supported[field.type].element));
							if(angular.isDefined(supported[field.type].type)){ newElement.attr('type', supported[field.type].type); }

							// Editable fields (those that can feed models)
							if(angular.isDefined(supported[field.type].editable) && supported[field.type].editable){
								newElement.attr('name', id);
								newElement.attr('ng-model', bracket(field.model, attrs.ngModel));

								if(angular.isDefined(field.readonly)){ newElement.attr('ng-readonly', field.readonly); }
								if(angular.isDefined(field.required)){ newElement.attr('ng-required', field.required); }
								// if(angular.isDefined(field.val)){
								// 	model[field.model] = angular.copy(field.val);
								// 	newElement.attr('value', field.val);
								// }
							}

							// Fields based on input type TEXT
							if(angular.isDefined(supported[field.type].textBased) && supported[field.type].textBased){
								if(angular.isDefined(field.minLength)){ newElement.attr('minlength', field.minLength); }
								if(angular.isDefined(field.maxLength)){ newElement.attr('maxlength', field.maxLength); }
								if(angular.isDefined(field.validate)){ newElement.attr('ng-pattern', field.validate); }
								if(angular.isDefined(field.placeholder)){ newElement.attr('placeholder', field.placeholder); }
									else{ newElement.attr('placeholder', 'Enter value...'); }
								newElement.addClass('radius');
							}

							// Special cases
							if('number' === field.type || 'range' === field.type){
								if(angular.isDefined(field.minValue)){ newElement.attr('min', field.minValue); }
								if(angular.isDefined(field.maxValue)){ newElement.attr('max', field.maxValue); }
								if(angular.isDefined(field.step)){ newElement.attr('step', field.step); }
							}
							else if('text' === field.type || 'textarea' === field.type){
								if(angular.isDefined(field.splitBy)){ newElement.attr('ng-list', field.splitBy); }
								if(angular.isDefined(field.rows)){ newElement.attr('rows', field.rows); }

								// Character count for textarea
								if('textarea' === field.type && angular.isDefined(field.characterCount) && field.characterCount){
									newElement.addClass('character-count');
								}
							}
							else if('text-angular' === field.type){
								newElement.removeAttr('placeholder');
								newElement.attr('ta-toolbar-class', 'button-bar');
								newElement.attr('ta-toolbar-group-class', 'button-group radius');
								newElement.attr('ta-toolbar-button-class', 'button small');
								if(angular.isDefined(field.editorButtons)){ newElement.attr('ta-toolbar', field.editorButtons); }
								newElement.attr('ng-class', errorClass);
							}
							else if('checkbox' === field.type){
								if(angular.isDefined(field.isOn)){ newElement.attr('ng-true-value', field.isOn); }
								if(angular.isDefined(field.isOff)){ newElement.attr('ng-false-value', field.isOff); }
								if(angular.isDefined(field.slaveTo)){ newElement.attr('ng-checked', field.slaveTo); }
							}
							else if('survey-checkbox' === field.type){
								if(angular.isDefined(field.isOn)){ newElement.attr('ng-true-value', field.isOn); }
								if(angular.isDefined(field.isOff)){ newElement.attr('ng-false-value', field.isOff); }
								if(angular.isDefined(field.slaveTo)){ newElement.attr('ng-checked', field.slaveTo); }

								// Handle checkbox with message (custom checkbox)
								if(angular.isDefined(field.checkboxMessage) && angular.isDefined(field.label)){
									if(field.required){ optionalFlag = angular.element($document[0].createElement('i')).addClass('fa fa-circle alert-color input-type-icon'); }
									newElement = newElement.wrap('<div></div>').parent().addClass('custom-checkbox-element')
										.prepend(optionalFlag)
										.prepend(document.createTextNode(field.label + ' '))
										.wrap('<div></div>').parent().addClass('custom-checkbox-parent')
										.prepend(angular.element('<div class="custom-checkbox-message"><div class="custom-scrollbar custom-checkbox-message-child"></div></div>'))
										.find('.custom-checkbox-message-child').attr('custom-scrollbar', '#E6ECEF').attr('max-height', '200px')
										.html(scope.$eval(field.checkboxMessage))
										.closest('.custom-checkbox-parent');
								}
							}
							else if('datepicker' === field.type){
								if(angular.isDefined(field.datepickerSettings)){
									angular.forEach(field.datepickerSettings, function(value, key){
										newElement.attr(key, value);
									});
								}
							}
							else if('timepicker' === field.type){
								if(angular.isDefined(field.timepickerSettings)){
									angular.forEach(field.timepickerSettings, function(value, key){
										newElement.attr(key, value);
									});
								}
							}
							else if('checklist' === field.type){
								if(angular.isDefined(field.val)){ model[field.model] = angular.copy(field.val); }
								if(angular.isDefined(field.options)){
									// if(!(angular.isDefined(model[field.model]) && angular.isObject(model[field.model]))){ model[field.model] = {}; }
									angular.forEach(field.options, function(option, childId){
										newChild = angular.element('<input type="checkbox" class="no-margin-bottom" />');
										newChild.attr('name', bracket(id + '.' + childId));
										newChild.attr('ng-model', bracket(field.model + "." + childId, attrs.ngModel));
										if(angular.isDefined(option['class'])){ newChild.attr('ng-class', option['class']); }
										if(angular.isDefined(field.disabled)){ newChild.attr('ng-disabled', field.disabled); }
										if(angular.isDefined(field.readonly)){ newChild.attr('ng-readonly', field.readonly); }
										if(angular.isDefined(field.required)){ newChild.attr('ng-required', field.required); }
										if(angular.isDefined(field.callback)){ newChild.attr('ng-change', field.callback); }
										if(angular.isDefined(option.isOn)){ newChild.attr('ng-true-value', option.isOn); }
										if(angular.isDefined(option.isOff)){ newChild.attr('ng-false-value', option.isOff); }
										if(angular.isDefined(option.slaveTo)){ newChild.attr('ng-checked', option.slaveTo); }
										// if(angular.isDefined(option.val)) {
										// 	setProperty(model, field.model, angular.copy(option.val), childId);
										// 	newChild.attr('value', option.val);
										// }

										if(angular.isDefined(option.label)){
											newChild = newChild.wrap('<label></label>').parent();
											newChild.append(document.createTextNode(' ' + option.label));
										}
										newElement.append(newChild);
									});
								}
							}
							else if('radio' === field.type){
								if(angular.isDefined(field.val)){ model[field.model] = angular.copy(field.val); }
								if(angular.isDefined(field.values)){
									angular.forEach(field.values, function(label, val){
										newChild = angular.element('<input type="radio" />');
										newChild.attr('name', field.model);
										newChild.attr('ng-model', attrs.ngModel + '["' + field.model + '"]');
										if(angular.isDefined(field['class'])){ newChild.attr('ng-class', field['class']); }
										if(angular.isDefined(field.disabled)){ newChild.attr('ng-disabled', field.disabled); }
										if(angular.isDefined(field.callback)){ newChild.attr('ng-change', field.callback); }
										if(angular.isDefined(field.readonly)){ newChild.attr('ng-readonly', field.readonly); }
										if(angular.isDefined(field.required)){ newChild.attr('ng-required', field.required); }
										newChild.attr('value', val);
										if(angular.isDefined(field.val) && field.val === val){ newChild.attr('checked', 'checked'); }

										if(label){
											newChild = newChild.wrap('<label></label>').parent();
											newChild.append(document.createTextNode(' ' + label));
										}
										newElement.append(newChild);
									});
								}
							}
							else if('select' === field.type){
								if(angular.isDefined(field.multiple) && field.multiple !== false){ newElement.attr('multiple', 'multiple'); }
								if(angular.isDefined(field.empty) && field.empty !== false){ newElement.append(angular.element($document[0].createElement('option')).attr('value', '').html(field.empty)); }

								newChild = angular.element($document[0].createElement('option'));
								newChild.attr('value', "").html('-- Select Option --');
								newElement.append(newChild);

								if(angular.isDefined(field.autoOptions)){
									var opts = 'k as v.description for (k,v) in ' + field.autoOptions;
									newElement.attr('ng-options', opts);
								}
								else if(angular.isDefined(field.options)){
									angular.forEach(field.options, function(option, childId){
										newChild = angular.element($document[0].createElement('option'));
										newChild.attr('value', childId);
										if(angular.isDefined(option.disabled)){ newChild.attr('ng-disabled', option.disabled); }
										if(angular.isDefined(option.slaveTo)){ newChild.attr('ng-selected', option.slaveTo); }
										if(angular.isDefined(option.label)){ newChild.html(option.label); }
										if(angular.isDefined(option.group)){
											if(angular.isUndefined(optGroups[option.group])){
												optGroups[option.group] = angular.element($document[0].createElement('optgroup'));
												optGroups[option.group].attr('label', option.group);
											}
											optGroups[option.group].append(newChild);
										}
										else{ newElement.append(newChild); }
									});

									if(!angular.equals(optGroups, {})){
										angular.forEach(optGroups, function(optGroup){
											newElement.append(optGroup);
										});
										optGroups = {};
									}
								}

								newElement.addClass('radius');
							}
							else if('image' === field.type){
								if(angular.isDefined(field.label)){ newElement.attr('alt', field.label); }
								if(angular.isDefined(field.source)){ newElement.attr('src', field.source); }
							}
							else if('hidden' === field.type){
								newElement.attr('name', field.model);
								newElement.attr('ng-model', attrs.ngModel + '["' + field.model + '"]');
								if(angular.isDefined(field.val)){
									model[field.model] = angular.copy(field.val);
									newElement.attr('value', field.val);
								}
							}
							else if('file' === field.type){
								if(angular.isDefined(field.multiple)){ newElement.attr('multiple', field.multiple); }
							}
							else if('fieldset' === field.type){
								if(angular.isDefined(field.fields)){
									var workingElement = newElement;
									angular.forEach(field.fields, buildFields, newElement);
									newElement = workingElement;
								}
							}
							else if('alert-box' === field.type){
								if(angular.isDefined(field.show)){ newElement.attr('ng-show', field.show); }
								if(angular.isDefined(field.message)){ newElement.attr('alert-message', field.message); }
								if(angular.isDefined(field.messageTemplate)){ newElement.attr('alert-message-template', field.messageTemplate); }
								if(angular.isDefined(field.messageFunction)){ newElement.attr('alert-message-function', field.messageFunction); }
								if(angular.isDefined(field.icon)){ newElement.attr('alert-icon', field.icon); }
								if(angular.isDefined(field.iconSize)){ newElement.attr('alert-icon-size', field.iconSize); }
								if(angular.isDefined(field.showClose)){ newElement.attr('alert-show-close', field.showClose); }
								if(angular.isDefined(field.fontSmall) && field.fontSmall){ newElement.attr('alert-font-small', field.fontSmall); }
							}
							else if('strong' === field.type){
								if(angular.isDefined(field.label)){ newElement.html(field.label); }
								newElement = newElement.wrap('<label></label>').parent().addClass('inline');
							}

							// Common attributes, radio and alert-box already applied these...
							if('radio' !== field.type && 'survey-checkbox' !== field.type){
								// ...field class(es)
								if(angular.isDefined(field['class'])){
									if(angular.isArray(field['class'])){
										angular.forEach(field['class'], function(className){
											newElement.addClass(className);
										});
									}
									else if(field['class'].indexOf('{') > -1){ newElement.attr('ng-class', field['class']); }
									else{ newElement.addClass(field['class']); }
								}
								if(['button', 'reset', 'submit'].indexOf(field.type) > -1){
									newElement.addClass('expand radius');
								}

								// ...and checklist has already applied these
								if('checklist' !== field.type){
									if(angular.isDefined(field.disabled)){ newElement.attr('ng-disabled', field.disabled); }
									if(angular.isDefined(field.callback)){
										// Some field types need listeners on click...
										if(['button', 'fieldset', 'image', 'legend', 'reset', 'submit', 'datepicker'].indexOf(field.type) > -1){ cbAtt = 'ng-click'; }
										// ...the rest on change
										else{ cbAtt = 'ng-change'; }
										newElement.attr(cbAtt, field.callback);
										// Add focus to datepicker
										if(['datepicker'].indexOf(field.type) > -1){ newElement.attr('ng-focus', field.callback); }
									}
								}
							}

							// Arbitrary attributes
							if(angular.isDefined(field.attributes)){
								angular.forEach(field.attributes, function(val, attr){
									newElement.attr(attr, val);
								});
							}

							// If there is a prefix or postfix, build it - WRAPPER
							if(angular.isDefined(field.prefix) || angular.isDefined(field.postfix)){

								var beginning = '<div class="small-3 medium-3 large-3 columns overflow-visible">',
									prefixBeginning = '<span class="prefix">',
									postfixBeginning = '<span class="postfix">',
									ending = '</div>',
									prefixPostfixEnding = '</span>',
									wrap1Class = (angular.isDefined(field.prefix) && angular.isDefined(field.postfix)) ? 'small-6 medium-6 large-6 columns' : 'small-9 medium-9 large-9 columns',
									wrap2Class = null;

								if(angular.isDefined(field.prefix) && angular.isDefined(field.postfix)){ wrap2Class = 'row collapse prefix-radius postfix-radius overflow-visible'; }
								else if(angular.isDefined(field.prefix) && angular.isUndefined(field.postfix)){ wrap2Class = 'row collapse prefix-radius overflow-visible'; }
								else if(angular.isUndefined(field.prefix) && angular.isDefined(field.postfix)){ wrap2Class = 'row collapse postfix-radius overflow-visible'; }

								newElement = newElement.wrap('<div></div>').parent().addClass(wrap1Class);
								newElement = newElement.wrap('<div></div>').parent().addClass(wrap2Class);

								if(angular.isDefined(field.prefix)){
									var prefix = beginning;
									if(field.prefix.indexOf('button') < 0){ prefix += prefixBeginning; }
									prefix += field.prefix;
									if(field.prefix.indexOf('button') < 0){ prefix += prefixPostfixEnding; }
									prefix += ending;
									newElement.prepend(angular.element(prefix));
								}
								if(angular.isDefined(field.postfix)){
									var postfix = beginning;
									if(field.postfix.indexOf('button') < 0){ postfix += postfixBeginning; }
									postfix += field.postfix;
									if(field.postfix.indexOf('button') < 0){ postfix += prefixPostfixEnding; }
									postfix += ending;
									newElement.append(angular.element(postfix));
								}

							}

							// If there's a label, add it - WRAPPER
							if(field.required){ optionalFlag = angular.element($document[0].createElement('i')).addClass('fa fa-circle alert-color input-type-icon'); }
							if(angular.isDefined(field.label)){
								// Some elements have already applied their labels
								if(['image', 'hidden', 'strong', 'survey-checkbox'].indexOf(field.type) > -1){ angular.noop(); }
								// Fieldset elements put their labels in legend child elements
								else if('fieldset' === field.type){ newElement.prepend(angular.element($document[0].createElement('legend')).html(field.label)); }
								// Button elements get their labels from their contents
								else if(['button', 'legend', 'reset', 'submit'].indexOf(field.type) > -1){ newElement.html(field.label); }
								// Everything else should be wrapped in a label tag
								else{
									newElement = newElement.wrap('<label></label>').parent();
									newElement.prepend(optionalFlag);
									newElement.prepend(document.createTextNode(field.label));

									// Add label class if requested
									if(angular.isDefined(field.labelClass)){
										if(angular.isArray(field.labelClass)){
											angular.forEach(field.labelClass, function(className){
												newElement.addClass(className);
											});
										}
										else if(field.labelClass.indexOf('{') > -1){ newElement.attr('ng-class', field.labelClass); }
										else{ newElement.addClass(field.labelClass); }
									}
								}
							}
							// If there's a prefix label, build it
							else if(angular.isDefined(field.inlineLabel) && angular.isDefined(field.inlineLabelContainerClass)){
								newElement.attr('id', id);
								newPrefixLabel = angular.element($document[0].createElement('label')).attr('for', id).addClass('inline').html(field.inlineLabel);
								newPrefixLabel.append(optionalFlag);
								newPrefixLabel = newPrefixLabel.wrap('<div></div>').parent();
								if(angular.isArray(field.inlineLabelContainerClass)){
									angular.forEach(field.inlineLabelContainerClass, function(className){
										newPrefixLabel.addClass(className);
									});
								}
								else if(field.inlineLabelContainerClass.indexOf('{') > -1){ newElement.attr('ng-class', field.inlineLabelContainerClass); }
								else{ newPrefixLabel.addClass(field.inlineLabelContainerClass); }
								newPrefixLabel.addClass('columns');
							}

							// Handle errors
							if((angular.isUndefined(field.eliminateError) || !field.eliminateError) && ['button', 'legend', 'reset', 'submit'].indexOf(field.type) < 0){

								// Create error, error class and error message
								error = attrs.name + '.' + id + '.$dirty && ' + attrs.name + '.' + id + '.$invalid';

								// If validate is set, add it to error
								if(angular.isDefined(field.validate)){ error = '(' + error + ') || ' + attrs.name + '.' + id + '.$error.pattern'; }

								// Loop through errors and add server to error if present
								if(angular.isDefined(field.errors)){
									angular.forEach(field.errors, function(message, key){
										if('server' === key){ error += ' || ' + attrs.name + '.' + id + '.$error.server'; }
									});
								}

								// Build error class, etc
								errorClass = '{ error: ' + error;
								if(angular.isDefined(field.warnings)){

									// Error extended
									errorExt = error;

									// Error class
									errorClass += ', warning: ';
									angular.forEach(field.warnings, function(value, key){

										// Error extended build
										errorExt += ' || ' + key;

										// Error class built
										if(':' !== errorClass.charAt(errorClass.length - 2)){ errorClass += ' || '; }
										errorClass += key;

									});

								}
								if(angular.isDefined(field.successes)){

									// Error extended
									errorExt = (errorExt) ? errorExt : error;

									// Error class
									errorClass += ', success: ';
									angular.forEach(field.successes, function(value, key){

										// Error extended build
										errorExt += ' || ' + key;

										// Error class built
										if(':' !== errorClass.charAt(errorClass.length - 2)){ errorClass += ' || '; }
										errorClass += key;

									});

								}
								errorClass += ' }';

								// Build error message
								if(errorExt){ errorMessage = angular.element('<span></span>').addClass('text-left').attr('ng-class', errorClass).attr('ng-show', errorExt); }
								else{ errorMessage = angular.element('<span></span>').addClass('text-left').attr('ng-class', errorClass).attr('ng-show', error); }
								var requiredMessage = (angular.isDefined(field.requiredMessage)) ? field.requiredMessage : 'Input required';
								if(angular.isDefined(field.limitErrorsTo)){
									if(angular.isDefined(field.required) && field.limitErrorsTo.indexOf('required') > -1){ errorMessage.append(angular.element('<span></span>').attr('ng-show', attrs.name + '.' + id + '.$error.required').html(requiredMessage)); }
								}
								else{
									if(angular.isDefined(field.required)){ errorMessage.append(angular.element('<span></span>').attr('ng-show', attrs.name + '.' + id + '.$error.required').html(requiredMessage)); }
								}
								var validateMessage = (angular.isDefined(field.validateMessage)) ? field.validateMessage : 'You have entered an invalid input.';
								if(angular.isDefined(field.limitErrorsTo)){
									if(angular.isDefined(field.validate) && field.limitErrorsTo.indexOf('validate') > -1){ errorMessage.append(angular.element('<span></span>').attr('ng-show', attrs.name + '.' + id + '.$error.pattern').html(validateMessage)); }
								}
								else{
									if(angular.isDefined(field.validate)){ errorMessage.append(angular.element('<span></span>').attr('ng-show', attrs.name + '.' + id + '.$error.pattern').html(validateMessage)); }
								}

								// Loop through errors and add their messages
								if(angular.isDefined(field.errors)){
									angular.forEach(field.errors, function(message, key){
										if(angular.isDefined(field.limitErrorsTo) && field.limitErrorsTo.indexOf(key) > -1) { errorMessage.append(angular.element('<span></span>').attr('ng-show', error).html(message)); }
										else{ errorMessage.append(angular.element('<span></span>').attr('ng-show', attrs.name + '.' + id + '.$error.' + key).html(message)); }
									});
								}

								// Loop through warnings and add their messages
								if(angular.isDefined(field.warnings)){
									angular.forEach(field.warnings, function(message, key){
										errorMessage.append(angular.element('<span></span>').attr('ng-show', key).html(message));
									});
								}

								// Loop through successes and add their messages
								if(angular.isDefined(field.successes)){
									angular.forEach(field.successes, function(message, key){
										errorMessage.append(angular.element('<span></span>').attr('ng-show', key).html(message));
									});
								}

								// Wrap element in a div if it needs an error and is not a label
								if('label' !== angular.lowercase(newElement[0].nodeName)){
									newElement = newElement.wrap('<div></div>').parent();
								}

								// Add error class and append error message
								newElement.attr('ng-class', errorClass).append(errorMessage);

								// Character count for textarea
								if('textarea' === field.type && angular.isDefined(field.characterCount) && field.characterCount){
									newCharacterCountElement = angular.element($document[0].createElement('div')).addClass('textarea-character-count').attr('ng-show', attrs.name + '.' + id + '.$dirty').attr('ng-bind', 'forms.textarea.charactersLeft');
									if('label' !== angular.lowercase(newElement[0].nodeName)){
										newCharacterCountElement.addClass('no-label');
									}
									newElement.addClass('position-relative').append(newCharacterCountElement);
								}

							}

							// Create container unless it was eliminated
							if(angular.isUndefined(field.eliminateContainer) || !field.eliminateContainer){

								// Create container class
								containerClass = (angular.isDefined(field.containerClass)) ? field.containerClass : ['medium-6', 'large-6'];

								// Build wrap and add class
								newElement = newElement.wrap('<div></div>').parent();
								if(angular.isArray(containerClass)){
									angular.forEach(containerClass, function(className){
										newElement.addClass(className);
									});
								}
								else if(containerClass.indexOf('{') > -1){ newElement.attr('ng-class', containerClass); }
								else{ newElement.addClass(containerClass); }
								newElement.addClass('columns');

								// Handle button alignment
								// if(['button', 'legend', 'reset', 'submit'].indexOf(field.type) > -1){ newElement.addClass('end clearfix'); }

								// Add on container attributes
								if(angular.isDefined(field.containerAttributes)){
									angular.forEach(field.containerAttributes, function(value, attr){
										newElement.attr(attr, value);
									});
								}

							}

							// If there is a labelInputContainer, build it
							if(angular.isDefined(field.inlineLabel) && angular.isDefined(field.labelInputContainerClass)){
								newElement = newElement.wrap('<div></div>').parent().addClass('row');
								newElement.prepend(newPrefixLabel);
								newPrefixLabel = null;
								newElement = newElement.wrap('<div></div>').parent();
								if(angular.isArray(field.labelInputContainerClass)){
									angular.forEach(field.labelInputContainerClass, function(className){
										newElement.addClass(className);
									});
								}
								else if(field.labelInputContainerClass.indexOf('{') > -1){ newElement.attr('ng-class', field.labelInputContainerClass); }
								else{ newElement.addClass(field.labelInputContainerClass); }
								newElement.addClass('columns');
							}

							// If there is a prefix label, add it to element.contents()
							if(newPrefixLabel && angular.isUndefined(field.labelInputContainerClass)){
								this.append(newPrefixLabel);
								newPrefixLabel = null;
							}

							// Add newElement to element.contents()
							this.append(newElement);
							newElement = null;

						}

					};

					// Loop through all of the template items
					angular.forEach(template, buildFields, element);

					// Determine what tag name to use (ng-form if nested, form if outermost)
					while(!angular.equals(iterElem.parent(), $document) && !angular.equals(iterElem[0], $document[0].documentElement)){
						if(['form', 'ngForm', 'dynamicForm'].indexOf(attrs.$normalize(angular.lowercase(iterElem.parent()[0].nodeName))) > -1){
							foundOne = true;
							break;
						}
						iterElem = iterElem.parent();
					}
					if(foundOne){ newElement = angular.element($document[0].createElement('div')).attr('ng-form', ''); }
					else{ newElement = angular.element('<form></form>'); }

					// Psuedo-transclusion
					angular.forEach(attrs.$attr, function(attName, attIndex){
						if('is-customer-profile-form' !== attName){ newElement.attr(attName, attrs[attIndex]); }
						else{ newElement.attr('customer-profile-form', ''); }
					});
					newElement.attr('name', attrs.name);
					newElement.removeAttr('ng-model');
					angular.forEach(element[0].classList, function(className){
						newElement[0].classList.add(className);
					});
					newElement.addClass('dynamic-form');

					// Add the contents of the buildFields process
					newElement.append(element.contents());

					// Compile and update DOM
					$compile(newElement)(scope);
					element.replaceWith(newElement);

				});

			}

		}
	};

});

changedApp.directive('input', function(){
	return {
		restrict: 'E',
		require: '?ngModel',
		link: function(scope, element, attrs, ctrl){

			// Return if input does not have ngModel
			if(!ctrl){ return null; }

			// Set parsers
			ctrl.$parsers.push(function(viewValue){
				if('text' === attrs.type && '' === viewValue){ return null; }
				return viewValue;
			});

		}
	};
});

changedApp.directive('mustMatch', function(){
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attrs, ctrl){

			// Watch for model changes in the must match input
			scope.$watch(attrs.ngModel, function(newValue){
				if(newValue !== scope.$eval(attrs.mustMatch)){
					ctrl.$setValidity('mustMatch', false);
				}
				else{
					ctrl.$setValidity('mustMatch', true);
				}
			});

			// Watch for model changes in the origin input if must match input is dirty
			scope.$watch(attrs.mustMatch, function(newValue){
				if(ctrl.$dirty && newValue !== scope.$eval(attrs.ngModel)){
					ctrl.$setValidity('mustMatch', false);
				}
				else{
					ctrl.$setValidity('mustMatch', true);
				}
			});

		}
	};
});

changedApp.directive('focusMe', function(){
	return {
		restrict: 'A',
		scope: {
			trigger: '=focusMe'
		},
		link: function(scope, element){

			// Wait for trigger to be added to the scope
			scope.$watch('trigger', function(newValue){
				if(newValue){

					// Focus on the input
					element[0].focus();
					scope.trigger = false;

				}
			});

		}
	};
});

changedApp.directive('characterCount', function(){
	return {
		restrict: 'C',
		link: function(scope, element){

			// On focus of this element handler
			element.on('focus', function(){
				$(this).parent().addClass('focused');
			})
			// On blur of this element handler
			.on('blur', function(){
				$(this).parent().removeClass('focused');
			});

		}
	};
});

changedApp.directive('setAddressFromZip', function($http, $parse, $forms){
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attrs, ctrl){

			// Necessities
			var url;

			// Watch for model changes
			scope.$watch(attrs.ngModel, function(newZip, oldZip){
				if(newZip !== oldZip && angular.isDefined(newZip) && newZip && $forms.regExps.zipCode.test(newZip)){

					// Build Zippopotam.us API URL
					url = 'https://api.zippopotam.us/us/' + newZip;

					// Make call to Zippopotam.us API URL
					$http({ method: 'GET', url: url })
					.success(function(data){

						// Set city and state
						if(angular.isDefined($parse(attrs.setAddressFromZip)(scope)) && angular.isDefined($parse(attrs.setAddressFromZip)(scope)[attrs.setAddressCity])){
							$parse(attrs.setAddressFromZip)(scope)[attrs.setAddressCity] = data.places[0]['place name'];
						}
						if(angular.isDefined($parse(attrs.setAddressFromZip)(scope)) && angular.isDefined($parse(attrs.setAddressFromZip)(scope)[attrs.setAddressState])){
							$parse(attrs.setAddressFromZip)(scope)[attrs.setAddressState] = data.places[0]['state abbreviation'];
						}

						// Set validity
						ctrl.$setValidity('zipCode', true);

					})
					.error(function(error, status){

						if(angular.isDefined($parse(attrs.setAddressFromZip)(scope)) && angular.isDefined($parse(attrs.setAddressFromZip)(scope)[attrs.setAddressCity])){
							$parse(attrs.setAddressFromZip)(scope)[attrs.setAddressCity] = null;
						}
						if(angular.isDefined($parse(attrs.setAddressFromZip)(scope)) && angular.isDefined($parse(attrs.setAddressFromZip)(scope)[attrs.setAddressState])){
							$parse(attrs.setAddressFromZip)(scope)[attrs.setAddressState] = null;
						}

						// Set validity
						if(404 === status){ ctrl.$setValidity('zipCode', false); }
						else{

							// Service is down, another error has occurred, etc. Let the user through
							ctrl.$setValidity('zipCode', true);

						}

					});

				}
			});

		}
	};
});

changedApp.directive('inputFormat', function(){
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attrs, ctrl){

			// Set parsers
			ctrl.$parsers.push(function(value){
				if(!value){ return value; }

				// Necessities
				var formattedValue = value;

				// Set formattedValue
				if('uppercase' === attrs.inputFormat){
					ctrl.$setValidity('inputFormat', true);
					formattedValue = formattedValue.toUpperCase();
				}
				// Show an error if the requested format is not configured
				else{ ctrl.$setValidity('inputFormat', false); }

				// Set viewValue
				if(ctrl.$viewValue !== formattedValue){
					ctrl.$setViewValue(formattedValue);
					ctrl.$render();
				}

				return formattedValue;

			});

		}
	};
});

changedApp.directive('inputEventDisable', function(){
	return {
		restrict: 'A',
		require: '?ngModel',
		link: function(scope, element, attrs){

			// Check event disable attr
			if(angular.isArray(attrs.inputEventDisable)){

				// Loop through each event
				angular.forEach(attrs.inputEventDisable, function(inputEvent){

					// Bind event to be disabled
					element.bind(inputEvent, function($event){

						// Disable event
						$event.preventDefault();

					});

				});

			}
			else{

				// Bind event to be disabled
				element.bind(attrs.inputEventDisable, function($event){

					// Disable event
					$event.preventDefault();

				});

			}

		}
	};
});

changedApp.directive('minDateVerify', function($moment){
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attrs, ctrl){

			// Watch the model
			scope.$watch(attrs.ngModel, function(newValue, oldValue){
				if(newValue && newValue !== oldValue){

					// Necessities
					var validateDate = ('today' === attrs.minDateVerify) ? $moment() : $moment(scope.$eval(attrs.minDateVerify));
					var inputDate = $moment(newValue);

					// Validate date
					if(validateDate > inputDate && validateDate.diff(inputDate, 'days') > 0){
						ctrl.$setValidity('date', false);
						ctrl.$dirty = true;
					}
					else{ ctrl.$setValidity('date', true); }

				}
			});

		}
	};
});