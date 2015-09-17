'use strict';

changedApp.factory('$we', function(){

	// API of the factory
	var factory = {

		// Team
		team: [
			{
				id: 'brichardson',
				name: 'Brad Richardson',
				role: 'Founder',
				thumb: 'assets/images/team/brad-richardson.png',
				whyChangedTemplate: 'modules/who-we-are/templates/brichardson/why-changed.html',
				shortBioTemplate: 'modules/who-we-are/templates/brichardson/short-bio.html',
				skills: [
					'AngularJS',
					'jQuery',
					'JavaScript',
					'Node.js',
					'REST API',
					'HTML5',
					'Jade',
					'CSS3',
					'Sass',
					'Responsive Design / Mobile First',
					'SSH',
					'BASH / ZSH',
					'Git / GitFlow',
					'Photoshop / Sketch / Fireworks',
					'Illustrator',
					'Strategy / Direction',
					'Communication'
				],
				social: {
					linkedin: 'https://www.linkedin.com/in/bradwrichardson',
					twitter: 'https://twitter.com/bradrich48',
					github: 'https://github.com/bradrich'
				},
				contactInfo: [
					{
						icon: 'icon-email',
						value: 'brad@designchanged.us'
					},
					{
						icon: 'icon-phone',
						value: '(803) 792-1043'
					}
				],
				resume: {
					icon: 'icon-file-download',
					file: 'assets/images/resume-web.pdf'
				}
			}
		]

	};

	return factory;

});