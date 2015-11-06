/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    currentPosition: {},
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        navigator.geolocation.getCurrentPosition(
                function(geopos) {
                    app.currentPosition = geopos.coords;
                    app.log("Initial position: " + JSON.stringify(app.currentPosition));
                },
                function(error) {
                    app.log(error);
                },{
                    timeout: 30000
                });

        navigator.geolocation.watchPosition(
                function(geopos) {
                    app.currentPosition = geopos.coords;
                    app.showPosition(geopos.coords);
                    app.log("Position changed to: " + JSON.stringify(geopos.coords));
                },
                function(error) {
                    app.log(error);
                },
                {
                    timeout: 30000
                });

        document.getElementById("postLocation").addEventListener('click', function() {
            request.postPosition("95084074", app.currentPosition,
                    function(data) {
                        app.log("Successfully posted: " + data);
                    },
                    function(code, text) {
                        app.log("Could not post position: status-code: " + code + ", text: " + text);
                    });
        });
    },
    showPosition : function(coords) {
        var position = "lat: " + coords.latitude +
                ", lon: " + coords.longitude +
                ", acc: " + coords.accuracy;
        document.getElementById("geoLocation").innerText = position;
    },
    log : function(message) {
        document.getElementById("log").innerHTML = message;
    }
};

app.initialize();