$(document).ready(function () {
    var map = initializeMap();
    setCurrentPosition(map);
    $.ajax({
        url: "https://bbr2015.azurewebsites.net/api/GameStateFeed", headers: {
            "Content-Type": "application/json", "Accept": "application/json", "LagKode": "nedover_lia_triller_en_traktor", "DeltakerKode": "40041446"
        }

    }).then(function (data) {
        poster = data.poster;
        for (i = 0; i < poster.length; i++) {
            post = poster[i];
            var bounce = post.harRegistert;
            //alert("Post " + i + " " + bounce);
            setMyPositionMarker(map, post.latitude, post.longitude, bounce, "BLUE");
        }
    });

    $.ajax({
        url: "https://bbr2015.azurewebsites.net/api/PosisjonsService", headers: {
            "Content-Type": "application/json", "Accept": "application/json", "LagKode": "nedover_lia_triller_en_traktor", "DeltakerKode": "40041446"
        }

    }).then(function (data) {
        for (i = 0; i < data.length; i++) {
            person = data[i];
            //alert("Post " + i + " " + bounce);
            setMyPositionMarker(map, person.latitude, person.longitude, true, "PINK");

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

function setMyPositionMarker(map, latitude, longitude, bounce, dot) {

    if (bounce) {
        animation = google.maps.Animation.DROP;
    } else {
        animation = google.maps.Animation.BOUNCE;
    }

    switch (dot) {
        case "RED":
            icon= 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
            break;
        case "GREEN":
            icon= 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
            break;
        case "BLUE":
            icon= 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
            break;
        case "PINK":
        default:
            icon= 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png';
            break;
    }

    myLocation = new google.maps.LatLng(latitude, longitude);
    var marker = new google.maps.Marker({
        position: myLocation, animation: animation,
        icon: icon
    });


    marker.setMap(map);
    map.setCenter(myLocation);
}
	
