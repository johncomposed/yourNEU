chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);


		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Herro. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------


		window.location = 'about:blank';

		// put any page-editing js here?

		window.addEventListener("load", function() {
			var html = document.querySelector('html');
			html.setAttribute('ng-app', '');
			html.setAttribute('ng-csp', '');
		})
	}
	}, 10);
});