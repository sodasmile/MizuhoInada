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
    posInfo: undefined,
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
        navigator.geolocation.watchPosition(
                function(geopos) {
                    if (app.posInfo === undefined) {
                        app.posInfo = {
                            position: geopos.coords,
                            updated: new Date()
                        };
                    } else {
                        // 5 seconds since last updated.
                        if ((new Date() - app.posInfo.updated) > 5000) {
                            app.posInfo = {
                                position: geopos.coords,
                                updated: new Date()
                            };
                            app.postPosition(geopos.coords);
                        }
                    }
                },
                function(error) {
                    app.log(error);
                },
                {
                    timeout: 30000,
                    enableHighAccuracy: true,
                    maximumAge: 5000
                });
        document.getElementById("registerSecret").addEventListener('click', function() {
            app.registerPost();
        });
    },
    showPosition : function(coords) {
        document.getElementById("long").innerText = coords.longitude;
        document.getElementById("lat").innerText = coords.latitude;
        document.getElementById("locUpdated").innerText = new Date().toString();
    },

    log : function(message) {
        document.getElementById("log").innerHTML = "On <strong>" + new Date() + "</strong><br/>" + message;
    },

    registerPost : function() {
        var deltaker = document.getElementById("mobileNo").value;
        if (!app.isValidMobilNo(deltaker)) {
            app.log("Please write a mobile no.");
            return;
        }
        var secretCode = document.getElementById("secretCode").value;
        if (secretCode !== undefined && secretCode.trim() !== "") {
            request.registerPost(deltaker.trim(), secretCode,
                    function(data) {
                        alert("Successfully posted: " + data);
                    },
                    function(code, text) {
                        alert("Could not register poll/post: status-code: " + code + ", text: " + text);
                    });
        } else {
            alert("A secret-code must be entered! secretCode = '" + secretCode + "'");
        }
    },

    postPosition : function(position) {
        var deltaker = document.getElementById("mobileNo").value;
        if (!app.isValidMobilNo(deltaker)) {
            app.log("Please write a mobile no.");
            return;
        }
        request.postPosition(deltaker.trim(), position,
                function(data) {
                    app.showPosition(position);
                    app.log("Reported: " + data);
                },
                function(code, text) {
                    alert("Could not post position: status-code: " + code + ", text: " + text);
                });
    },

    isValidMobilNo : function(deltaker) {
        return deltaker !== undefined && deltaker.trim().length === 8;
    }
};

app.initialize();