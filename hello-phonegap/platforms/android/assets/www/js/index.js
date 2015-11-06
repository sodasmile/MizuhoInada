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
        app.log($(document));
        document.getElementById("geobutton").addEventListener('click', function() {
            app.log("shuya: geobutton clicked");
            $.get("http://www.google.no", {
                success: function(data) {
                    app.log(data);
                }
            });
            navigator.geolocation.getCurrentPosition(
                    function(geopos) {
                        app.log("shuya: found geopos: " + geopos);
                        var position = "lat: " + geopos.coords.latitude +
                                       ", lon: " + geopos.coords.longitude +
                                       ", acc: " + geopos.coords.accuracy;
                        document.getElementById("geolocation").innerText = position;
                        app.log("shuya: updated UI with geolocation : " + position);
                    },
                    function(error) {
                        app.log(error);
                    },{
                        timeout: 30000
                    });
            app.log("geobutton clicked finish");
        });
    },
    log : function(message) {
        console.log("shuya: " + message);
    }
};

app.initialize();