document.getElementById("weatherSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("weatherInput").value;
    if (value === "")
      return;
    console.log(value);
    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=bf0ea9fa59a8408e2ced01d2c9cd9eae";
    fetch(url)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        /*results for weather*/
        console.log(json)
        let results = "<div id='current'>";
        results += '<h1>Weather in </br><strong>' + json.name + "</strong></h1>";
        results += "<div id='temp'>"
        for (let i=0; i < json.weather.length; i++) {
	        results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
        }
        results += '<h2>' + json.main.temp + " &deg;F</h2>"
        results +="</div>"
        results += "<h2>"
        for (let i=0; i < json.weather.length; i++) {
	        results += json.weather[i].description
	        if (i !== json.weather.length - 1)
	            results += ", "
        }
        results += "</h2>";
        results += "</div>";
        document.getElementById("weatherResults").innerHTML = results;
        /*results for cityInfo*/
        let results2 = "<div id='city'>";
        results2 += '<h1>Additional Info:</h1>';
        results2 += '<h2>Feels Like: ' + json.main.feels_like + " &deg;F</h2>";
        results2 += '<h2>Humidity: ' + json.main.humidity + "%</h2>";
        results2 += '<h2>Pressure: ' + json.main.pressure + " mb</h2>";
        results2 += '<h2>Wind Speed: ' + json.wind.speed + " mph</h2>";
        results2 += '<div id="moreInfo"></div>'
        results2 += "</div>";
        document.getElementById("cityInfo").innerHTML = results2;
    });
    const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=bf0ea9fa59a8408e2ced01d2c9cd9eae";
    fetch(url2)
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            let forecast = "";
            console.log(json)
            for (let i=0; i < json.list.length; i++) {
                forecast += "<div id='hourly'>";
                forecast += "<h2>" + moment(json.list[i].dt_txt).format('MMM Do: h:mm a') + "</h2>";
                forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
                forecast += "<h1>" + Math.round(json.list[i].main.temp) + " &deg;F</h1>";
                forecast += "</div>";
            }
            document.getElementById("forecastResults").innerHTML = forecast;
            /*results for cityInfo*/
            let results2 = "";
            results2 += '<h2>Sunrise: ' + moment(json.city.sunrise*1000).format('h:mm:ss a') + "</h2>";
            results2 += '<h2>Sunset: ' + moment(json.city.sunset*1000).format('h:mm:ss a') + "</h2>";
            document.getElementById("moreInfo").innerHTML = results2;
        });
  });