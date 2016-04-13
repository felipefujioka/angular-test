var app = angular.module('application', []);

app.controller('controller', function($scope, $http) {
	let token
	let userId
	$scope.loadData = function() {
		FB.getLoginStatus(function(response) {
		  token = response.authResponse.accessToken
		  userId = response.authResponse.userId
		});
		$http({method: 'GET',
		        url: 'https://graph.facebook.com/me/photos?fields=source',
		    	headers: {'Authorization': 'OAuth '+token}}).success(function(data) {
			$scope.photos = data.data;
		});
	}

});