$(document).ready(function(){
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
            console.log(searchTime);
            var seatGeekDiv = $("#seatGeekInfo");
            var searchUrl = results[i].venue.url
            var address = results[i].venue.address
            var title = results[i].title
            var venueName = results[i].venue.name
            var eventTime = results[i].datetime_local
            console.log(moment(eventTime).format('MMMM Do YYYY, h:mm:ss'));
        
            console.log(title);
            console.log(address);
            console.log(searchUrl);
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
                newRow.append("<h6>" + " Address: "  + address + "</h6>" + "<br>")
                newRow.append("<h6>" + "Venue: "  + venueName + "</h6>" + "<br>");
            }
            newRow.append("<h6>" + moment(eventTime).format('MMMM Do YYYY, h:mm:ss') + "</h6>" + "<br>")

            if (searchUrl!= null) {
                var urlString = String(searchUrl)
                newRow.append("<h6>" + '<a href="' + urlString + '"target="_blank">More Info</a>' + "</h6>");
            }
            seatGeekDiv.append(newRow);
            newRow.addClass("whyNot");
            seatGeekDiv.append("<br>");

        }
    })
}
var search = ''

$("#searchBtn").click(function () {
    $("#seatGeekInfo").empty();
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
