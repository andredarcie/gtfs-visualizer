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
Generator.drawAgencyStop = function (data) {

    obj = JSON.parse(data);

    L.marker([-23.543845, -46.631352], {
            icon: agencyMarker
        }).addTo(map)
        .bindPopup(Generator.drawAgencyPopup(obj.agency_name, obj.agency_url, obj.agency_timezone, obj.agency_lang))
        .openPopup();

    map.setView(new L.LatLng(-23.543845, -46.631352), 10);
};

// Draws a popup on the stop, with the agency's information.
Generator.drawAgencyPopup = function(agency_name, agency_url, agency_timezone, agency_lang) {
    var html = "";

    html += "<h1 style='font-size: 15px; color: orange; text-align: center'><i class='fa fa-university' aria-hidden='true'></i> " + agency_name + "</h1>" +
        "<p style='padding: 1px; margin: 0; text-align: center'><a href='" + agency_url + "'>Visit Agency!</a></p>" +
        "<p style='padding: 1px; margin: 0; text-align: center'>" + agency_timezone + " - " + agency_lang + "</p></div>";

    return html;

};

// Generates the HTML code a list of routes
Generator.drawRoutesList = function(data) {

    obj = JSON.parse(data);

    for (var x = 0; x < obj.length; x++) {

        var route_name = obj[x].route_short_name + ": " + obj[x].route_long_name;

        $("#routes").append("<option value='" + obj[x].route_id + "'>" + route_name + "</option>");

        // Coloca as rotas em uma lista, para ser usada no typeahead
        listaRotas.push(route_name);

        //if ((route_name.search("Metr") > 0) || (route_name.search("metr") != -1)){
        //console.log("é metro ->" + route_name);
        //}
    }


};

// Draws a line between the points of shape
Generator.drawShapes = function(data) {

    obj = JSON.parse(data);

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
};

Generator.drawStopsNear = function(data) {

    obj = JSON.parse(data);
    /*
    for (var y = 0; y < 1; y++) {
      var marker = L.marker([obj[y].stop_lat, obj[y].stop_lon], {icon: redMarker}).bindPopup(Generator.drawStopsPopup(obj[y].stop_id, obj[y].stop_name, obj[y].stop_desc));
      markers.addLayer(marker);

    }

    map.addLayer(markers);
    */
    pontoEmbarque = obj[0].stop_name;
    var url = "http://127.0.0.1:8124/api/routesbystop?stop_id=" + obj[0].stop_id;
    console.log(url);
    get(url, "test");
};

function test(data) {
    obj = JSON.parse(data);

    //var url = "http://127.0.0.1:8124/api/shapes?agency_key=county-connection&route_id=" + obj[0].route_id + "&direction_id=0";
    //get(url, "shapes");

    url = "http://127.0.0.1:8124/api/stops?agency_key=county-connection&route_id=" + obj[0].route_id + "&direction_id=0";
    console.log(url);
    get(url, "stops");
}

// Draw stops on map
Generator.drawStops = function(data) {

    obj = JSON.parse(data);

    for (var y = 0; y < obj.length; y++) {
        var marker = L.marker([obj[y].stop_lat, obj[y].stop_lon], {
            icon: redMarker
        }).bindPopup(Generator.drawStopsPopup(obj[y].stop_id, obj[y].stop_name, obj[y].stop_desc));
        markers.addLayer(marker);

    }

    map.addLayer(markers);

};

// Draws the pop-up stopping points on the map
Generator.drawStopsPopup = function(stop_id, stop_name, stops_desc) {
    var html = "";

    html += "<div style='margin: 0px; padding: 0px;'><span>" + stop_id + "</span>" +
        "<h3 style='background-color: #3498db; color: white; padding: 1px;'>" + stop_name + "</h3>" +
        "<p>" + stops_desc + "</p></div>";

    return html;

};
