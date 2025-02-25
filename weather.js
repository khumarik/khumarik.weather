document.getElementById("get-weather").addEventListener("click", getWeather);
document.getElementById("city-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});

function getWeather() {
    const city = document.getElementById("city-input").value.trim();
    const weatherOutput = document.getElementById("weather-output");
    const body = document.body;
    
    if (city === "") {
        weatherOutput.innerHTML = "Введите название города.";
        weatherOutput.classList.remove("show");
        return;
    }
    
    const apiKey = 'a3bd109058ac4d2cb1a91029252102';
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&lang=ru`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let weatherIcon = "";
            let backgroundGradient = "";

            if (data.current.condition.text.includes("ясно")) {
                weatherIcon = "☀️";
                backgroundGradient = "linear-gradient(135deg, #FFD700, #FFA500, #FF4500)"; // Желто-оранжевый градиент
            } else if (data.current.condition.text.includes("облачно")) {
                weatherIcon = "☁️";
                backgroundGradient = "linear-gradient(135deg, #A9A9A9, #808080, #696969)"; // Серый градиент
            } else if (data.current.condition.text.includes("дождь")) {
                weatherIcon = "🌧️";
                backgroundGradient = "linear-gradient(135deg, #4A90E2, #283E51, #1C2833)"; // Сине-серый дождливый
            } else if (data.current.condition.text.includes("снег")) {
                weatherIcon = "❄️";
                backgroundGradient = "linear-gradient(135deg, #E0F7FA, #B2EBF2, #81D4FA)"; // Голубой холодный
            } else if (data.current.condition.text.includes("гроза")) {
                weatherIcon = "⛈️";
                backgroundGradient = "linear-gradient(135deg, #232526, #414345, #6E7F80)"; // Темно-серый с эффектом грозы
            } else {
                weatherIcon = "🌦️"; 
                backgroundGradient = "linear-gradient(135deg, #6dd5fa, #2980b9, #1e3c72)"; // Общий приятный градиент
            }

            weatherOutput.innerHTML = `
                <h3>${data.location.name}, ${data.location.country}</h3>
                <p>${weatherIcon} ${data.current.condition.text}</p>
                <p>Температура: ${data.current.temp_c}°C</p>
                <p>Влажность: ${data.current.humidity}%</p>
                <img src="${data.current.condition.icon}" alt="">
            `;

            weatherOutput.classList.add("show");
            body.style.transition = "background 1.5s ease-in-out";
            body.style.background = backgroundGradient;
        })
        .catch(() => {
            weatherOutput.innerHTML = `
                <img src="https://i.pinimg.com/736x/7e/66/ef/7e66ef86c8ef44244748b9cf38b38cc4.jpg" alt="Ошибка" style="width: 100%; border-radius: 10px; margin-top: 10px;">
            `;
            weatherOutput.classList.add("show");
        });
}