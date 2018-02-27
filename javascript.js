function runAjax(search) {


    var weatherAPIKey = "&appid=c065128b5114e00c480ea5844e8f6cbd";


    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + search + weatherAPIKey;

    $.ajax({
        url: weatherURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });

    var weatherURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + search+",us" + weatherAPIKey
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
  
      for(var j = i; j<response.list.length; j = j+8) {
          console.log(j);
          var main = response.list[j].main;
          console.log(main);
      }
  
  });

    var seatGeekID = "&client_id=MTA2Njg2NTZ8MTUxOTQxODkzNS44Ng"

    var seatGeekURL = "https://api.seatgeek.com/2/venues?" + seatGeekID + "&city=" + search

    $.ajax({
        url: seatGeekURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    })

}


var search = ''

$("button").click(function () {
    search = $("#searchBar").val();
    console.log(search);
    runAjax(search);
})