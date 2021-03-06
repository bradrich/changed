'use strict';

changedApp.factory('$contact', function(){

	// API of the factory
	var factory = {

		// Form
		form: {
			object: {
				name: null,
				company: null,
				email: null,
				phone: null,
				subject: null,
				message: null
			},
			template: {
				name: { type: 'text', model: 'name', label: 'NAME', required: true, validate: 'forms.regExps.name', validateMessage: 'Your entry is not in the correct format.', containerClass: 'medium-12' },
				company: { type: 'text', model: 'company', label: 'COMPANY', required: true, containerClass: 'medium-12' },
				email: { type: 'text', model: 'email', label: 'EMAIL', required: true, validate: 'forms.regExps.email', validateMessage: 'Your entry is not in the correct format.', containerClass: 'medium-12' },
				phone: { type: 'text', model: 'phone', label: 'PHONE', required: true, placeholder: '(XXX) XXX-XXXX', attributes: { 'ui-mask': '(999) 999-9999' }, errors: { mask: 'Your entry is not in the correct format.' }, maxLength: 14, containerClass: 'medium-12' },
				subject: { type: 'text', model: 'subject', label: 'SUBJECT', required: true, containerClass: 'medium-12' },
				message: { type: 'textarea', model: 'message', label: 'MESSAGE', required: true, rows: 8, attributes: { 'ng-trim': false }, maxLength: '{{forms.textarea.characterMaxLength}}', characterCount: true, callback: 'forms.textarea.setCharactersLeft(contact.send.form.data.message.$viewValue)', containerClass: 'medium-12' },
				submit: { type: 'submit', label: 'Send', class: 'secondary small', disabled: 'contact.send.form.data.$pristine && contact.send.form.data.$invalid || contact.send.form.data.$dirty && contact.send.form.data.$invalid', containerClass: 'medium-6' },
				reset: { type: 'button', label: 'Reset', class: 'alert small', disabled: 'contact.send.form.data.$pristine', callback: 'contact.send.form.reset()', containerClass: 'medium-6' }
			}
		}

	};

	return factory;

});