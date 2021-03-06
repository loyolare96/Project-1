$(document).ready(function () {
    $('select').formSelect();
});
var date1 = $("#date");
var date2 = $("#date2");
var date3 = $("#date3");
var date4 = $("#date4");
var date5 = $("#date5");
function runAjax(search) {
    var weatherAPIKey = "&appid=c065128b5114e00c480ea5844e8f6cbd";
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + search + weatherAPIKey;

    $.ajax({
        url: weatherURL,
        method: "GET"
    }).then(function (response) {

    });
}


var seatGeekDiv = $("#seatGeekInfo");
function runAjax2(search) {
    var seatGeekID = "&client_id=MTA2Njg2NTZ8MTUxOTQxODkzNS44Ng"
    var state = $("#stateSelect :selected").val()

    var seatGeekURL = "https://api.seatgeek.com/2/events?" + seatGeekID + "&venue.city=" + search + "&venue.state=" + state + "&datetime_utc.gt="

    $.ajax({
        url: seatGeekURL,
        method: "GET"
    }).then(function (response) {

        var results = response.events;
        for (i = 0; i < results.length; i++) {
            var searchTime = moment(results[i].datetime_local).format("MMM Do YY");

            var tomorrow = moment().add(1, 'days');
            var searchTomorrow = moment(tomorrow).format("MMM Do YY");

            var twoDays = moment().add(2, 'days');
            var searchTwoDays = moment(twoDays).format("MMM Do YY");

            var threeDays = moment().add(3, 'days');
            var searchThreeDays = moment(threeDays).format("MMM Do YY");

            var fourDays = moment().add(4, 'days');
            var searchFourDays = moment(fourDays).format("MMM Do YY");

            var searchUrl = results[i].venue.url
            var address = results[i].venue.address
            var title = results[i].title
            var venueName = results[i].venue.name
            var eventTime = results[i].datetime_local

            imgTag = $("<img class='eventImages'>");
            newRow = $("<div class='row events'>");

            if (results[i].performers["0"].images.huge != null) {
                imgTag.attr("src", results[i].performers["0"].images.huge);
            }

            else {
                imgTag.attr("src", "assets/images/null.png");
            }

            imgTag.attr("id", "imagelol")
            newRow.append(imgTag);
            newRow.append("<br>");
            var titleString = String(title);
            newRow.append("<h5>" + titleString + "</h5>" + "<br>");
            if (address != null) {
                newRow.append("<h6>" + " Address: " + address + "</h6>" + "<br>")
                newRow.append("<h6>" + "Venue: " + venueName + "</h6>" + "<br>");
            }

            newRow.append("<h6>" + moment(eventTime).format('MMMM Do YYYY, h:mm:ss a') + "</h6>" + "<br>")

            if (searchUrl != null) {
                var urlString = String(searchUrl)
                newRow.append("<h6>" + '<a href="' + urlString + '"target="_blank">More Info</a>' + "</h6>");
            }
            if (moment().format("MMM Do YY") == (searchTime)) {
                $("#events").append(newRow);
            }
            else if (searchTomorrow == (searchTime)) {
                $("#events2").append(newRow);
            }
            else if (searchTwoDays == (searchTime)) {
                $("#events3").append(newRow);
            }
            else if (searchThreeDays == (searchTime)) {
                $("#events4").append(newRow)
            }
            else if (searchFourDays == (searchTime)) {
                $("#events5").append(newRow);
            }
            else {
                seatGeekDiv.append(newRow);
            }
        }
        if ($("#events").text().length == 0) {
            $("#events").append("<h6 class='noEvents'> There are no events planned for this date. </h6>");
        }

        if ($("#events2").text().length == 0) {
            $("#events2").append("<h6 class='noEvents'> There are no events planned for this date. </h6>");
        }

        if ($("#events3").text().length == 0) {
            $("#events3").append("<h6 class='noEvents'> There are no events planned for this date. </h6>");
        }

        if ($("#events4").text().length == 0) {
            $("#events4").append("<h6 class='noEvents'> There are no events planned for this date. </h6>");
        }

        if ($("#events5").text().length == 0) {
            $("#events5").append("<h6 class='noEvents'> There are no events planned for this date. </h6>");
        }

    })
}
var search = ''

$("#searchBtn").click(function () {
    $("#forecast").empty();
    seatGeekDiv.empty();
    $(".eventDates").empty();
    $(".dateLabel").empty();
    date1.prepend("<h3> Today: </h3>");
    date1.append("<div id='events' class='eventDates'>");

    date2.prepend("<h3> Tomorrow: </h3>");
    date2.append("<div id='events2' class='eventDates'>");

    date3.prepend("<h3> Two Days From Now: </h3>");
    date3.append("<div id='events3' class='eventDates'>");

    date4.prepend("<h3> Three Days From Now: </h3>");
    date4.append("<div id='events4' class='eventDates'>");

    date5.prepend("<h3> Four Days From Now: </h3>");
    date5.append("<div id='events5' class='eventDates'>");
    
    search = $("#searchBar").val();
    console.log(search);
    runAjax(search);
    runAjax2(search);
})

var searchButtonEnter = document.getElementById("searchBar");
searchButtonEnter.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("searchBtn").click();
    }
});