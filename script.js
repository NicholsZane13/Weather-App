var searchButton = document.querySelector(".button-search");
var searchInput = document.querySelector(".input-search");

var today = moment();

// Searches the users input and gets the lat and lon values
var getLonLat = function (city) {
  var city = searchInput.value;

  var apiUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=486c78dfbc77428bda2f01d26dcb88eb";

  fetch(apiUrl)
    .then(function(response) {
      if (response.ok) {
        response.json().then(function (lonLat) {
          searchLatLon(lonLat[0].lat, lonLat[0].lon);
          searchForecast(lonLat[0].lat, lonLat[0].lon);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to WeatherService");
    });
};

searchButton.addEventListener("click", getLonLat);
//Takes user input and finds the lat and lon
var searchLatLon = function(lat, lon) {
  var latInfo = lat;
  var lonInfo = lon;

  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?lat=" + latInfo + "&lon=" + lonInfo + "&appid=486c78dfbc77428bda2f01d26dcb88eb&units=imperial";

  fetch(apiUrl)
    .then(function(response) {
      if (response.ok) {
        response.json().then(function(weather) {
          displayWeather(weather);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      alert("Could not connect");
    });
};

//Shows weather for the user search
function displayWeather(info) {
  var todayCity = document.querySelector(".today-city");
  todayCity.textContent = info.name + today.format(" (MM-DD-YYYY)");
  var todayTemp = document.querySelector(".today-temp");
  todayTemp.textContent = "Temp: " + info.main.temp + "°F";
  var todayWind = document.querySelector(".today-wind");
  todayWind.textContent = "Wind: " + info.wind.speed + " MPH";
  var todayHumidity = document.querySelector(".today-humidity");
  todayHumidity.textContent = "Humidity: " + info.main.humidity + "%";
}

var searchForecast = function(lat, lon) {
  var latInfo = lat;
  var lonInfo = lon;

  var apiUrl =
    " https://api.openweathermap.org/data/2.5/forecast?lat=" + latInfo + "&lon=" + lonInfo + "&appid=486c78dfbc77428bda2f01d26dcb88eb&units=imperial";

  fetch(apiUrl)
    .then(function(response) {
      if (response.ok) {
        response.json().then(function (weather) {
          displayForecast(weather);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to WeatherService");
    });
};
//Displays forecast on the screen
function displayForecast(forecast) {
  var dateOne = document.querySelector(".date-one");
  var oneDate = forecast.list[4].dt;

  dateOne.textContent = moment.unix(oneDate).format("MM-DD-YYYY");
  var temperatureOne = document.querySelector(".temperature-one");
  temperatureOne.textContent = "Temp: " + forecast.list[4].main.temp_max + "°F";
  var windOne = document.querySelector(".wind-speed-one");
  windOne.textContent = "Wind: " + forecast.list[4].wind.speed + " MPH";
  humidityOne = document.querySelector(".humidity-one");
  humidityOne.textContent = "Humidity: " + forecast.list[4].main.humidity + "%";

  var dateTwo = document.querySelector(".date-two");
  var twoDate = forecast.list[12].dt;
  dateTwo.textContent = moment.unix(twoDate).format("MM-DD-YYYY");
  var temperatureTwo = document.querySelector(".temperature-two");
  temperatureTwo.textContent = "Temp: " + forecast.list[10].main.temp_max + "°F";
  var windTwo = document.querySelector(".wind-speed-two");
  windTwo.textContent = "Wind: " + forecast.list[10].wind.speed + " MPH";
  humidityTwo = document.querySelector(".humidity-two");
  humidityTwo.textContent = "Humidity: " + forecast.list[10].main.humidity + "%";

  var dateThree = document.querySelector(".date-three");
  threeDate = forecast.list[19].dt;
  dateThree.textContent = moment.unix(threeDate).format("MM-DD-YYYY");
  var temperatureThree = document.querySelector(".temperature-three");
  temperatureThree.textContent = "Temp: " + forecast.list[19].main.temp_max + "°F";
  var windThree = document.querySelector(".wind-speed-three");
  windThree.textContent = "Wind: " + forecast.list[19].wind.speed + " MPH";
  humidityThree = document.querySelector(".humidity-three");
  humidityThree.textContent = "Humidity: " + forecast.list[19].main.humidity + "%";

  var dateFour = document.querySelector(".date-four");
  fourDate = forecast.list[27].dt;
  dateFour.textContent = moment.unix(fourDate).format("MM-DD-YYYY");
  var temperatureFour = document.querySelector(".temperature-four");
  temperatureFour.textContent = "Temp: " + forecast.list[26].main.temp_max + "°F";
  var windFour = document.querySelector(".wind-speed-four");
  windFour.textContent = "Wind: " + forecast.list[26].wind.speed + " MPH";
  humidityFour = document.querySelector(".humidity-four");
  humidityFour.textContent = "Humidity: " + forecast.list[26].main.humidity + "%";

  var dateFive = document.querySelector(".date-five");
  fiveDate = forecast.list[35].dt;
  dateFive.textContent = moment.unix(fiveDate).format("MM-DD-YYYY");
  var temperatureFive = document.querySelector(".temperature-five");
  temperatureFive.textContent = "Temp: " + forecast.list[35].main.temp_max + "°F";
  var windFive = document.querySelector(".wind-speed-five");
  windFive.textContent = "Wind: " + forecast.list[35].wind.speed + " MPH";
  humidityFive = document.querySelector(".humidity-five");
  humidityFive.textContent = "Humidity: " + forecast.list[35].main.humidity + "%";
}

var searchHistory = document.querySelector(".search-history");

var check = [];
//Provides a button for the user to press and act as a search history
function showHistory() {
  searchHistory.innerHTML = "";
  for (let i = 0; i < check.length; i++) {
    const localHistory = check[i];

    var buttonHis = document.createElement("button");
    buttonHis.classList.add("btn");
    buttonHis.style.cursor = "pointer";
    buttonHis.textContent = localHistory;

    searchHistory.appendChild(buttonHis);
  }
  var historyButton = document.getElementsByClassName("btn");

  for (let i = 0; i < historyButton.length; i++) {
    historyButton[i].addEventListener("click", function (show) {
      show = historyButton[i].textContent;

      getHistory(show);
    });
  }
}

function init() {
  var storedHistory = JSON.parse(localStorage.getItem("weatherHistory"));

  if (storedHistory !== null) {
    check = storedHistory;
  }
  showHistory();
}

function storeHistory() {
  localStorage.setItem("weatherHistory", JSON.stringify(check));
}

searchButton.addEventListener("click", function (event) {
  event.preventDefault();

  var historyText = searchInput.value.trim();

  if (historyText === "") {
    return;
  }

  check.push(historyText);
  searchInput.value = "";
  storeHistory();
  showHistory();
});

init();
//searches the weather when user clicks on one of the search history buttons
var getHistory = function (search) {
  var apiUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    search +
    "&limit=1&appid=486c78dfbc77428bda2f01d26dcb88eb";

  fetch(apiUrl)
    .then(function(response) {
      if (response.ok) {
        response.json().then(function (hisLon) {
          searchLatLon(hisLon[0].lat, hisLon[0].lon);
          searchForecast(hisLon[0].lat, hisLon[0].lon);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to WeatherService");
    });
};