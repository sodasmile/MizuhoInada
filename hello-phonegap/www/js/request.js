var request = {

    lagKode : "nedover_lia_triller_en_traktor",

    postPosition : function(deltaker, pos, success, error) {
        /*
            pos: { "latitude": 59.676035, "longitude": 10.604844 }
         */
        var url = "https://bbr2015.azurewebsites.net/api/PosisjonsService";
        var value = {
            latitude: pos.latitude,
            longitude: pos.longitude
        };
        request.doRequest("POST", url, deltaker, JSON.stringify(value), success, error);
    },

    registerPost : function(deltaker, secret, success, error) {
        var url = "https://bbr2015.azurewebsites.net/api/GameService";
        var value = {
            postKode: secret,
            bruktVåpen: "FELLE"
        };
        request.doRequest("POST", url, deltaker, JSON.stringify(value), success, function() {
            var value = {
                postKode: secret,
                bruktVåpen: "BOMBE"
            };
            request.doRequest("POST", url, deltaker, JSON.stringify(value), success, function() {
                var value = {
                    postKode: secret
                };
                request.doRequest("POST", url, deltaker, JSON.stringify(value), success, error);
            });
        });
    },

    getMeldinger : function(deltaker, success, error) {
        var url = "https://bbr2015.azurewebsites.net/api/Meldinger";
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    var response = JSON.parse(xmlhttp.responseText);
                    success(response.meldinger);
                } else {
                    error(xmlhttp.status, xmlhttp.responseText);
                }
            }
        };
        xmlhttp.open('GET', url, true);
        xmlhttp.setRequestHeader("LagKode", "nedover_lia_triller_en_traktor");
        xmlhttp.setRequestHeader("DeltakerKode", deltaker);
        xmlhttp.setRequestHeader('Accept', 'application/json');
        xmlhttp.setRequestHeader('Content-Type', 'application/json');
        xmlhttp.send();
    },

    doRequest : function(method, url, deltaker, data, success, error) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    success("Deltaker: " + deltaker + ", response: " + xmlhttp.responseText + ", send: " + data);
                } else {
                    error(xmlhttp.status, xmlhttp.responseText);
                }
            }
        };
        xmlhttp.open(method, url, true);
        xmlhttp.setRequestHeader("LagKode", "nedover_lia_triller_en_traktor");
        xmlhttp.setRequestHeader("DeltakerKode", deltaker);
        xmlhttp.setRequestHeader('Content-Type', 'application/json');
        xmlhttp.send(data);
    }
};