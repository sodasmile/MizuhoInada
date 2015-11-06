$(document).ready(function () {
    var map = initializeMap();
    setCurrentPosition(map);
    $.ajax({
        url: "https://bbr2015.azurewebsites.net/api/GameStateFeed",
        headers: { "Content-Type": "application/json",
            "Accept": "application/json",
            "LagKode": "nedover_lia_triller_en_traktor",
            "DeltakerKode": "40041446"
        }

    }).then(function (data) {
        poster = data.poster;
        for (i = 0; i < poster.length; i++) {
            post = poster[i];
            setMyPositionMarker(map, post.latitude, post.longitude);
        }
    });


});

function initializeMap() {

    var mapOptions = {
        center: {lat: "59.676229", lng: "010.606291"}, zoom: 16
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    //setMyPositionMarker(map);
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

function setMyPositionMarker(map, latitude, longitude) {

    myLocation = new google.maps.LatLng(latitude, longitude);
    var marker = new google.maps.Marker({
        position: myLocation, title: "Kor i svartre er eg?"
    });


    marker.setMap(map);
    map.setCenter(myLocation);
}
	
