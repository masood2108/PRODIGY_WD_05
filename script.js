async function getWeather() {
    const apiKey = 'c36ff73e56e07b94ce20a9e0359a8d21';
    const locationInput = document.getElementById('locationInput');
    const weatherInfoContainer = document.getElementById('weatherInfo');

    if (locationInput.value.trim() === '') {
        alert('Please enter a location.');
        return;
    }

    const location = locationInput.value.trim();
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            const weatherInfo = `
                <p><strong>Location:</strong> ${data.name}, ${data.sys.country}</p>
                <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
                <p><strong>Weather:</strong> ${data.weather[0].description}</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            `;
            weatherInfoContainer.innerHTML = weatherInfo;
        } else {
            weatherInfoContainer.innerHTML = `<p>Error: ${data.message}</p>`;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherInfoContainer.innerHTML = '<p>Error fetching weather data. Please try again later.</p>';
    }
}
