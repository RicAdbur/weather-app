var apiKey = "a061eb6370c867e1da420f61897c46e5"
var searchBar = document.getElementById("search-bar")
var searchButton = document.getElementById("search-button")
var currentWeatherEl = document.getElementById("current-weather")
var cityDisplayEl = document.getElementById("cityDisplay")
var currentDateEl = document.getElementById("current-date")
var iconDisplayEl = document.getElementById("current-icon-display")
var currentTempEl = document.getElementById("current-temp")
var currentHumEl = document.getElementById("current-hum")
var currentWindEl = document.getElementById("current-wind")


// fetch current weather from API
function getCurrentWeather(cityName) {
    fetch ("https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=imperial&appid="+apiKey)
        .then(function(response) {
            // console.log(response)
            return response.json()
        })
        .then(function(currentWeatherData) {
            displayCurrentWeather(currentWeatherData)
        })
    }
    
function displayCurrentWeather(currentWeatherData) {
    // adding values from API into DOM elements
    cityDisplayEl.innerText = searchBar.value
    currentTempEl.innerText = currentWeatherData.main.temp
    currentHumEl.innerText = currentWeatherData.main.humidity
    currentWindEl.innerText = currentWeatherData.wind.speed
    currentDateEl.innerText = currentWeatherData.dt

    var icon = document.createElement("img")
    icon.setAttribute("src", 'https://openweathermap.org/img/wn/'+currentWeatherData.weather[0].icon+'.png')
    iconDisplayEl.appendChild(icon)

    console.log(currentWeatherData)
}

// fetch 5-day forecast from API
function getForecast(cityName) {
    fetch ("https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&units=imperial&appid="+apiKey)
        .then(function(response) {
            // console.log(response)
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

// TODO Get icons from API and add them to cards
// TODO insert forecast data to forecast cards
// TODO Save previous searches in local storage
// TODO List previous searches below search bar