$(document).ready(function () {
    $('select').formSelect();
});

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
    var state = $("#stateSelect :selected").val()

    var seatGeekURL = "https://api.seatgeek.com/2/events?" + seatGeekID + "&venue.city=" + search + "&venue.state=" + state + "&datetime_utc.gt="

    $.ajax({
        url: seatGeekURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var results = response.events;
        for (i = 0; i < results.length; i++) {
            searchTime = moment(results[i].datetime_local).format("MMMM Do YYYY, h:mm:ss a");
            var datePlaceholderXD = moment(results[i].datetime_local).format("MMM Do YY");
            var tomorrow = moment().add(1, 'days');
            var tomorrowPlaceholder = moment(tomorrow).format("MMM Do YY");
            var twoDays = moment().add(2, 'days');
            var twoDaysPlaceholder = moment(twoDays).format("MMM Do YY");
            var threeDays = moment().add(3, 'days');
            var threeDaysPlaceholder = moment(threeDays).format("MMM Do YY");
            var fourDays = moment().add(4, 'days');
            var fourDaysPlaceholder = moment(fourDays).format("MMM Do YY");
            var seatGeekDiv = $("#seatGeekInfo");
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
                var addressString = String(address)
                var nameString = String(venueName)
                newRow.append("<h6>" + " Address: " + address + "</h6>" + "<br>")
                newRow.append("<h6>" + "Venue: " + venueName + "</h6>" + "<br>");
            }
            newRow.append("<h6>" + moment(eventTime).format('MMMM Do YYYY, h:mm:ss a') + "</h6>" + "<br>")
            if (searchUrl != null) {
                var urlString = String(searchUrl)
                newRow.append("<h6>" + '<a href="' + urlString + '"target="_blank">More Info</a>' + "</h6>");
            }
            if (moment().format("MMM Do YY") == (datePlaceholderXD)) {
                $("#date").append(newRow);
            }
            else if (tomorrowPlaceholder == (datePlaceholderXD)){
                $("#date2").append(newRow);
            }
            else if (twoDaysPlaceholder == (datePlaceholderXD)){
                $("#date3").append(newRow);
            }
            else if (threeDaysPlaceholder == (datePlaceholderXD)){
                $("#date4").append(newRow)
            }
            else if (fourDaysPlaceholder == (datePlaceholderXD)){
                $("#date5").append(newRow);
            }
            else {
                seatGeekDiv.append(newRow);
            }
            newRow.addClass("whyNot");
            seatGeekDiv.append("<br>");
            
        }
    })
}
var search = ''

$("#searchBtn").click(function () {
    $("#seatGeekInfo").empty();
    $("#date").empty();
    $("#date").append("<h3> Today: </h3>");
    $("#date2").empty();
    $("#date2").append("<h3> Tomorrow: </h3>");
    $("#date3").empty();
    $("#date3").append("<h3> Two Days From Now: </h3>");
    $("#date4").empty();
    $("#date4").append("<h3> Three Days From Now: </h3>");
    $("#date5").empty();
    $("#date5").append("<h3> Four Days From Now: </h3>");
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

function getTheDate() {
    var d = new Date();
    var n = d.getDate();
    return n;
}