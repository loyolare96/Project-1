

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
    var state = $("#stateSelect :selected").val()


    var seatGeekID = "&client_id=MTA2Njg2NTZ8MTUxOTQxODkzNS44Ng"

    var seatGeekURL = "https://api.seatgeek.com/2/venues?" + seatGeekID + "&city=" + search + "&state=" + state

    $.ajax({
        url: seatGeekURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    })

}


var search = ''

$("button").click(function () {
    search = $("#searchBar").val(),
    
    runAjax(search);
    runAjax2(search);
    


})