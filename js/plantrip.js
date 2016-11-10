var settings = {
    api_url: "http://127.0.0.1:8000/api/",
    agency_id: "SPTRANS"
};

var Plantrip = {};

map.on('click', function(e) {
    Plantrip.eventClickMapa(e);
});

// Criando camada para plantrip
var planTripLayer = new L.FeatureGroup();
map.addLayer(planTripLayer);

var estadoAtual = "partida";

// Setando a mensagem inicial
$(".plantrip-message").html("<strong>Info!</strong> Toque no mapa para escolher o ponto de partida!");

var vez = 0;
var url = "http://127.0.0.1:8124/api/agency";
//get(url, "agency");

startPlanTrip();

function startPlanTrip() {

    var api_url = settings.api_url;
    var agency_id = settings.agency_id;
    var url = "";

    // Draw the agency stop on map
    url = api_url + "agency?agency_id=" + agency_id;
    getApi(url, Generator.drawAgencyStop);

}

Plantrip.eventClickMapa = function(e) {

    // Cria o marcador dinamico apartir do evento de click
    var marcadorDinamico = e.latlng;

    // Formata lat e lng para o padrão da API GTFS
    var lat = e.latlng.lat.toFixed(6);
    var lng = e.latlng.lng.toFixed(6);

    //Plantrip.getRotasProximas(lat, lng);

    switch (estadoAtual) {
        case "partida":

            var url = "http://127.0.0.1:8000/api/stopsnear?lat=" + lat + "&lon=" + lng + "&radius=1";
            //get(url, "stopsnear");
            getApi(url, Generator.drawStopsNear);

            var marker = new L.marker(marcadorDinamico, {
                icon: partidaMarker
            }).bindPopup("<span>Partida</span>");

            $("#from").val("Ponto de Partida");

            planTripLayer.addLayer(marker);
            map.addLayer(planTripLayer);

            $(".plantrip-message").html("<strong>Info!</strong> Toque no mapa para escolher o ponto de chegada!");

            //estadoAtual = "chegada";
            estadoAtual = "reiniciar";
            Plantrip.criaTrajeto();
            break;
        case "chegada":

            marker = L.marker(marcadorDinamico, {
                icon: chegadaMarker
            }).bindPopup("<span>Chegada</span>");
            $("#to").val("Ponto de Chegada");


            planTripLayer.addLayer(marker);
            map.addLayer(planTripLayer);

            Plantrip.criaTrajeto();

            $(".plantrip-message").html("<strong>Info!</strong> Toque novamente no mapa para reiniciar!");

            estadoAtual = "reiniciar";
            break;
        case "reiniciar":

            bootbox.confirm("Are you sure?", function(result) {

                if (result === true) {

                    // Remove a layer que contem o ponto de partida e chegada
                    map.removeLayer(planTripLayer);
                    planTripLayer = new L.FeatureGroup();

                    // Remove a layer que contem os pontos da linha
                    map.removeLayer(markers);
                    markers = new L.FeatureGroup();

                    // Limpa o html
                    $("#melhoresLinhas").html("");
                    $("#from").val("");
                    $("#to").val("");

                    $(".plantrip-message").html("<strong>Info!</strong> Toque no mapa para escolher o ponto de partida!");

                    estadoAtual = "partida";
                }
            });

            break;
    }
};

Plantrip.criaTrajeto = function() {

    var saida = "";

    var nomeLinha = "Linha Exemplo";
    //pontoEmbarque = "Rua Exemplo Embarque";
    var boarding_stop = settings.boarding_stop;
    var pontoDesembarque = "Rua Exemplo Desembarque";
    var pontoChegada = "Rua Exemplo Chegada";
    var tarifaTotal = "11,11";

    /*
    saida = "<tr><th>TRAJETO</th></tr>" +
        "<tr> <td> 1. Caminhe até o ponto: <br> <span style='color: #2ecc71; font-weight: bold;'> <i class='fa fa-map-marker' aria-hidden='true'></i> " + boarding_stop + "</span>. </td> </tr>" +
        "<tr> <td> 2. Pegue a Linha: " + nomeLinha + " </td> </tr>" +
        "<tr> <td> Horarios. Linhas Alternativas </td> </tr>" +
        "<tr> <td> Desembarque no ponto: <br> <span style='color: #e74c3c; font-weight: bold;'> <i class='fa fa-map-marker' aria-hidden='true'></i> " + pontoDesembarque + "</span>. </td> </tr>" +
        "<tr> <td> Caminhe até a " + pontoChegada + " </td> </tr>" +
        "<tr> <td> Tarifa Total: R$ " + tarifaTotal + " </td> </tr>";
     */

     saida = "<tr><th>TRAJETO</th></tr>" +
         "<tr> <td> 1. Caminhe até o ponto: <br> <span style='color: #2ecc71; font-weight: bold;'> <i class='fa fa-map-marker' aria-hidden='true'></i> " + boarding_stop + "</span>. </td> </tr>" +
         "<tr> <td> 2. Pegue a Linha: " + nomeLinha + " </td> </tr>";

    console.log("Boarding_stop: " + settings.boarding_stop);

    $("#melhoresLinhas").html(saida);
};

Plantrip.getRotasProximas = function(lat, long) {

    var url = "http://127.0.0.1:8000/api/routesByDistance?lat=" + lat + "&lon=" + long + "&radius=1";

    console.log(url);

    $.ajax({
        url: url,
        dataType: 'text',
        crossDomain: true,
        type: 'GET',
        success: function(data) {
            obj = JSON.parse(data);

            console.log("Melhores rotas: ");
            var saida = "<tr><th>Melhores Linhas</th></tr>";

            for (var i = 0; i < 5; i++) {
                var route_long_name = (typeof obj[i].route_long_name === "undefined") ? "" : obj[i].route_long_name;
                saida += "<tr><td><span style='font-size: 12px'>" + obj[i].route_id + " <i class='fa fa-external-link' aria-hidden='true'></i> </span><p>" + route_long_name + "</p></td></tr>";
                //console.log("> " + obj[i].route_long_name);
            }
            $("#melhoresLinhas").html(saida);
        }
    });
};
