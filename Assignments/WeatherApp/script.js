const weatherForm = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const weatherResult = document.getElementById("weather-result");

weatherForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
});

async function fetchWeather(city) {
    const loadingMessage = document.getElementById("loading-message");
    const weatherInfo = document.getElementById("weather-info");
    
    // Show loading, hide weather info
    loadingMessage.style.display = "block";
    weatherInfo.style.display = "none";
    
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}?unitGroup=us&key=KLZ64YZL3PTEJ8CRBQ54J3HKU`);
        if (response.ok) {
            const data = await response.json();
            displayWeather(data);
            
            // Hide loading, show weather info
            loadingMessage.style.display = "none";
            weatherInfo.style.display = "block";
        } else {
            loadingMessage.textContent = "Error fetching weather data. Please try again.";
        }
    } catch (error) {
        loadingMessage.textContent = "Network error. Please check your connection.";
    }
}

function displayWeather(data) {
    console.log('Weather Data:', data); // Debug log
    const weatherInfo = document.getElementById("weather-info");
    
    weatherInfo.innerHTML = `
        <div class="current-weather">
            <h2>${data.resolvedAddress}</h2>
            <div class="temp-display">
                <span class="temperature">${Math.round(data.currentConditions.temp)}°F</span>
            </div>
            <p class="conditions">${data.currentConditions.conditions}</p>
            <div class="weather-details">
                <div class="detail">
                    <span class="label">Humidity</span>
                    <span class="value">${data.currentConditions.humidity}%</span>
                </div>
                <div class="detail">
                    <span class="label">Wind</span>
                    <span class="value">${data.currentConditions.windspeed} mph</span>
                </div>
                <div class="detail">
                    <span class="label">Feels Like</span>
                    <span class="value">${Math.round(data.currentConditions.feelslike)}°F</span>
                </div>
            </div>
        </div>
        
        <div class="forecast">
            <h3>5-Day Forecast</h3>
            <div class="forecast-grid">
                ${data.days.slice(0, 5).map(day => `
                    <div class="forecast-card">
                        <p class="forecast-date">${new Date(day.datetime).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                        <p class="forecast-temp">${Math.round(day.tempmax)}° / ${Math.round(day.tempmin)}°</p>
                        <p class="forecast-conditions">${day.conditions}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}