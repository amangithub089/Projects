async function getWeather() {
    const apiKey = 'c50d992948msh8edc230e34b6997p1f6dd4jsn516f7753e8cf';
    const city = document.getElementById('city').value;
    const cityName = document.getElementById('city-name');
    const tempDiv = document.getElementById('temp-div');
    const weatherInfo = document.getElementById('weather-info');
    const hourlyForecast = document.getElementById('hourly-forecast');

    if (!city) {
        weatherInfo.innerHTML = '<p>Please enter a city name.</p>';
        return;
    }

    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${encodeURIComponent(city)}&days=1&aqi=no&alerts=no`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const current = data.current;
        const forecast = data.forecast.forecastday[0];

        // Display the city name
        cityName.innerText = data.location.name +", "+ data.location.country;

        tempDiv.innerHTML = `<p>${current.temp_c}°C</p>`;
        weatherInfo.innerHTML = `
            <p>${current.condition.text}</p>
            <p>Humidity: ${current.humidity}%</p>
            <p>Wind: ${current.wind_kph} kph</p>
        `;

        hourlyForecast.innerHTML = '<h3 id="hourly-heading">Hourly Forecast</h3>';
        forecast.hour.forEach(hour => {
            const hourElement = document.createElement('div');
            hourElement.className = 'hourly-item';
            const hourConditionText = hour.condition.text;
            hourElement.innerHTML = `
                <p>${new Date(hour.time).getHours()}:00</p>
                <p>${hour.temp_c}°C</p>
            `;
            hourlyForecast.appendChild(hourElement);
        });

    } catch (error) {
        weatherInfo.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}
