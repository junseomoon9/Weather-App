// ------- Selectors -------
const notification = document.querySelector('.notification');
const icon = document.querySelector('.weather-icon');
const tempValue = document.querySelector('.temperature-value');
const tempDescription = document.querySelector(".temperature-description");
const locationDesc = document.querySelector(".location");

//------- Constants -------
const KELVIN = 273;
// API Key
const key = "0321475ef92624f2412da10ef1e89a3b";

// ------- Weather Data -------
let weather = {

    temperature: {
        value: 0,
        unit: "celsius"
    },

    description: "",
    iconId: "",
    city: "",
    country: ""

};


// Displays the weather data
function displayWeather(){
    
    icon.innerHTML = `<img src="icons\\${weather.iconId}.png">`;
    tempValue.innerHTML = `<p>${weather.temperature.value} °<span>C</span></p>`;
    tempDescription.innerHTML = weather.description;
    locationDesc.innerHTML = `${weather.city}, ${weather.country}`;
};

// Starts App
function startApp() {

    // Check if browser supports geolocation
    if ('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition(setPosition, showError);
    } else {
        notification.style.display = "block";
        notification.innerHTML = "<p>Browser does not support geolocation</p>";
    }
}

// Obtain the current latitude and longitude data
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude, longitude);
}

// 
function showError(error) {
    notification.style.display = "block";
    notification.innerHTML = `<p> ${error.message} </p>`;
}

function getWeather(latitude, longitude){

    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    console.log(api);
    fetch(api)
    .then(function(response){
        let data = response.json();
        return data;
    })
    .then( function(data){
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    })
    .then(function(){
        displayWeather();
    });
}


startApp();