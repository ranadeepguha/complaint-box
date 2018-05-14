var app1 = angular.module("SearchApp",[]);

app1.controller("SearchController",function($scope, $http){
	

    //Reads data from dynamoDB using an API configured in API Gateway
    $http.post("https://someAPI/prod/fetch")
	.then(function(response){
        $scope.searchText="";
        $scope.messages = response.data;
        
	});
	

});