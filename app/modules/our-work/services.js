'use strict';

changedApp.factory('$work', function(){

	// API of the factory
	var factory = {

		// Data
		data: [
			{
				id: 'aam',
				date: 'Early 2014',
				name: 'Mercury',
				client: 'Advance America',
				skills: 'Website Design, App Development',
				thumb: 'assets/images/work/MercuryIcon.png',
				images: [
					'assets/images/work/MercurySignIn.png',
					'assets/images/work/MercuryDashboard.png',
					'assets/images/work/MercuryForm.png',
					'assets/images/work/MercurySignInMobile.png',
					'assets/images/work/MercuryDashboardMobile.png',
					'assets/images/work/MercuryFormMobile.png',
					'assets/images/work/MercuryNavMobile.png',
				],
				languagesTools: [
					'AngularJS',
					'jQuery',
					'Bower / Grunt / NPM',
					'Sass / CSS3',
					'HTML5',
					'Foundation 5',
					'REST API / JSON',
					'Java',
					'Oracle SQL'
				]
			},
			{
				id: 'tm',
				date: 'Mid 2015',
				client: 'TabMagic',
				skills: 'App Development, Google Chrome Extension',
				thumb: 'assets/images/work/TabMagicIcon.png',
				images: [
					'assets/images/work/TabMagic1.png',
					'assets/images/work/TabMagic2.png',
					'assets/images/work/TabMagic3.png'
				],
				languagesTools: [
					'AngularJS',
					'jQuery',
					'Bower / Grunt / NPM',
					'Sass / CSS3',
					'HTML5',
					'Foundation 5',
					'Google Chrome Extension API / JSON'
				]
			},
			{
				id: 'hs',
				date: 'Early 2013',
				client: 'HillSouth',
				skills: 'Website Design',
				thumb: 'assets/images/work/HillSouthIcon.png',
				images: [
					'assets/images/work/HillSouthHome.png',
					'assets/images/work/HillSouthSubMaster.png',
					'assets/images/work/HillSouthSubPage.png',
					'assets/images/work/HillSouthNews.png',
					'assets/images/work/HillSouthTeamMember.png'
				],
				languagesTools: [
					'Umbraco CMS / ASP.Net',
					'C#',
					'Microsoft SQL',
					'CSS3',
					'HTML5',
					'XML / XSLT / Razor',
					'jQuery'
				]
			},
			{
				id: 'bhhb',
				date: 'Mid 2007',
				client: 'Billie Hardee Home for Boys',
				skills: 'Website Design',
				thumb: 'assets/images/work/BHHBIcon.png',
				images: [
					'assets/images/work/BHHBHome.png',
					'assets/images/work/BHHBSpecial.png',
					'assets/images/work/BHHBSub.png'
				],
				languagesTools: [
					'Umbraco CMS / ASP.Net',
					'C#',
					'Microsoft SQL',
					'CSS3',
					'HTML5',
					'XML / XSLT / Razor',
					'jQuery'
				]
			},
			{
				id: 'hffcu',
				date: 'Mid 2011',
				client: 'Health Facilities Federal Credit Union',
				skills: 'Website Design',
				thumb: 'assets/images/work/TrueCentsIcon.png',
				images: [
					'assets/images/work/TrueCentsHome.png',
					'assets/images/work/TrueCentsSpecial.png'
				],
				languagesTools: [
					'Umbraco CMS / ASP.Net',
					'C#',
					'Microsoft SQL',
					'CSS3',
					'HTML5',
					'XML / XSLT / Razor',
					'jQuery'
				]
			},
			{
				id: 'mm',
				date: 'Early 2011',
				client: 'Methodist Manor',
				skills: 'Website Design',
				thumb: 'assets/images/work/MManorIcon.png',
				images: [
					'assets/images/work/MManorHome.png',
					'assets/images/work/MManorSub.png',
					'assets/images/work/MManorSpecial.png',
					'assets/images/work/MManorNews.png'
				],
				languagesTools: [
					'Umbraco CMS / ASP.Net',
					'C#',
					'Microsoft SQL',
					'CSS3',
					'HTML5',
					'XML / XSLT / Razor',
					'jQuery'
				]
			},
			{
				id: 'pdrta',
				date: 'Mid 2009',
				client: 'Pee Dee Regional Transportation Authority',
				skills: 'App Development, Website Design',
				thumb: 'assets/images/work/PDRTAIcon.png',
				images: [
					'assets/images/work/PDRTAHome.png',
					'assets/images/work/PDRTASub.png',
					'assets/images/work/PDRTASpecial.png',
					'assets/images/work/PDRTASpecial2.png'
				],
				languagesTools: [
					'Umbraco CMS / ASP.Net',
					'C#',
					'Microsoft SQL',
					'CSS3',
					'HTML5',
					'XML / XSLT / Razor',
					'jQuery',
					'Google Maps API'
				]
			},
			{
				id: 'pdec',
				date: 'Early 2010',
				client: 'Pee Dee Electric Cooperative',
				skills: 'Website Design',
				thumb: 'assets/images/work/PDECIcon.png',
				images: [
					'assets/images/work/PDECHome.png',
					'assets/images/work/PDECSub.png',
					'assets/images/work/PDECSpecial.png'
				],
				languagesTools: [
					'Umbraco CMS / ASP.Net',
					'C#',
					'Microsoft SQL',
					'CSS3',
					'HTML5',
					'XML / XSLT / Razor',
					'jQuery'
				]
			},
			{
				id: 'safefcu',
				date: 'Mid 2010',
				client: 'SAFE Federal Credit Union',
				skills: 'Website Design',
				thumb: 'assets/images/work/SAFEIcon.png',
				images: [
					'assets/images/work/SAFEHome.jpg',
					'assets/images/work/SAFESub.png',
					'assets/images/work/SAFESub2.png',
					'assets/images/work/SAFENews.png'
				],
				languagesTools: [
					'Umbraco CMS / ASP.Net',
					'C#',
					'Microsoft SQL',
					'CSS3',
					'HTML5',
					'XML / XSLT / Razor',
					'jQuery'
				]
			},
			{
				id: 'sec',
				date: 'Late 2010',
				client: 'Santee Electric Cooperative',
				skills: 'Website Design',
				thumb: 'assets/images/work/SanteeIcon.png',
				images: [
					'assets/images/work/SanteeHome.png',
					'assets/images/work/SanteeSub.png',
					'assets/images/work/SanteeLocations.png'
				],
				languagesTools: [
					'Umbraco CMS / ASP.Net',
					'C#',
					'Microsoft SQL',
					'CSS3',
					'HTML5',
					'XML / XSLT / Razor',
					'jQuery'
				]
			},
			{
				id: 'scphca',
				date: 'Early 2012',
				client: 'South Carolina Primary Health Care Association',
				skills: 'App Development, Website Design',
				thumb: 'assets/images/work/SCPHCAIcon.png',
				images: [
					'assets/images/work/SCPHCAHome.png',
					'assets/images/work/SCPHCALocations.png',
					'assets/images/work/SCPHCANews.png',
					'assets/images/work/SCPHCATestimonials.png'
				],
				languagesTools: [
					'Umbraco CMS / ASP.Net',
					'C#',
					'Microsoft SQL',
					'CSS3',
					'HTML5',
					'XML / XSLT / Razor',
					'jQuery',
					'Google Maps API'
				]
			},
			{
				id: 'uab',
				date: 'Early 2011',
				client: 'SAFE Federal Credit Union',
				skills: 'Website Design',
				thumb: 'assets/images/work/UNLIKEABANKIcon.png',
				images: [
					'assets/images/work/UNLIKEABANKHome.png',
					'assets/images/work/UNLIKEABANKSub.png'
				],
				languagesTools: [
					'Umbraco CMS / ASP.Net',
					'C#',
					'Microsoft SQL',
					'CSS3',
					'HTML5',
					'XML / XSLT / Razor',
					'jQuery'
				]
			}
		]

	};

	return factory;

});