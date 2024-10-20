function getWeather() {
    const apiKey = 'cfe912e9da2026b31619651e813e9a71';
    const city = document.getElementById('city').value;

    if (!city) {
        displayError('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    clearError();

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            showErrorIcon('Error fetching current weather data. Please try again.');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            showErrorIcon('Error fetching hourly forecast data. Please try again.');
        });
}

function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    // Clear previous content
    weatherInfoDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';
    hourlyForecastDiv.innerHTML = ''; 

    if (data.cod !== 200) { 
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
        showErrorIcon(data.message);
        return;
    }

    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;

    
    const customIcons = {
        '01d': 'clear-day.png',
        '01n': 'clear-night.png',
        '02d': 'partly-cloudy-day.png',
        '02n': 'partly-cloudy-night.png',
        '03d': 'cloudy.png',
        '03n': 'cloudy.png',
        '04d': 'overcast.png',
        '04n': 'overcast.png',
        '09d': 'rain.png',
        '09n': 'rain.png',
        '10d': 'rain-day.png',
        '10n': 'rain-night.png',
        '11d': 'thunderstorm.png',
        '11n': 'thunderstorm.png',
        '13d': 'snow.png',
        '13n': 'snow.png',
        '50d': 'mist.png',
        '50n': 'mist.png'
    };

    const iconUrl = `images/${customIcons[iconCode]}`;

    const temperatureHTML = `<p>${temperature}°C</p>`;
    const weatherHtml = `<p>${cityName}</p><p>${description}</p>`;

    tempDivInfo.innerHTML = temperatureHTML;
    weatherInfoDiv.innerHTML = weatherHtml;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;

    showImage();
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    
    hourlyForecastDiv.innerHTML = '';

    const next24Hours = hourlyData.slice(0, 8); 

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000); 
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15); 
        const iconCode = item.weather[0].icon;

        const customIcons = {
            '01d': 'clear-day.png',
            '01n': 'clear-night.png',
            '02d': 'partly-cloudy-day.png',
            '02n': 'partly-cloudy-night.png',
            '03d': 'cloudy.png',
            '03n': 'cloudy.png',
            '04d': 'overcast.png',
            '04n': 'overcast.png',
            '09d': 'rain.png',
            '09n': 'rain.png',
            '10d': 'rain-day.png',
            '10n': 'rain-night.png',
            '11d': 'thunderstorm.png',
            '11n': 'thunderstorm.png',
            '13d': 'snow.png',
            '13n': 'snow.png',
            '50d': 'mist.png',
            '50n': 'mist.png'
        };

        const iconUrl = `images/${customIcons[iconCode]}`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function displayError(message) {
    const errorIcon = document.getElementById('error-icon');
    const errorMessageDiv = document.getElementById('error-message');

    errorIcon.style.display = 'block';
    errorMessageDiv.textContent = message;
}

function clearError() {
    const errorIcon = document.getElementById('error-icon');
    const errorMessageDiv = document.getElementById('error-message');


    errorIcon.style.display = 'none';
    errorMessageDiv.textContent = '';
}

function showErrorIcon(message) {
    const errorIcon = document.getElementById('error-icon');
    const errorMessage = document.getElementById('error-message');
    const errorContainer = document.getElementById('error-container');


    clearError();


    errorIcon.src = 'images/error.png'; 
    errorIcon.style.display = 'block';
    errorMessage.innerText = message; 
    errorMessage.style.display = 'block'; 
    errorContainer.style.display = 'flex'; 
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block'; 
}
