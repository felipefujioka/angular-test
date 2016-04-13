var easynvestApp = angular.module('easynvestApplication', []);

easynvestApp.controller('easynvestController', function($scope, $http) {
	let token
	let userId
	var minimumValueVar = 50000;
	var orderByVar = "MINIMUM";
	var alphabeticalOrder = true;
	$scope.username
	$scope.passsword
	$scope.loading = false;
	$scope.marketType = "PRIVATE";
	$scope.minimumQuery = 50000;
	$scope.filteredList
	$scope.showList = false;
	$scope.orderBy = "MINIMUM";
	$scope.alphabeticalOrder = true;
	$scope.loadingList = false;
	$scope.login = function() {
		$scope.loading = true
		$http({method: 'POST',
		        url: 'https://auth.qa.app.easynvest.com.br/users/me/tokens',
		    	data: {'login': $scope.username, 'password': $scope.password }}).success(function(data) {
			$scope.token = data.token;
			$scope.loading = false
		});
	}

	var addYearly = function(value) {
		if(value.yearlyYield.length > 1 && value.yearlyYield[1].factor > 0) {
					value.yearlyYieldString = value.yearlyYield[0].index + " + " + 	(value.yearlyYield[1].factor*100).toFixed(2) + "%";
				}else {
					value.yearlyYieldString = (value.yearlyYield[0].factor*100).toFixed(2) + "% " + value.yearlyYield[0].index;
				}
				return value;
	}

	$scope.$watch('token', function(newValue, oldValue) {
		$scope.loadingList = true;
		$http({method: 'GET',
		        url: 'https://api.qa.app.easynvest.com.br/bonds',
		    	headers: {'Authorization': 'Bearer ' + newValue }}).success(function(data) {
			$scope.bonds = data;
			$scope.bonds = $scope.bonds.map(addYearly)
			$scope.bonds = $scope.bonds.sort(orderByMinimum)
			$scope.filteredList = $scope.bonds;
			$scope.showList = true;
			$scope.loadingList = false;
		});

		$http({method: 'GET',
		        url: 'https://auth.qa.app.easynvest.com.br/users/me',
		    	headers: {'Authorization': 'Bearer ' + newValue }}).success(function(data) {
			$scope.user = data
		});

		if (newValue === "" || newValue == undefined) {
			$scope.hasToken = false;
		}else {
			$scope.hasToken = true;
		}
	});

	var orderByMinimum = function(left, right) {
		if(alphabeticalOrder){
			if(left.issuer < right.issuer) {
				return -1;
			}else if(left.issuer > right.issuer) {
				return 1;
			}
		}

		return left.minimumValue - right.minimumValue;
	}

	var orderByYield = function(left, right) {

		if(alphabeticalOrder){
			if(left.issuer < right.issuer) {
				return -1;
			}else if(left.issuer > right.issuer) {
				return 1;
			}
		}

		let leftSize = left.yearlyYield.length;
		let rightSize = right.yearlyYield.length;
		let smaller = leftSize < rightSize ? leftSize : rightSize;
		for(i=0; i < smaller; i++){
			let res = left.yearlyYield[leftSize-1-i].factor - right.yearlyYield[rightSize-1-i].factor;
			if(res != 0){
				return res < 0?-1:1;
			}
			
		}
		
		if(leftSize < rightSize) {
			return -1;
		}
		if(rightSize < leftSize) {
			return 1;
		}
		return 0
	}

	$scope.$watch('minimumQuery', function(newValue, oldValue) {
		minimumValueVar = newValue;
		$scope.filteredList = organizeList();
	});

	$scope.$watch('orderBy', function(newValue, oldValue) {
		orderByVar = newValue;
		$scope.filteredList = organizeList();
	});

	$scope.$watch('alphabeticalOrder', function(newValue, oldValue) {
		alphabeticalOrder = newValue;
		$scope.filteredList = organizeList();
	});

	let organizeList = function() {
		var temp
		temp = $scope.bonds.filter(function(value) {
			return value.minimumValue <= minimumValueVar;
		})
		if(orderByVar === "MINIMUM"){
			temp = temp.sort (orderByMinimum);
		}else if(orderByVar === "YIELD"){
			temp = temp.sort (orderByYield);
		}

		return temp;
	}

	$scope.refresh = function() {
		$http({method: 'GET',
		        url: 'https://api.qa.app.easynvest.com.br/bonds',
		    	headers: {'Authorization': 'Bearer ' + $scope.token }}).success(function(data) {
			$scope.bonds = data;
		});
	}

});