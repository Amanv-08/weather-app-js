const apiKey = "Paste_API_KEY_HERE";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

const cityName = document.querySelector(".city");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const weatherIcon = document.querySelector(".weather-icon");

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const weatherIcons = {
    Clouds: "images/clouds.png",
    Rain: "images/rain.png",
    Drizzle: "images/drizzle.png",
    Mist: "images/mist.png",
    Clear: "images/clear.png",
    Snow: "images/snow.png"
};

function resetWeather(message = "") {
    cityName.textContent = message;
    temp.textContent = "";
    humidity.textContent = "";
    wind.textContent = "";
    weatherIcon.src = "";
};

async function checkWeather(city) {
    try {
        const url = `${API_URL}?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

        const response = await fetch(url);

        if (!response.ok) {
            resetWeather("City not found");
            return;
        };

        const data = await response.json();

        cityName.textContent = data.name;
        temp.textContent = `${Math.round(data.main.temp)}°C`;
        humidity.textContent = `${data.main.humidity}%`;
        wind.textContent = `${data.wind.speed} km/h`;

        const icon = weatherIcons[data.weather[0].main];

        weatherIcon.src = icon || "images/clear.png";

    } catch (error) {
        console.error("Weather API error:", error);

        cityName.textContent = "Something went wrong";
        temp.textContent = "--°C";
        humidity.textContent = "--%";
        wind.textContent = "-- km/h";
        weatherIcon.src = "";
    };
};

function searchWeather() {
    const city = searchBox.value.trim();

    if (!city) {
        resetWeather("Enter a city name");
        return;
    };

    checkWeather(city);
};

searchBtn.addEventListener("click", searchWeather);

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchWeather();
    };
});

// Default city
checkWeather("Lucknow");