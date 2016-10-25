var greenIcon = L.icon({
    iconUrl: 'dot-icon.png',
    shadowUrl: 'dot-icon.png',

    iconSize: [10, 10],
    shadowSize: [10, 10],
    iconAnchor: [5, 5],
    shadowAnchor: [5, 5],
    popupAnchor: [5, 5]
});

var redMarker = L.AwesomeMarkers.icon({
    icon: 'bus',
    markerColor: 'blue',
    prefix: 'fa'
});

var boardingMarker = L.AwesomeMarkers.icon({
    icon: 'bus',
    markerColor: 'green',
    prefix: 'fa'
});

var landingMarker = L.AwesomeMarkers.icon({
    icon: 'bus',
    markerColor: 'red',
    prefix: 'fa'
});

var agencyMarker = L.AwesomeMarkers.icon({
    icon: 'university',
    markerColor: 'orange',
    prefix: 'fa'
});

var partidaMarker = L.AwesomeMarkers.icon({
    icon: 'location-arrow',
    markerColor: 'green',
    prefix: 'fa'
});

var chegadaMarker = L.AwesomeMarkers.icon({
    icon: 'circle-o',
    markerColor: 'red',
    prefix: 'fa'
});
