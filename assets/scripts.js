var apiKey = "a061eb6370c867e1da420f61897c46e5"


// how to fetch 5-day forecast from API
fetch ("https://api.openweathermap.org/data/2.5/forecast?lat=42.7261&lon=87.7829&appid="+apiKey)
.then(function(response) {
    console.log(response)
    return response.json()
})
.then(function(forecastData) {
    console.log(forecastData)
})

// TODO how to fetch current weather from API
fetch ("https://api.openweathermap.org/data/2.5/weather?q=Milwaukee&appid="+apiKey)
.then(function(response) {
    console.log(response)
    return response.json()
})
.then(function(forecastData) {
    console.log(forecastData)
})