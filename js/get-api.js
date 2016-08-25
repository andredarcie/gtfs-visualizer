var vez = 0;
var url = "http://127.0.0.1:8000/api/agency?agency_id=SPTRANS";
get(url, "agency");

var url = "http://127.0.0.1:8000/api/routes?agency_id=SPTRANS";
get(url, "routes");


function get(url, type){
  $.ajax({
     url: url,
     dataType: 'text',
     crossDomain: true,
     type: 'GET',
     success: function (data) {
       trataResultado(data, type);
     }
  });
}

function trataResultado (data, type){

  switch (type){
    case 'agency':
     Generator.drawAgencyStop(data);
    break;
    case 'routes':
     Generator.drawRoutes(data);
    break;
    case 'return-routes':

    break;
    case 'shapes':
     Generator.drawShapes(data);
    break;
    case 'stops':
     Generator.drawStops(data);
    break;
    case 'stopsnear':
      Generator.drawStopsNear(data);
    break;
    case 'test':
      test(data);
    break;
  }

}

$("#rotas").click(function (){

 map.removeLayer(markers);
 markers = new L.FeatureGroup();

 var url = "http://127.0.0.1:8000/api/shapes?agency_key=SPTRANS&route_id=" + $( "#rotas option:selected" ).val() + "&direction_id=0";
 get(url, "shapes");

 var url = "http://127.0.0.1:8000/api/stops?agency_key=SPTRANS&route_id=" + $( "#rotas option:selected" ).val() + "&direction_id=0";
 console.log(url);
 get(url, "stops");

});
