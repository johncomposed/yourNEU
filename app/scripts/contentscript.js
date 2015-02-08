'use strict';

window.addEventListener("load", function() {
  var app = angular.module('Binged', []);

  var html = document.querySelector('html');
  html.setAttribute('ng-app', '');
  html.setAttribute('ng-csp', '');

  var viewport = document.getElementById('viewport');
  viewport.setAttribute('ng-controller', 'MainController');
  app.controller('MainController', function ($scope) {});

  var autoCompleteWin = document.querySelector('.gssb_e');
  angular.element(autoCompleteWin).remove();

  var input = document.getElementById('lst-ib');
  input.setAttribute('ng-model', 'search');

  var myDirective = document.createElement('div');
  myDirective.setAttribute('my-directive', '');
  document.querySelector('.jsb center').appendChild(myDirective);
  

  app.directive('myDirective', [ '$sce', function($sce) {
    return {
      restrict: 'EA',
      replace: true,
      templateUrl: $sce.trustAsResourceUrl(chrome.extension.getURL('templates/bing.html'))
    };
  }]);

  angular.bootstrap(html, ['Binged'], []);
});


var div = document.getElementById("sidebar");
div.remove();


chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------

	}
	}, 10);
});

