pontoEmbarque = "";
// Iniciando o mapa
var map = L.map('map', {
    zoomControl: false
}).setView([-21.786, -46.566], 15);

L.control.zoom({
    position: 'bottomright'
}).addTo(map);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var helloPopup = L.popup().setContent('Hello World!');

L.easyButton({
    id: 'id-for-the-button', // an id for the generated button
    position: 'bottomright', // inherited from L.Control -- the corner it goes in
    type: 'replace', // set to animate when you're comfy with css
    leafletClasses: true, // use leaflet classes to style the button?
    states: [{ // specify different icons and responses for your button
        stateName: 'get-center',
        onClick: function(button, map) {
            alert('Map is centered at: ' + map.getCenter().toString());
        },
        title: 'show me the middle',
        icon: 'fa-crosshairs'
    }]
}).addTo(map);

// Criando camada para desenhar no mapa
var markers = new L.FeatureGroup();

// Generator que desenha no mapa e html
var Generator = {};

var listaRotas = [];

/* Metodos da classe Generator */

// Draws a stop on the map, with the position and agency name.
Generator.drawAgencyStop = function(data) {

    obj = JSON.parse(data);

    L.marker([37.972117, -122.032526], {
            icon: agencyMarker
        }).addTo(map)
        .bindPopup(Generator.drawAgencyPopup(obj.agency_name, obj.agency_url, obj.agency_timezone, obj.agency_lang))
        .openPopup();

    map.setView(new L.LatLng(37.972117, -122.032526), 10);
};

/* Draws a popup on the stop, with the agency's information. */
Generator.drawAgencyPopup = function(agency_name, agency_url, agency_timezone,
                                                               agency_lang) {

    var html = "";

    html += "<div>" +
              "<h1 class='agency-title'>" +
                "<i class='fa fa-university' aria-hidden='true'></i> " +
                  agency_name +
               "</h1>" +
              "<p class='agency-desc'>" +
               "<a target='_blank' href='" + agency_url + "'>" +
                "Visit Agency!" +
               "</a>" +
              "</p>" +
              "<p class='agency-desc'>" +
                agency_timezone + " - " +
                agency_lang +
              "</p>" +
            "</div>";

    return html;

};

/* Generates the HTML code a list of routes */
Generator.drawRoutesList = function(routeListData) {

    var routeList, routeListLength, route, html, routeName;

    routeList = JSON.parse(routeListData);
    routeListLength = routeList.length;

    for (var i = 0; i < routeListLength; i++) {

        route = routeList[i];
        routeName = route.route_short_name + ": " + route.route_long_name;

        html = "<option value='" + route.route_id + "'>" +
                  routeName +
                "</option>";

        $("#routes").append(html);

        // Places the routes in a list, to be used in typeahead
        listaRotas.push(routeName);

    }
};

// Draws a line between the points of shape
Generator.drawShapes = function(data) {

    var obj = JSON.parse(data);

    // Check if shape points exists
    if (!(obj[0] === undefined || obj[0] === null)) {
        var latlngs = Array();

        for (var y = 0; y < obj[0].length; y++) {
            var marker = L.marker([obj[0][y].shape_pt_lat, obj[0][y].shape_pt_lon], {
                icon: greenIcon
            });
            //markers.addLayer(marker);
            latlngs.push(marker.getLatLng());
        }

        //map.addLayer(markers);

        // create a polyline from an arrays of LatLng points
        var polyline = L.polyline(latlngs, {
            color: '#3498db'
        }).addTo(map);
        markers.addLayer(polyline);
        map.addLayer(markers);
        // zoom the map to the polyline
        map.fitBounds(polyline.getBounds());
        map.setZoom(10);

    }
};

/* Draw a list of stops on map */
Generator.drawStops = function(stopsData) {

    var stopList, stopLength, stop, marker;

    stopList = JSON.parse(stopsData);
    stopLength = stopList.length;

    for (var i = 0; i < stopLength; i++) {

      stop = stopList[i];

      marker = L.marker([stop.stop_lat, stop.stop_lon], {
          icon: redMarker
      })
      .bindPopup(Generator.drawStopsPopup(stop.stop_id,
                                          stop.stop_name,
                                          stop.stop_desc));

      markers.addLayer(marker);

    }

    map.addLayer(markers);

};

/* Draws the pop-up stopping points on the map */
Generator.drawStopsPopup = function(stopId, stopName, stopsDesc) {

    var html = '';

    html += "<div class='stop-popup'>" +
        "<h3 class='stop-name'>" + stopName + "</h3>" +
        "<p>" + stopId + " - " + stopsDesc + "</p>" +
        "</div>";

    return html;

};
