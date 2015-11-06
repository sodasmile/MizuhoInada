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

    doRequest : function(method, url, deltaker, data, success, error) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    success(xmlhttp.responseText + ", send: " + data);
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