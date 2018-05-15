var API_IP='http://ip-api.com/json'; //API that retrieves the IP Address
var lat;
var lon;
var map;

var app1 = angular.module("ComplaintApp",[]);

//Input Sanitization
var tagBody = '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*';

var tagOrComment = new RegExp(
    '<(?:'
    // Comment body.
    + '!--(?:(?:-*[^->])*--+|-?)'
    // Special "raw text" elements whose content should be elided.
    + '|script\\b' + tagBody + '>[\\s\\S]*?</script\\s*'
    + '|style\\b' + tagBody + '>[\\s\\S]*?</style\\s*'
    // Regular name
    + '|/?[a-z]'
    + tagBody
    + ')>',
    'gi');
function removeTags(html) {
    var oldHtml;
    do {
        oldHtml = html;
        html = html.replace(tagOrComment, '');
    } while (html !== oldHtml);
    return html.replace(/</g, '&lt;');
}



app1.controller("ComplaintController",function($scope, $http){

    //Fetch all the messages from DynamoDB using an API created in API Gateway and store it in the scope variable "messages"
	$http.post("https://someAPIURL/prod/fetch").then(function(response){
        $scope.messages = response.data;
        
	});

	//Adds a new complaint to DynamoDB

	$scope.addComplaint = function(newComplaint){
		var upJSON= {"message": removeTags(newComplaint.message), "IP": $scope.ip , "region": $scope.region, "city": $scope.city, "country": $scope.country }; //create a message

        $http.post("https://someapi/prod/entries", upJSON) //API created using API Gateway to enter data in dynamodb using Lambda
		.then(function(response){

		});
	}


	//get location data from the IP address
    
    $http.get(API_IP)
	.then(function(response){
		console.log(response.data);
        $scope.ip = response.data.query;
        $scope.region = response.data.regionName;
        $scope.city = response.data.city;
        $scope.country  = response.data.country;
        
        
    });


});




//Updates the map with the current user's data with the new data

function updatePage()
{
    //Hide the complaint table and display the google map
    $('#complainttable').hide();
    $('#complaintsuccess').removeAttr('style');
    $('#complaintsuccess').show();
    $('#complaintsuccess').css("color","green");
    $('#hplus-map').removeAttr('style');
    $('#hplus-map').show();
    $('#locationheader').removeAttr('style');
    $('#locationheader').show();

    $.ajax({
        type: 'GET',
        url: API_IP,

        success: function(data){
            console.log(data);
            lat=data.lat;
            lon=data.lon;
            map = new google.maps.Map(document.getElementById('hplus-map'), {
                center: {lat: lat, lng: lon},
                zoom: 12,
                draggable: false,
                scrollwheel: false,
            });
            var marker = new google.maps.Marker({
                position: {lat: lat, lng: lon},
                map: map
            });
            var infowindow = new google.maps.InfoWindow({
                content: "User Location"
            });
            marker.addListener('click', function() {
                infowindow.open(map, marker);
            });
        }
    });




}


//Initialize the Google Map
function initMap() {
    map = new google.maps.Map(document.getElementById('hplus-map'), {
    center: {lat: 42.3699, lng: 150.644},
    zoom: 2,
    draggable: false,
    scrollwheel: false,
    });


}
