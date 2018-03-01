var arr = ["Today", "Tomorrow", "2 Days From Now", "3 Days From Now", "4 Days From Now"]

function runAjax(search) {

    var weatherAPIKey = "&appid=c065128b5114e00c480ea5844e8f6cbd";


    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + search + weatherAPIKey;

    $.ajax({
        url: weatherURL,
        method: "GET"
    }).then(function (response) {

    });

    var weatherURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + search + ",us&units=imperial" + weatherAPIKey
    $.ajax({
        url: weatherURL2,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var i = -1;
        var h;
        do {
            i++;
            var dateTime = response.list[i].dt * 1000;
            var newDate = new Date(dateTime);
            h = newDate.getHours()
        }
        while (!(h == 15 || h == 16 || h == 17));
        console.log(i);

        for (var j = i; j < response.list.length; j = j + 8) {
            console.log(j);
            var temp = response.list[j].main.temp;
            var humidity = response.list[j].main.humidity;
            var wind = response.list[j].wind.speed;
            var weatherDiv = $("<div class = 'weatherDiv'>");
            var dayTitle = arr[i++]
            var weatherDesc = response.list[j].weather["0"].main; 
            weatherDiv.append("<h6 class = 'bold'>" + dayTitle + "</h6>" + "<br>");

            console.log(weatherDesc);

            weatherDiv.append("<p>" + "Temp: " + temp + " F" + "</p>" + "<br>");
            weatherDiv.append("<p>" + "Humidity: " + humidity + " %" + "</p>" + "<br>");
            weatherDiv.append("<p>" + "Wind: " + wind + " mph" + "</p>" + "<br>");

            if (weatherDesc == "Clouds") {
                weatherDiv.prepend("assets/");
            }
            if (weatherDesc == "Rain") {
                weatherDiv.addClass("rain");
            }

            $("#forecast").append(weatherDiv);

        }

    });
}