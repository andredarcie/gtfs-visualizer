function getApi(url, callback) {
    $.ajax({
        url: url,
        dataType: 'text',
        crossDomain: true,
        type: 'GET',
        success: function(data) {
            result(data, callback);
        }
    });
}

function result(data, callback) {
    callback(data);
}
