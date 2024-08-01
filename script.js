const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey = "dfe2e763a63fb53c356dedbc3205beeb";

weatherForm.addEventListener("submit",async event => {
    event.preventDefault();
    const city = cityInput.value;

    if(city){
        try {
            const weatherData = await getWeatherData(city);
            displayWeather(weatherData);
        }
        catch (error) {
            console.error(error);
            errorDisplay(error);
        }
    }
    else{
        errorDisplay("Please enter a city");
    }
});

async function getWeatherData(city){
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response = await fetch(apiURL);

    if(!response.ok){
        throw new Error("Could Not Fetch the Data");
    }

    return await response.json();
} 

function displayWeather(data){
    const {name: city,main: {temp,humidity},weather: [{description,id}]} = data;

    card.textContent="";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp-273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity = ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherID){
    switch (true) {
        case (weatherID >= 200 && weatherID < 300):
            return "🌩️";
        case (weatherID >= 300 && weatherID < 400):
            return "🌧️";
        case (weatherID >= 500 && weatherID < 600):
            return "☔";
        case (weatherID >= 600 && weatherID < 700):
            return "🌨️";
        case (weatherID >= 700 && weatherID < 800):
            return "🌫️";
        case (weatherID >= 700 && weatherID < 800):
            return "🌫️";
        case (weatherID === 800):
            return "☀️";
        case (weatherID >= 801 && weatherID < 810):
            return "☁️";
        default:
            return "❓";
    }
}

function errorDisplay(message){
    const errorMsg = document.createElement("p");
    errorMsg.textContent = message;
    errorMsg.classList.add("errorDisplay");
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorMsg);
}