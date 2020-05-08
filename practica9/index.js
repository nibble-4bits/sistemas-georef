function initMap() {
    const retroStyle = new google.maps.StyledMapType(
        [
            {
                elementType: "geometry",
                stylers: [
                    {
                        color: "#ebe3cd"
                    }
                ]
            },
            {
                elementType: "labels.text.fill",
                stylers: [
                    {
                        color: "#523735"
                    }
                ]
            },
            {
                elementType: "labels.text.stroke",
                stylers: [
                    {
                        color: "#f5f1e6"
                    }
                ]
            },
            {
                featureType: "administrative",
                elementType: "geometry.stroke",
                stylers: [
                    {
                        color: "#c9b2a6"
                    }
                ]
            },
            {
                featureType: "administrative.land_parcel",
                elementType: "geometry.stroke",
                stylers: [
                    {
                        color: "#dcd2be"
                    }
                ]
            },
            {
                featureType: "administrative.land_parcel",
                elementType: "labels.text.fill",
                stylers: [
                    {
                        color: "#ae9e90"
                    }
                ]
            },
            {
                featureType: "administrative.province",
                elementType: "geometry.stroke",
                stylers: [
                    {
                        color: "#000000"
                    },
                    {
                        weight: 1
                    }
                ]
            },
            {
                featureType: "landscape.man_made",
                elementType: "geometry.fill",
                stylers: [
                    {
                        color: "#d2ccca"
                    }
                ]
            },
            {
                featureType: "landscape.natural",
                elementType: "geometry",
                stylers: [
                    {
                        color: "#dfd2ae"
                    }
                ]
            },
            {
                featureType: "poi",
                elementType: "geometry",
                stylers: [
                    {
                        color: "#dfd2ae"
                    }
                ]
            },
            {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [
                    {
                        color: "#93817c"
                    }
                ]
            },
            {
                featureType: "poi.park",
                elementType: "geometry.fill",
                stylers: [
                    {
                        color: "#a5b076"
                    }
                ]
            },
            {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [
                    {
                        color: "#447530"
                    }
                ]
            },
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [
                    {
                        color: "#f5f1e6"
                    }
                ]
            },
            {
                featureType: "road.arterial",
                elementType: "geometry",
                stylers: [
                    {
                        color: "#fdfcf8"
                    }
                ]
            },
            {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [
                    {
                        color: "#f8c967"
                    }
                ]
            },
            {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [
                    {
                        color: "#e9bc62"
                    }
                ]
            },
            {
                featureType: "road.highway.controlled_access",
                elementType: "geometry",
                stylers: [
                    {
                        color: "#e98d58"
                    }
                ]
            },
            {
                featureType: "road.highway.controlled_access",
                elementType: "geometry.stroke",
                stylers: [
                    {
                        color: "#db8555"
                    }
                ]
            },
            {
                featureType: "road.local",
                elementType: "labels.text.fill",
                stylers: [
                    {
                        color: "#806b63"
                    }
                ]
            },
            {
                featureType: "transit.line",
                elementType: "geometry",
                stylers: [
                    {
                        color: "#dfd2ae"
                    }
                ]
            },
            {
                featureType: "transit.line",
                elementType: "labels.text.fill",
                stylers: [
                    {
                        color: "#8f7d77"
                    }
                ]
            },
            {
                featureType: "transit.line",
                elementType: "labels.text.stroke",
                stylers: [
                    {
                        color: "#ebe3cd"
                    }
                ]
            },
            {
                featureType: "transit.station",
                elementType: "geometry",
                stylers: [
                    {
                        color: "#dfd2ae"
                    }
                ]
            },
            {
                featureType: "water",
                elementType: "geometry.fill",
                stylers: [
                    {
                        color: "#72c2c0"
                    }
                ]
            },
            {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [
                    {
                        color: "#575c54"
                    }
                ]
            }
        ],
        {
            name: 'Mapa retro'
        });
    const darkModeStyle = new google.maps.StyledMapType(
        [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#242f3e"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#746855"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#242f3e"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#d59563"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#d59563"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#263c3f"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#6b9a76"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#38414e"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#212a37"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9ca5b3"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#746855"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#1f2835"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#f3d19c"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#2f3948"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#d59563"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#17263c"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#515c6d"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#17263c"
                    }
                ]
            }
        ],
        {
            name: 'Modo oscuro'
        });

    const map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 21.1236,
            lng: -101.68
        },
        zoom: 12,
        mapTypeControlOptions: { mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'style_map_retro', 'style_map_dark'] }
    });
    map.mapTypes.set('style_map_retro', retroStyle);
    map.setMapTypeId('style_map_retro');
    map.mapTypes.set('style_map_dark', darkModeStyle);
    map.setMapTypeId('style_map_dark');
}