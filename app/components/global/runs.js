'use strict';

changedApp.run(function($document){

	// Initialize Foundation
	Foundation.global.namespace = '';
	$document.foundation();

	// Initialize Frame Busting
	if(self === top){
		var theBody = document.getElementsByTagName('body')[0];
		theBody.style.display = 'block';
	}
	else{ top.location = self.location; }

});