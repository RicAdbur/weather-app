var apiKey = "a061eb6370c867e1da420f61897c46e5"
var searchBar = document.getElementById("search-bar")
var searchButton = document.getElementById("search-button")

var sunny = "☀"


// fetch 5-day forecast from API
function getForecast(cityName) {
    fetch ("https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&appid="+apiKey)
        .then(function(response) {
            console.log(response)
            return response.json()
        })
        .then(function(forecastData) {
            console.log(forecastData)
        })
}

// fetch current weather from API
function getCurrentWeather(cityName) {
    fetch ("https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+apiKey)
        .then(function(response) {
            console.log(response)
            return response.json()
        })
        .then(function(forecastData) {
            console.log(forecastData)
        })
}

// grab text from search input
searchButton.addEventListener("click", function() {
    var inputValue = searchBar.value
    // call for current weather using city name
    getCurrentWeather(inputValue)
    getForecast(inputValue)
})