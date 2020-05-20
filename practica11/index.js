const coords = { lat: 21.152639, lng: -101.711598 };

function initMap() {
    const propsMap1 = {
        center: coords,
        zoom: 12
    };
    const map1 = new google.maps.Map(document.getElementById('map1'), propsMap1);

    const propsMap2 = {
        center: coords,
        zoom: 12,
        disableDefaultUI: true
    };
    const map2 = new google.maps.Map(document.getElementById('map2'), propsMap2);

    const propsMap3 = {
        center: coords,
        zoom: 12,
        zoomControl: false,
        scaleControl: true
    };
    const map3 = new google.maps.Map(document.getElementById('map3'), propsMap3);

    const propsMap4 = {
        center: coords,
        zoom: 12,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            mapTypeIds: ['roadmap', 'satellite', 'terrain']
        }
    };
    const map4 = new google.maps.Map(document.getElementById('map4'), propsMap4);

    const propsMap5 = {
        center: coords,
        zoom: 12,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM
        },
        scaleControl: true,
        streetViewControl: true,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP
        },
        fullscreenControl: true
    };
    const map5 = new google.maps.Map(document.getElementById('map5'), propsMap5);

    const propsMap6 = {
        center: coords,
        zoom: 12,
        restriction: {
            latLngBounds: {
                north: 21.44,
                south: 20.8594,
                west: -102.1020,
                east: -101.0988
            },
            strictBounds: false
        }
    };
    const map6 = new google.maps.Map(document.getElementById('map6'), propsMap6);
}