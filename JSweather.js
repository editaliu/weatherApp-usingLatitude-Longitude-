$(document).ready(function () {

    var city = "test";
    var unit = "metric";
    var apiKey = 'b86573efac7f1356d2e37b635803f799'; //YOU NEED YOUR OWN API KEY
    var url = "";
    var units = {
        "metric": {
            "apihandle": "metric",
            "windtext": "m/s",
            "temptext": "°C",
        },
        "imperial": {
            "apihandle": "imperial",
            "windtext": "miles/h",
            "temptext": "°F",
        }
    };
    var lat = "0";
    var lon = "0";


    //MORE PRECISELY (Locate and identify website visitors by IP address )
    //function getcity(unit) {
    //    $.getJSON("http://freegeoip.net/json/?callback=?", function (datas) {
    //        city = datas.city;
    //        getweather(unit);
    //    });
    //}

    function getcity(unit) {
        $.getJSON('https://ipapi.co/json/', function (datas) {
            lat = datas.latitude;
            lon = datas.longitude;

            getweather(unit, lat, lon);
        });
    }

    function weather() {
        var location = document.getElementById("location");

        function success(position) {
            function getcity(unit) {}
        }

        function error() {
            location.innerHTML = "Unable to retrieve your location";
        }
        location.innerHTML = "Locating...";
    }
    weather();

    function apiUrl(unit) {
        url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=" + unit + "";
    }

    function getweather(test) {
        apiUrl(test.apihandle);
        $.getJSON(url, function (data) {
            $.getJSON('https://ipapi.co/json/', function (data) {
                $('#location').html(data.city);
                $('#country').html("/ " + data.country)
            });
            var icon = data.weather[0].icon;
            var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
            $('#img').attr('src', iconurl);
            $('#desc').html(data.weather[0].description);
            $('#temp').html(data.main.temp + ' ' + test.temptext);
            $('#windspeed').html(data.wind.speed + ' ' + test.windtext);
            $('#clouds').html(data.clouds.all + ' %');
        });
    };

    $("#temp").click(function () {
        unit = unit === "imperial" ? "metric" : "imperial";
        if (unit === "imperial") {
            getweather(units.imperial);
        } else {
            getweather(units.metric);
        }
        //     unit = unit === "imperial" ? "metric" : "imperial"; // IF THIS WILL BE HERE, YOU NEED TO CLICK TWICE A BUTTON AT FIRST TIME AFTER LOAD
        if (unit == "metric") {
            $("#temp").text("°C");
        } else {
            $("#temp").text("°F");
        }
    });

    $(document).ready(function () {
        getcity(units.metric);
    });

});

document.body.style.backgroundColor = "#415403";
