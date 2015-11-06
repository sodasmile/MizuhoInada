/**
 * 
 */
$(document).ready(function() {
    $.ajax({
        url: "http://bouvet-code-camp.azurewebsites.net/api/game/base/hentgjeldendepost/55"
    }).then(function(data) {
       $('.navn').append(data.navn);
    });
    var map = initializeMap();
    setCurrentPosition(map);
});

function initializeMap() {
    
    var mapOptions = {
        center: { lat: "59.676229", lng: "010.606291"},
        zoom: 16
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    setMyPositionMarker(map);
    //setCurrentPosition(map);
    return map;
}


function setCurrentPosition(map) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(initialLocation);
        });
    }
}

function setMyPositionMarker(map) {
   
            //myLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            myLocation = new google.maps.LatLng("59.676229", "010.606291");
            var marker = new google.maps.Marker({
                position: myLocation,
                title:"Kor i svartre er eg?"
            });

            
            marker.setMap(map);
            map.setCenter(myLocation);

    
}
	
