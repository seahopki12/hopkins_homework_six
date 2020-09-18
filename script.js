

$("#button-addon2").on("click", function () {
    var cityID = $("#textArea").val();
    var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + cityID + "&appid=e031865428d05ef191fd459e73739b";
    $.ajax({
        url: queryURL, method: "get"
    }).then(function (response) {
        console.log(JSON.stringify(response));
    });
});
