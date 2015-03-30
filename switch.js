var app = angular.module('instantSearch', ['angular.css.injector']);
var viewURL = chrome.runtime.getURL('view.html');

var container = document.createElement('span');
var shadowRoot = document.documentElement.createShadowRoot();
shadowRoot.appendChild(container);



//Switching
app.controller('switchCtrl', ['$scope', function ($scope) {
    $scope.state = 'off';
    $scope.$on('switch', function () {
        console.log('switching');
        $scope.state = $scope.state === 'off' ? 'on' : 'off';
    });
}]);

app.run(['$rootElement', '$rootScope', function ($rootElement, $rootScope) {
    $rootElement.html('<ng-include src="\'' + viewURL + '\'" />');
    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        console.log('got message', message);
        if (message === 'switch') {
            $rootScope.$broadcast('switch');
            $rootScope.$apply();
        }
    });
}]);
//End Switching

//Custom app

var dataURL = chrome.runtime.getURL('data/allmyneu.json');
var demoCSSURL = chrome.runtime.getURL('css/demo.css');
app.controller("InstantSearchCtrl", function($scope, $http, cssInjector) {

  $scope.styles = ['template1.css', 'template2.css'];
  cssInjector.add(demoCSSURL);



  $http.get(dataURL).
    success(function(data, status, headers, config) {
      $scope.data = data;
    });
});


app.filter('searchFor', function(){
  // {inputData:argument} here is (searchFor:searchString)
  return function(arr, searchString){
    if(!searchString){
      return arr;
    }
    var result = [];
    searchString = searchString.toLowerCase();

    // Using the forEach helper method to loop through the array
    angular.forEach(arr, function(item){
      if(item.name.toLowerCase().indexOf(searchString) !== -1 || item.desc.toLowerCase().indexOf(searchString) !== -1){
        result.push(item);
      }
    });
    return result;
  };
});

//End Custom app

angular.bootstrap(container, [app.name]);
