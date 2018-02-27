
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

    var seatGeekURL = "https://api.seatgeek.com/2/events?" + seatGeekID + "&venue.city=" + search

    $.ajax({
        url: seatGeekURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var results = response.events;
        for (i = 0; i < results.length; i++) {
            var seatGeekDiv = $("#seatGeekInfo");
            console.log(results[i].title);
            console.log(results[i].venue.address);
            console.log(results[i].url);
            imgTag = $("<img>");
            newRow = $("<div class='row'>");
            
            if (results[i].performers["0"].images.huge != null) {
                imgTag.attr("src", results[i].performers["0"].images.huge);
            }
            else {
                imgTag.attr("src", "assets/images/null.png");
            }
            imgTag.attr("id", "imagelol")
            newRow.append(imgTag);
            newRow.append("<br>");
            newRow.append("Title: " + results[i].title + "<br>");
            newRow.append("Time: " + results[i].datetime_local + "<br>")
            if (results[i].venue.address != null) {
                newRow.append(" Address: " + results[i].venue.address + "<br>" + " Venue: " + results[i].venue.name + "<br>");
            }
            if (results[i].url != null) {
                newRow.append(" URL: " + results[i].url);
            }
            seatGeekDiv.append(newRow);
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

var searchButtonEnter = document.getElementById("searchBar");
searchButtonEnter.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("searchButton").click();
    }
});
