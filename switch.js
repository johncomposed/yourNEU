var module = angular.module('myApp', [])

var container = document.createElement('span');
var shadowRoot = document.documentElement.createShadowRoot();
var shadowRoot.appendChild(container);
var viewURL = chrome.runtime.getURL('view.html');

module.controller('MyCtrl', ['$scope', function ($scope) {
    $scope.state = 'off';
    $scope.$on('switch', function () {
        console.log('switching');
        $scope.state = $scope.state === 'off' ? 'on' : 'off';
    });
}]);

module.run(['$rootElement', '$rootScope', function ($rootElement, $rootScope) {
    $rootElement.html('<ng-include src="\'' + viewURL + '\'" />');
    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        console.log('got message', message);
        if (message === 'switch') {
            $rootScope.$broadcast('switch');
            $rootScope.$apply();
        }
    });
}]);

angular.bootstrap(container, [module.name]);
