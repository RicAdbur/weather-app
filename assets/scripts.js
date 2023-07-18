// global variables
var apiKey = "a061eb6370c867e1da420f61897c46e5"
var searchBar = document.getElementById("search-bar")
var searchButton = document.getElementById("search-button")
var searchHistoryEl = document.getElementById("search-history")
var currentWeatherEl = document.getElementById("current-weather")
var cityDisplayEl = document.getElementById("cityDisplay")
var iconDisplayEl = document.getElementById("current-icon-display")
var currentTempEl = document.getElementById("current-temp")
var currentHumEl = document.getElementById("current-hum")
var currentWindEl = document.getElementById("current-wind")
var searchFormEl = document.getElementById("search-form")
var forecastCards = document.querySelectorAll("#forecast-area .card")


// fetch current weather from API
function getCurrentWeather(cityName) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=imperial&appid=" + apiKey)
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
    // create <img> element for icons from API and append into DOM
    iconDisplayEl.innerHTML = ""
    var icon = document.createElement("img")
    icon.setAttribute("src", 'https://openweathermap.org/img/wn/'+currentWeatherData.weather[0].icon+'@2x.png')
    iconDisplayEl.appendChild(icon)

    // console.log(currentWeatherData)
}

// fetch 5-day forecast from API
function getForecast(cityName) {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&units=imperial&appid=" + apiKey)
        .then(function (response) {
            // console.log(response)
            return response.json()
        })
        .then(function (forecastData) {
            displayForecast(forecastData)
            // console.log(forecastData)
            // console.log(forecastData.list)
        })
}

// add 5-day forecast data into DOM elements
function displayForecast(forecastData) {
    
    var forecastDataArray = forecastData.list
    // empty array that will hold only the data selected by the following loop
    var trackedWeatherDataObjects = []
    // loop that selects only the data from the next 5 days at noon
    for (let i = 0; i < forecastDataArray.length; i++) {
        var forecastTime = forecastData.list[i].dt_txt.split(" ")[1].split(":")[0]
        if (forecastTime == 12) {
            trackedWeatherDataObjects.push(forecastData.list[i])
        }

    }
    // add data into DOM elements
    for (let i = 0; i < trackedWeatherDataObjects.length; i++) {
        var card = forecastCards[i]
        var forecastDate = trackedWeatherDataObjects[i].dt_txt.split(" ")[0]
        card.querySelector(".temp").innerText = trackedWeatherDataObjects[i].main.temp
        card.querySelector(".humidity").innerText = trackedWeatherDataObjects[i].main.humidity
        card.querySelector(".wind").innerText = trackedWeatherDataObjects[i].wind.speed
        card.querySelector(".card-title").innerText = forecastDate
        card.querySelector("img").setAttribute("src", "https://openweathermap.org/img/wn/"+trackedWeatherDataObjects[i].weather[0].icon+"@2x.png")
        console.log(trackedWeatherDataObjects[i].weather[0].icon)
    }
    console.log(trackedWeatherDataObjects)
}

// grab text from search input
searchFormEl.addEventListener("submit", function(e) {
    e.preventDefault()
    // call for current weather using city name
    var inputValue = searchBar.value
    getCurrentWeather(inputValue)
    // call for forecasts using city name
    getForecast(inputValue)
    // save cities searched for in local storage
    saveSearchHistory(inputValue)
    // render cities saved in local storage onto DOM
    renderSearchHistory()
})

// 
function renderSearchHistory() {
    searchHistoryEl.innerHTML = ""
    var localStorageItems = JSON.parse(localStorage.getItem("searchHistory")) || []
    // loop that makes buttons for previous searches
    for (var i = 0; i < localStorageItems.length; i++) {
        var cityButton = document.createElement("button");
        cityButton.classList.add("btn", "btn-outline-primary", "mb-2")
        cityButton.style.display = "block"
        cityButton.innerText = localStorageItems[i]
        searchHistoryEl.appendChild(cityButton)
    }
}

// render search history buttons on page load
renderSearchHistory()

// click listener for search history buttons
searchHistoryEl.addEventListener("click", function(e) {
    // prevent duplicate buttons from being made
    if (e.target.matches(".btn")) {
        // re-run search using text content of generated search history button
        getCurrentWeather(e.target.innerText)
    }
})

// save previous searches into localStorage
function saveSearchHistory() {
    // parse items from localStorage or create empty array to store them
    var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || []
    var inputValue = searchBar.value
    // if searchHistory array doesn't include the text typed into the search bar
    if (!searchHistory.includes(inputValue)) {
        // push text from search bar into searchHistory array
        searchHistory.push(inputValue)
        // add items into localStorage using "searchHistory" as the key and stringified searchHistory array as the value
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory))
    }
}