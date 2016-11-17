function init(newlat, newlong, serverimg, servername, servercity, servercountry) {
    // Setup Map <3 Snazzy Maps.
    var center = new google.maps.LatLng(newlat, newlong);
    var isDraggable = $(document).width() > 1024 ? true : false;
    var mapOptions = {
        zoom: 6,
        scrollwheel: true, // If navigation gets hard back to turn false.
        draggable: isDraggable,
        center: center,
        streetViewControl: true,
        mapTypeControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP
        },
        streetViewControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP
        },
        styles: [{
            "featureType": "administrative.province",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{
                "saturation": -100
            }, {
                "lightness": 65
            }, {
                "visibility": "on"
            }]
        }, {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{
                "saturation": -100
            }, {
                "lightness": 51
            }, {
                "visibility": "simplified"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [{
                "saturation": -100
            }, {
                "visibility": "simplified"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "all",
            "stylers": [{
                "saturation": -100
            }, {
                "lightness": 30
            }, {
                "visibility": "on"
            }]
        }, {
            "featureType": "road.local",
            "elementType": "all",
            "stylers": [{
                "saturation": -100
            }, {
                "lightness": 40
            }, {
                "visibility": "on"
            }]
        }, {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{
                "saturation": -100
            }, {
                "visibility": "simplified"
            }]
        }, {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                "hue": "#006bff"
            }, {
                "lightness": "-10"
            }, {
                "saturation": "-92"
            }, {
                "gamma": "0.37"
            }]
        }, {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#323a45"
            }]
        }, {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [{
                "visibility": "on"
            }, {
                "lightness": -25
            }, {
                "saturation": -100
            }]
        }, {
            "featureType": "water",
            "elementType": "labels.text",
            "stylers": [{
                "color": "#4f5256"
            }]
        }, {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "color": "#ffffff"
            }]
        }]
    };
    // Setting a new pin.
    var map = new google.maps.Map(document.getElementById('map'), mapOptions, center);
    var locations = [
        [`<h6><i class="fa fa-server"></i>  ${servername}</h6><p>${servercity}, ${servercountry}</p>`,
            newlat, newlong
        ]
    ];
    var infowindow = new google.maps.InfoWindow();
    var marker, i;
    var image = serverimg;
    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map,
            icon: image
        });
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
            };
        })(marker, i));
    }
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
    });
}