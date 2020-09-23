

$("#button-addon2").on("click", function () {
    var searchVal = $("#textArea").val().trim();
    var currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchVal + "&units=imperial&lang=en&appid=5ce031865428d05ef191fd459e73739b";
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchVal + "&units=imperial&lang=en&appid=5ce031865428d05ef191fd459e73739b";


    $.ajax({
        url: currentURL, method: "get"
    }).then(function (response) {
        console.log(response);

        // Creating Search History
        var listItemName = response.name;
        $("#citiesList").append("<li class='list-group-item'>" + listItemName + "</li>");
        // var searchHistory = $("#cititesList");
        // localStorage.setItem("search history", searchHistory);

        // adding current day title
        $("#currentCity").html(response.name + " " + response.dt + "<img id='weatherIcon' src='' alt='weather icon'>");
        var currentIcon = response.weather[0].icon;
        var iconURL = "http://openweathermap.org/img/w/" + currentIcon + ".png";

        // adding data to current day section
        $("#weatherIcon").attr("src", iconURL);
        $("#currentTemp").text("Temperature: " + response.main.temp + "°F");
        $("#currentHumidity").text("Humidity: " + response.main.humidity + "%");
        $("#currentWind").text("Wind Speed: " + response.wind.speed + " miles/hour");


        var lat = response.coord.lat
        var lon = response.coord.lon
        var oneCallURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=hourly,minutely&appid=552093bc5456756d8281c52651608db9";
        $.ajax({
            url: oneCallURL, method: "get"
        }).then(function (response) {
            console.log(response);
            
            // UV Index Color Coordination
            $("#currentUV").html("UV Index: " + "<span id='index'>" + response.current.uvi + "</span>");
            if (Math.round(response.current.uvi) <= 5) {
                $("#index").css("background color", "green")
            } else if (Math.round(response.current.uvi) > 5 && response.current.uvi <= 10) {
                $("#index").css("background color", "yellow")
            } else {
                $("#index").css("background color", "red");
            }
            // Wiriting Data to HTML
            $("#titleOne").text(response.daily[0].dt);
            $("#titleTwo").text(response.daily[1].dt);
            $("#titleThree").text(response.daily[2].dt);
            $("#titleFour").text(response.daily[3].dt);
            $("#titleFive").text(response.daily[4].dt);
            $("#tempOne").text("Temp: " + response.daily[0].temp.day + "°F");
            $("#tempTwo").text("Temp: " + response.daily[1].temp.day + "°F");
            $("#tempThree").text("Temp: " + response.daily[2].temp.day + "°F");
            $("#tempFour").text("Temp: " + response.daily[3].temp.day + "°F");
            $("#tempFive").text("Temp: " + response.daily[4].temp.day + "°F");
            $("#humidityOne").text("Humidity: " + response.daily[0].humidity + "%");
            $("#humidityTwo").text("Humidity: " + response.daily[1].humidity + "%");
            $("#humidityThree").text("Humidity: " + response.daily[2].humidity + "%");
            $("#humidityFour").text("Humidity: " + response.daily[3].humidity + "%");
            $("#humidityFive").text("Humidity: " + response.daily[4].humidity + "%");
        })
    });
  

   
});
