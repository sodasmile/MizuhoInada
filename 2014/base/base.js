var markers = [];

$(document).ready(boot);

function boot() {
    var map = initializeMap();
    //setCurrentPosition(map);
    myLocation = new google.maps.LatLng("59.676229", "010.606291");
    map.setCenter(myLocation);

    oppdaterSide();

    setInterval(oppdaterSide, 6000);
}


function oppdaterSide() {

    for (i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }

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
            setMyPositionMarker(map, post.latitude, post.longitude, bounce, "RED");
        }
    });

    $.ajax({
        url: "https://bbr2015.azurewebsites.net/api/PosisjonsService", headers: {
            "Content-Type": "application/json", "Accept": "application/json", "LagKode": "nedover_lia_triller_en_traktor", "DeltakerKode": "40041446"
        }

    }).then(function (data) {
        for (i = 0; i < data.length; i++) {
            person = data[i];


            var dot;
            switch (person.deltakerId) {
                case "JAVA_2-1":
                    dot = "GREEN";
                    break;
                case "JAVA_2-2":
                    dot = "YELLOW";
                    break;
                case "JAVA_2-3":
                    dot = "PINK";
                    break;
                case "JAVA_2-4":
                    dot = "BLUE";
                    break;
                default:
                    dot = "RED";
                    break;

            }
            setMyPositionMarker(map, person.latitude, person.longitude, true, dot);
        }
    });

    $.ajax({
        url: "https://bbr2015.azurewebsites.net/api/Meldinger", headers: {
            "Content-Type": "application/json", "Accept": "application/json", "LagKode": "nedover_lia_triller_en_traktor", "DeltakerKode": "40041446"
        }

    }).then(function (data) {
        meldinger = data.meldinger;
        melding = document.getElementById('messages')
        melding.innerText = '';
        for (i = 0; i < meldinger.length; i++) {
            var meldinger2 = meldinger[i];
            meldingsTekst = meldinger2.melding;
            melding.innerText = melding.innerText + '\n' + meldingsTekst + " " + meldinger2["tidspunktUtc"];
        }
    });
};


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
        animation = google.maps.Animation.NONE;
    } else {
        animation = google.maps.Animation.BOUNCE;
    }

    switch (dot) {
        case "RED":
            icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
            break;
        case "GREEN":
            icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
            break;
        case "BLUE":
            icon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
            break;
        case "YELLOW":
            icon = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
            break;
        case "PINK":
        default:
            icon = 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png';
            break;
    }

    myLocation = new google.maps.LatLng(latitude, longitude);
    var marker = new google.maps.Marker({
        position: myLocation, animation: animation, icon: icon, tooltip: "Fiskedisk"
    });

    marker.setMap(map);

    markers.push(marker);
}
	
