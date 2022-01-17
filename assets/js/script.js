// api.openweathermap.org/data/2.5/weather?q=atlanta&appid=edf3074b6500804f4cfa9cdbb1eb129b
// above is api for current weather data

// api.openweathermap.org/data/2.5/forecast?q={city name}&appid=edf3074b6500804f4cfa9cdbb1eb129b
// above is api for 5 day weather forecast 



var cityFormEl = document.querySelector("#cityForm");
var cityNameInputEl = document.querySelector("#cityName");
var currentDayEl = document.querySelector("#currentDay");
var headingEl = document.querySelector("#heading");
var nextFiveEl = document.querySelector("#nextFive");
var cityBtnsEl = document.querySelector("#cityBtns")

var formSubmitHandler = function() {
    event.preventDefault();
    
    // get value from input element
    var city = cityNameInputEl.value.trim();

    if (city) {
        getCurrentWeather(city);
        cityNameInputEl.value = "";
    } else {
        alert("Please enter a City")
    }
};

var getCurrentWeather = function(city) {
    // format the openweather api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=edf3074b6500804f4cfa9cdbb1eb129b";

    // make a request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
        // pass in lat and long for the uvi index
            console.log(data, city);

            var nameEl = document.createElement("h2")
            nameEl.textContent = data.name
            currentDayEl.append(nameEl)       

            var tempEl = document.createElement("p");
            tempEl.textContent = "Temp: " + data.main.temp + "°F";
            currentDayEl.append(tempEl)

            var windEl = document.createElement("p");
            windEl.textContent = "Wind: " + data.wind.speed + " MPH";
            currentDayEl.append(windEl);

            var humidityEl = document.createElement("p");
            humidityEl.textContent = "Humidity: " + data.main.humidity + " %";
            currentDayEl.append(humidityEl)

            // putting uv index on page
            var uvEl = document.createElement("p");
            //uvEl.textContent = "UV Index: " + data.

            var button = document.createElement("button");
            button.classList.add("btn-block","btn","btn-secondary","mt-3","mb-3")
            button.textContent = city;
            cityBtnsEl.append(button)
        });
    });

    var apiFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=edf3074b6500804f4cfa9cdbb1eb129b"
    fetch(apiFiveDay).then(function(response) {
        response.json().then(function(data) {
            console.log(data)

            var fiveDayEl = document.createElement("h3")
            fiveDayEl.textContent = "5-Day Forecast:"
            headingEl.append(fiveDayEl)

            



            


            for (var i = 0; i < data.list.length; i++) {
                if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {

                    var day5 = document.createElement("div");
                    day5.classList.add("col-2","bg-primary","text-white","mr-4","ml-2");
                    nextFiveEl.append(day5);
                    //console.log(day5.classList)

                    var dailyWeather = data.list[i];
                    console.log(data.list[i])

                    var querySting = dailyWeather.dt_txt
                    var date = querySting.split(" ")[0];


                    var dateEl = document.createElement("h5")
                    dateEl.textContent = date  //dailyWeather.dt_txt;
                    day5.append(dateEl);

                    var fiveDayTemp = document.createElement("p");
                    fiveDayTemp.textContent = "Temp: " + dailyWeather.main.temp + "°F";;
                    day5.append(fiveDayTemp);

                    var fiveDayWind = document.createElement("p");
                    fiveDayWind.textContent = "Wind: " + dailyWeather.wind.speed + " MPH";
                    day5.append(fiveDayWind);

                    var fiveDayHumidity = document.createElement("p")
                    fiveDayHumidity.textContent = "Humidity: " + dailyWeather.main.humidity + "%";
                    day5.append(fiveDayHumidity)
                }
            }
        })
    })
};


// add event listeners to forms
cityFormEl.addEventListener("submit", formSubmitHandler);

//getCurrentWeather()