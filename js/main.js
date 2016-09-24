var settings = {
  api_url: "http://127.0.0.1:8000/api/",
  agency_id: "SPTRANS"
};

start();

function start(){

  var api_url = settings.api_url;
  var agency_id = settings.agency_id;
  var url = "";

  url = api_url + "agency?agency_id=" + agency_id;
  getApi(url, Generator.drawAgencyStop);

  url = api_url + "routes?agency_id=" + agency_id;
  getApi(url, Generator.drawRoutesList);

}

$("#routes").change(function() {

  var route_id = $("#routes option:selected").val();
  drawSelectedRoute(route_id);

});

function drawSelectedRoute(route_id) {

  var api_url = settings.api_url;
  var agency_id = settings.agency_id;
  var direction_id = "0";
  var url = "";

  map.removeLayer(markers);
  markers = new L.FeatureGroup();

  url = api_url + "shapes?agency_key=" + agency_id + "&route_id=" + route_id + "&direction_id=" + direction_id;
  getApi(url, Generator.drawShapes);

  url = api_url + "stops?agency_key=" + agency_id + "&route_id=" + route_id + "&direction_id=" + direction_id;
  getApi(url, Generator.drawStops);

}
