//Getting All Stored Data
document.querySelector("#citiesList").innerHTML = sessionStorage.getItem("history");
document.querySelector("#currentCity").innerHTML = sessionStorage.getItem("current city");
document.querySelector("#currentTemp").innerHTML = sessionStorage.getItem("current temp");
document.querySelector("#currentHumidity").innerHTML = sessionStorage.getItem("current humidity");
document.querySelector("#currentWind").innerHTML = sessionStorage.getItem("current wind");
document.querySelector("#currentUV").innerHTML = sessionStorage.getItem("current uv");
document.querySelector("#titleOne").innerHTML = sessionStorage.getItem("title one");
document.querySelector("#titleTwo").innerHTML = sessionStorage.getItem("title two");
document.querySelector("#titleThree").innerHTML = sessionStorage.getItem("title three");
document.querySelector("#titleFour").innerHTML = sessionStorage.getItem("title four");
document.querySelector("#titleFive").innerHTML = sessionStorage.getItem("title five");
document.querySelector("#firstIcon").src = sessionStorage.getItem("icon one");
document.querySelector("#secondIcon").src = sessionStorage.getItem("icon two");
document.querySelector("#thirdIcon").src = sessionStorage.getItem("icon three");
document.querySelector("#fourthIcon").src = sessionStorage.getItem("icon four");
document.querySelector("#fifthIcon").src = sessionStorage.getItem("icon five");
document.querySelector("#tempOne").innerHTML = sessionStorage.getItem("temp one");
document.querySelector("#tempTwo").innerHTML = sessionStorage.getItem("temp two");
document.querySelector("#tempThree").innerHTML = sessionStorage.getItem("temp three");
document.querySelector("#tempFour").innerHTML = sessionStorage.getItem("temp four");
document.querySelector("#tempFive").innerHTML = sessionStorage.getItem("temp five");
document.querySelector("#humidityOne").innerHTML = sessionStorage.getItem("humidity one");
document.querySelector("#humidityTwo").innerHTML = sessionStorage.getItem("humidity two");
document.querySelector("#humidityThree").innerHTML = sessionStorage.getItem("humidity three");
document.querySelector("#humidityFour").innerHTML = sessionStorage.getItem("humidity four");
document.querySelector("#humidityFive").innerHTML = sessionStorage.getItem("humidity five");

$("#button-addon2").on("click", function () {
    var searchVal = $("#textArea").val().trim();
    var currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchVal + "&units=imperial&lang=en&appid=5ce031865428d05ef191fd459e73739b";



    // first API call
    $.ajax({
        url: currentURL, method: "get"
    }).then(function (response) {
        console.log(response);

        // Creating Search History
        var listItemName = response.name;
        $("#citiesList").append("<li class='list-group-item'>" + listItemName + "</li>");
        var history = document.querySelector("#citiesList");
        sessionStorage.setItem("history", history.innerHTML);

        // adding current day title
        $("#currentCity").html(response.name + " " + response.dt + "<img id='weatherIcon' src='' alt='weather icon'>");
        var currentIcon = response.weather[0].icon;
        var iconURL = "http://openweathermap.org/img/w/" + currentIcon + ".png";

        // adding data to current day section
        $("#weatherIcon").attr("src", iconURL);
        $("#currentTemp").text("Temperature: " + response.main.temp + "°F");
        $("#currentHumidity").text("Humidity: " + response.main.humidity + "%");
        $("#currentWind").text("Wind Speed: " + response.wind.speed + " miles/hour");

        // storing all the current day data
        var currentCity = document.querySelector("#currentCity");
        var currentTemp = document.querySelector("#currentTemp");
        var currentHumidity = document.querySelector("#currentHumidity");
        var currentWind = document.querySelector("#currentWind");

        sessionStorage.setItem("current city", currentCity.innerHTML);
        sessionStorage.setItem("current temp", currentTemp.innerHTML);
        sessionStorage.setItem("current humidity", currentHumidity.innerHTML);
        sessionStorage.setItem("current wind", currentWind.innerHTML);

        console.log(sessionStorage);

        // declaring variables for second API call
        var lat = response.coord.lat
        var lon = response.coord.lon
        var oneCallURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=hourly,minutely&appid=552093bc5456756d8281c52651608db9";

        // second API call
        $.ajax({
            url: oneCallURL, method: "get"
        }).then(function (response) {
            console.log(response);

            // UV Index Info
            $("#currentUV").html("UV Index: " + "<span id='index'>" + response.current.uvi + "</span>");
            var currentUV = document.querySelector("#currentUV");
            sessionStorage.setItem("current uv", currentUV.innerHTML);

            // UV Index Color Coordination
            if (response.current.uvi <= 5) {
                $("#index").css("background color", "green")
            } else if (response.current.uvi > 5 && response.current.uvi <= 10) {
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
            $("#firstIcon").attr("src", "http://openweathermap.org/img/w/" + response.daily[0].weather[0].icon + ".png");
            $("#secondIcon").attr("src", "http://openweathermap.org/img/w/" + response.daily[1].weather[0].icon + ".png");
            $("#thirdIcon").attr("src", "http://openweathermap.org/img/w/" + response.daily[2].weather[0].icon + ".png");
            $("#fourthIcon").attr("src", "http://openweathermap.org/img/w/" + response.daily[3].weather[0].icon + ".png");
            $("#fifthIcon").attr("src", "http://openweathermap.org/img/w/" + response.daily[4].weather[0].icon + ".png");
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


            // storing forecast data to local storage
            sessionStorage.setItem("title one", document.querySelector("#titleOne").innerHTML);
            sessionStorage.setItem("title two", document.querySelector("#titleTwo").innerHTML);
            sessionStorage.setItem("title three", document.querySelector("#titleThree").innerHTML);
            sessionStorage.setItem("title four", document.querySelector("#titleFour").innerHTML);
            sessionStorage.setItem("title five", document.querySelector("#titleFive").innerHTML);
            sessionStorage.setItem("icon one", document.querySelector("#firstIcon").src);
            sessionStorage.setItem("icon two", document.querySelector("#secondIcon").src);
            sessionStorage.setItem("icon three", document.querySelector("#thirdIcon").src);
            sessionStorage.setItem("icon four", document.querySelector("#fourthIcon").src);
            sessionStorage.setItem("icon five", document.querySelector("#fifthIcon").src);
            sessionStorage.setItem("temp one", document.querySelector("#tempOne").innerHTML);
            sessionStorage.setItem("temp two", document.querySelector("#tempTwo").innerHTML);
            sessionStorage.setItem("temp three", document.querySelector("#tempThree").innerHTML);
            sessionStorage.setItem("temp four", document.querySelector("#tempFour").innerHTML);
            sessionStorage.setItem("temp five", document.querySelector("#tempFive").innerHTML);
            sessionStorage.setItem("humidity one", document.querySelector("#humidityOne").innerHTML);
            sessionStorage.setItem("humidity two", document.querySelector("#humidityTwo").innerHTML);
            sessionStorage.setItem("humidity three", document.querySelector("#humidityThree").innerHTML);
            sessionStorage.setItem("humidity four", document.querySelector("#humidityFour").innerHTML);
            sessionStorage.setItem("humidity five", document.querySelector("#humidityFive").innerHTML);
        })
    });
});

