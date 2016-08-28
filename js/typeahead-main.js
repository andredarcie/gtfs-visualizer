var substringMatcher = function(strs) {
    return function findMatches(q, cb) {
        var matches, substringRegex;

        // an array that will be populated with substring matches
        matches = [];

        // regex used to determine if a string contains the substring `q`
        substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function(i, str) {
            if (substrRegex.test(str)) {
                matches.push(str);
            }
        });

        cb(matches);
    };
};

$('#the-basics .typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 1
}, {
    name: 'listaRotas',
    source: substringMatcher(listaRotas)
});

$('.typeahead').on('typeahead:selected', function(evt, item) {

    var subString = item.split(":");
    //alert(subString[0]);

    map.removeLayer(markers);
    markers = new L.FeatureGroup();

    var url = "http://127.0.0.1:8124/api/shapes?agency_key=SPTRANS&route_id=" + subString[0] + "&direction_id=0";
    get(url, "shapes");

    url = "http://127.0.0.1:8124/api/stops?agency_key=SPTRANS&route_id=" + subString[0] + "&direction_id=0";
    console.log(url);
    get(url, "stops");
});
