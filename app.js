var App = angular.module('App', ['ngRoute']);


App.config(['$routeProvider',function($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl: 'homepage.html',
		controller: 'HomeCtrl',
		resolve: {
		name: function(nameService) {
			return nameService.getMessage();
		},
		delayedMessage: function(delayedService) {
			return delayedService.delayedMessage();
		}
	}
	}).
	when('/about', {
		templateUrl:'aboutuspage.html',
		controller: 'AboutCtrl'
	}).
	when('/contact', {
		templateUrl:'contactuspage.html',
		controller: 'ContactCtrl'
	})
}])

App.controller('SimpleCtrl', ['$scope', function($scope){
	$scope.hello = "This is a message";
}])

App.controller('HomeCtrl', ['$scope' , 'name', 'delayedMessage' , function($scope, name, delayedMessage){
	$scope.home = "HomePage content is here...";
	$scope.name = name;	

	$scope.delayedMessage = delayedMessage;	

	}
])


App.controller('AboutCtrl', ['$scope', function($scope){
	$scope.about = "About Us page content is here...";
}])


App.controller('ContactCtrl', ['$scope', function($scope){
	$scope.contact = "Contact Us Page content is here...";
}])

App.factory('nameService', function($q){
	return {
		getMessage: function() {
			return $q.when('Fetching from resolve')
		}	
	};
})

App.factory('delayedService', function($q, $timeout){
	return {
		delayedMessage : function (){
			var deferred = $q.defer();
			$timeout(function() {
				deferred.resolve('Delayed fetch');
			}, 1000);
			return deferred.promise;
	}
	};
})