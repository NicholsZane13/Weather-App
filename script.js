var city="";
// declaring the variables
var searchCity = $("#search-city");
var searchButton = $("#search-button");
var clearButton = $("#clear-history");
var currentCity = $("#current-city");
var currentTemperature = $("#temperature");
var currentHumidty= $("#humidity");
var currentWSpeed=$("#wind-speed");
var currentUvindex= $("#uv-index");
var sCity=[];

// searches the city to see if it exists in the entries from the storage
function find(c){
    for (var i=0; i<sCity.length; i++){
        if(c.toUpperCase()===sCity[i]){
            return -1;
        }
    }
    return 1;
}

var APIKey="d1d1c7bcb9ef6d0effd63fca0dd08d01";

// Display the current and future weather to the user after grabbing the city from the input text box.
function displayWeather(event){
    event.preventDefault();
    if (searchCity.val().trim()!=="") {
        city=searchCity.val().trim();
        currentWeather(city);
    }
}