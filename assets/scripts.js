// global variables
var apiKey = "a061eb6370c867e1da420f61897c46e5"
var searchBar = document.getElementById("search-bar")
var searchButton = document.getElementById("search-button")
var searchHistoryEl = document.getElementById("search-history")
var currentWeatherEl = document.getElementById("current-weather")
var cityDisplayEl = document.getElementById("cityDisplay")
var currentDateEl = document.getElementById("current-date")
var iconDisplayEl = document.getElementById("current-icon-display")
var currentTempEl = document.getElementById("current-temp")
var currentHumEl = document.getElementById("current-hum")
var currentWindEl = document.getElementById("current-wind")
var searchFormEl = document.getElementById("search-form")


// fetch current weather from API
function getCurrentWeather(cityName) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey)
        .then(function (response) {
            // console.log(response)
            return response.json()
        })
        .then(function (currentWeatherData) {
            displayCurrentWeather(currentWeatherData)
            // console.log(currentWeatherData)
        })
}


// adding currentWeatherData into DOM elements
function displayCurrentWeather(currentWeatherData) {
    cityDisplayEl.innerText = currentWeatherData.name
    currentTempEl.innerText = currentWeatherData.main.temp
    currentHumEl.innerText = currentWeatherData.main.humidity
    currentWindEl.innerText = currentWeatherData.wind.speed
    currentDateEl.innerText = currentWeatherData.dt
    // create <img> element for icons from API and append into DOM
    iconDisplayEl.innerHTML = ""
    var icon = document.createElement("img")
    icon.setAttribute("src", 'https://openweathermap.org/img/wn/' + currentWeatherData.weather[0].icon + '@2x.png')
    iconDisplayEl.appendChild(icon)

    // console.log(currentWeatherData)
}

// fetch 5-day forecast from API
function getForecast(cityName) {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + apiKey)
        .then(function (response) {
            // console.log(response)
            return response.json()
        })
        .then(function (forecastData) {
            console.log(forecastData)
        })
}

// grab text from search input
searchFormEl.addEventListener("submit", function (e) {
    e.preventDefault()
    // call for current weather using city name
    var inputValue = searchBar.value
    getCurrentWeather(inputValue)
    getForecast(inputValue)
    saveSearchHistory(inputValue)
    makeSearchHistory()
})

function makeSearchHistory() {
    searchHistoryEl.innerHTML = ""
    var localStorageItems = JSON.parse(localStorage.getItem("searchHistory"))
    // console.log(localStorageItems)
    for (var i = 0; i < localStorageItems.length - 1; i++) {
        var cityButton = document.createElement("button");
        cityButton.classList.add("btn", "btn-outline-primary", "mb-2")
        cityButton.style.display = "block"
        cityButton.innerText = localStorageItems[i]
        searchHistoryEl.appendChild(cityButton)
    }
}

searchHistoryEl.addEventListener("click", function (e) {
    if (e.target.matches(".btn")) {
        getCurrentWeather(e.target.innerText)
    }
})

function saveSearchHistory() {
    var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || []
    var inputValue = searchBar.value
    if (!searchHistory.includes(inputValue)) {
        searchHistory.push(inputValue)
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory))
    }
}

makeSearchHistory()

// TODO [ ] Get icons from API and add them to cards
// TODO [ ] insert forecast data to forecast cards (loop?)
// TODO [ ] Save previous searches in local storage
// TODO [X] List previous searches below search bar
// TODO [ ] Make search history buttons perform searches for listed city