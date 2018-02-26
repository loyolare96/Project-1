function runAjax(search) {


    var weatherAPIKey = "&appid=c065128b5114e00c480ea5844e8f6cbd";


    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + search + weatherAPIKey;

    $.ajax({
        url: weatherURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

    });
}
function runAjax2(search) {
    var seatGeekID = "&client_id=MTA2Njg2NTZ8MTUxOTQxODkzNS44Ng"

    var seatGeekURL = "https://api.seatgeek.com/2/events?" + seatGeekID + "&venue.city=" + search

    $.ajax({
        url: seatGeekURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var results = response.events;
        var seatGeekDiv = $("#seatGeekInfo");
        for (i = 0; i < results.length; i++) {
            console.log(results[i].title);
            console.log(results[i].venue.address);
            console.log(results[i].url);
            if (results[i].performers["0"].images.huge != null){
                seatGeekDiv.append("<img src='" + results[i].performers["0"].images.huge + "'</img>" + "<br>");
            }
            else {
                seatGeekDiv.append("<img src='assets/images/null.png'" + "</img>" + "<br>")
            }
            seatGeekDiv.append("Title: " + results[i].title + "<br>");
            seatGeekDiv.append("Time: " + results[i].datetime_local + "<br>")
            if (results[i].venue.address != null) {
                seatGeekDiv.append(" Address: " + results[i].venue.address + "<br>" + " Venue: " + results[i].venue.name + "<br>");
            }
            if (results[i].url != null) {
                seatGeekDiv.append(" URL: " + results[i].url);
            }
            seatGeekDiv.append("<br>");

        }
    })
}
var search = ''

$("button").click(function () {
    $("#seatGeekInfo").empty();
    search = $("#searchBar").val();
    console.log(search);
    runAjax(search);
    runAjax2(search);
})