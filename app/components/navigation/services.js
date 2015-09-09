'use strict';

changedApp.factory('$nav', function(){

	// API of factory
	var factory = {

		// Elements
		elements: ['who-we-are', 'our-work', 'contact-us'],

		// Our work
		work: [
			{
				date: 'Early 2013',
				client: 'HillSouth',
				skills: 'Website Design',
				liveView: 'http://hillsouth.com',
				thumb: 'assets/images/work/HillSouthIcon.png',
				images: [
					'assets/images/work/HillSouthHome.png',
					'assets/images/work/HillSouthSubMaster.png',
					'assets/images/work/HillSouthSubPage.png',
					'assets/images/work/HillSouthNews.png',
					'assets/images/work/HillSouthTeamMember.png'
				]
			},
			{
				date: 'Mid 2007',
				client: 'Billie Hardee Home for Boys',
				skills: 'Website Design',
				thumb: 'assets/images/work/BHHBIcon.png',
				images: [
					'assets/images/work/BHHBHome.png',
					'assets/images/work/BHHBSpecial.png',
					'assets/images/work/BHHBSub.png'
				]
			},
			{
				date: 'Mid 2011',
				client: 'Health Facilities Federal Credit Union',
				skills: 'Website Design',
				liveView: 'http://cutruecents.com',
				thumb: 'assets/images/work/TrueCentsIcon.png',
				images: [
					'assets/images/work/TrueCentsHome.png',
					'assets/images/work/TrueCentsSpecial.png'
				]
			},
			{
				date: 'Early 2011',
				client: 'Methodist Manor',
				skills: 'Website Design',
				liveView: 'http://methodist-manor.com',
				thumb: 'assets/images/work/MManorIcon.png',
				images: [
					'assets/images/work/MManorHome.png',
					'assets/images/work/MManorSub.png',
					'assets/images/work/MManorSpecial.png',
					'assets/images/work/MManorNews.png'
				]
			},
			{
				date: 'Mid 2009',
				client: 'Pee Dee Regional Transportation Authority',
				skills: 'App Development, Website Design',
				liveView: 'http://pdrta.org',
				thumb: 'assets/images/work/PDRTAIcon.png',
				images: [
					'assets/images/work/PDRTAHome.png',
					'assets/images/work/PDRTASub.png',
					'assets/images/work/PDRTASpecial.png',
					'assets/images/work/PDRTASpecial2.png'
				]
			},
			{
				date: 'Early 2010',
				client: 'Pee Dee Electric Cooperative',
				skills: 'Website Design',
				liveView: 'http://peedeeelectric.com',
				thumb: 'assets/images/work/PDECIcon.png',
				images: [
					'assets/images/work/PDECHome.png',
					'assets/images/work/PDECSub.png',
					'assets/images/work/PDECSpecial.png'
				]
			},
			{
				date: 'Mid 2010',
				client: 'SAFE Federal Credit Union',
				skills: 'Website Design',
				thumb: 'assets/images/work/SAFEIcon.png',
				images: [
					'assets/images/work/SAFEHome.png',
					'assets/images/work/SAFESub.png',
					'assets/images/work/SAFESub2.png',
					'assets/images/work/SAFENews.png'
				]
			},
			{
				date: 'Late 2010',
				client: 'Santee Electric Cooperative',
				skills: 'Website Design',
				liveView: 'http://www.santee.org',
				thumb: 'assets/images/work/SanteeIcon.png',
				images: [
					'assets/images/work/SanteeHome.png',
					'assets/images/work/SanteeSub.png',
					'assets/images/work/SanteeLocations.png'
				]
			},
			{
				date: 'Early 2012',
				client: 'South Carolina Primary Health Care Association',
				skills: 'App Development, Website Design',
				liveView: 'http://scphca.org',
				thumb: 'assets/images/work/SCPHCAIcon.png',
				images: [
					'assets/images/work/SCPHCAHome.png',
					'assets/images/work/SCPHCALocations.png',
					'assets/images/work/SCPHCANews.png',
					'assets/images/work/SCPHCATestimonials.png'
				]
			},
			{
				date: 'Early 2011',
				client: 'SAFE Federal Credit Union',
				skills: 'Website Design',
				thumb: 'assets/images/work/UNLIKEABANKIcon.png',
				images: [
					'assets/images/work/UNLIKEABANKHome.png',
					'assets/images/work/UNLIKEABANKSub.png'
				]
			}
		],

		// Contact us
		contact: {

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
					phone: { type: 'text', model: 'phone', label: 'PHONE', required: true, attributes: { 'ui-mask': '(999) 999-9999' }, errors: { mask: 'Your entry is not in the correct format.' }, maxLength: 14, containerClass: 'medium-12' },
					subject: { type: 'text', model: 'subject', label: 'SUBJECT', required: true, containerClass: 'medium-12' },
					message: { type: 'textarea', model: 'message', label: 'MESSAGE', required: true, rows: 8, attributes: { 'ng-trim': false }, maxLength: '{{forms.textarea.characterMaxLength}}', characterCount: true, callback: 'forms.textarea.setCharactersLeft(nav.contact.form.data.message.$viewValue)', containerClass: 'medium-12' },
					submit: { type: 'submit', label: 'Send', class: 'secondary', disabled: 'nav.contact.form.data.$pristine && nav.contact.form.data.$invalid || nav.contact.form.data.$dirty && nav.contact.form.data.$invalid', containerClass: 'medium-6' },
					reset: { type: 'button', label: 'Reset', class: 'alert', disabled: 'nav.contact.form.data.$pristine', containerClass: 'medium-6' }
				}
			}

		}

	};

	return factory;

});