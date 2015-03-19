chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);


		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Herro. This message was sent from scripts/inject.js");

		// ----------------------------------------------------------

		//window.location = 'about:blank';

		// put any page-editing js here?

		// can try outside of the chrome extension message if not working

		//window.addEventListener("load", function() {
			var app = angular.module('UrNEU', []);

			var html = document.querySelector('html');
			html.setAttribute('ng-app', '');
			html.setAttribute('ng-csp', '');

			var viewport = document.getElementById('viewport');
			viewport.setAttribute('ng-controller', 'MainController');
			app.controller('MainController', function ($scope) {
			});

			var input = document.getElementById('lst-ib');
			input.setAttribute('ng-model', 'search');

			var myDirective = document.createElement('div');
			myDirective.setAttribute('my-directive', '');
			viewport.appendChild(myDirective);
			document.querySelector('.jsb center').appendChild(myDirective);

			app.directive('myDirective', ['$sce', function ($sce) {
				return {
					restrict: 'EA',
					replace: true,
					templateUrl: $sce.trustAsResourceUrl(chrome.extension.getURL('app/templates/index.html'))
				}
			}]);

			angular.bootstrap(html, ['UrNEU'], []);

		//});
	}

	}, 10);
});



