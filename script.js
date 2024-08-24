const weatherApi = {
    key: '4eb3703790b356562054106543b748b2',
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather'
}

let searchInputBox = document.getElementById('input-box');
let searchButton = document.getElementById('search-button');

// Search when Enter key is pressed or Search button is clicked
searchInputBox.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        getWeatherReport(searchInputBox.value);
    }
});

searchButton.addEventListener('click', () => {
    getWeatherReport(searchInputBox.value);
});

function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
        .then(weather => {
            if (!weather.ok) {
                throw new Error('City not found');
            }
            return weather.json();
        })
        .then(showWeatherReport)
        .catch(error => {
            swal("Error", error.message, "error");
        });
}

function showWeatherReport(weather) {
    let op = document.getElementById('weather-body');
    op.style.display = 'block';
    let todayDate = new Date();
    let parent = document.getElementById('parent');
    let weather_body = document.getElementById('weather-body');
    weather_body.innerHTML =
        `
    <div class="location-deatils">
        <div class="city" id="city">${weather.name}, ${weather.sys.country}</div>
        <div class="date" id="date"> ${dateManage(todayDate)}</div>
    </div>
    <div class="weather-status">
        <div class="temp" id="temp">${Math.round(weather.main.temp)}&deg;C </div>
        <div class="weather" id="weather"> ${weather.weather[0].main} <i class="${getIconClass(weather.weather[0].main)}"></i>  </div>
        <div class="min-max" id="min-max">${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max) </div>
        <div id="updated_on">Updated as of ${getTime(todayDate)}</div>
    </div>
    <hr>
    <div class="day-details">
        <div class="basic">Feels like ${weather.main.feels_like}&deg;C | Humidity ${weather.main.humidity}%  <br> Pressure ${weather.main.pressure} mb | Wind ${weather.wind.speed} KMPH</div>
    </div>
    `;
    parent.append(weather_body);
    changeBg(weather.weather[0].main);
    reset();
}

function getTime(todayDate) {
    let hour = addZero(todayDate.getHours());
    let minute = addZero(todayDate.getMinutes());
    return `${hour}:${minute}`;
}

function dateManage(dateArg) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];
    return `${date} ${month} (${day}) , ${year}`
}

function changeBg(status) {
    let body = document.body;
    if (status === 'Clouds') {
        body.style.backgroundImage = 'url(img/clouds.jpg)';
    } else if (status === 'Rain') {
        body.style.backgroundImage = 'url(img/rainy.jpg)';
    } else if (status === 'Clear') {
        body.style.backgroundImage = 'url(img/clear.jpg)';
    } else if (status === 'Snow') {
        body.style.backgroundImage = 'url(img/snow.jpg)';
    } else if (status === 'Sunny') {
        body.style.backgroundImage = 'url(img/sunny.jpg)';
    } else if (status === 'Thunderstorm') {
        body.style.backgroundImage = 'url(img/thunderstrom.jpg)';
    } else if (status === 'Drizzle') {
        body.style.backgroundImage = 'url(img/drizzle.jpg)';
    } else if (status === 'Mist' || status === 'Haze' || status === 'Fog') {
        body.style.backgroundImage = 'url(img/mist.jpg)';
    } else {
        body.style.backgroundImage = 'url(img/bg.jpg)';
    }
}

function getIconClass(weatherType) {
    switch (weatherType) {
        case 'Rain':
            return 'fas fa-cloud-showers-heavy';
        case 'Clouds':
            return 'fas fa-cloud';
        case 'Clear':
            return 'fas fa-cloud-sun';
        case 'Snow':
            return 'fas fa-snowman';
        case 'Sunny':
            return 'fas fa-sun';
        case 'Mist':
            return 'fas fa-smog';
        case 'Thunderstorm':
        case 'Drizzle':
            return 'fas fa-thunderstorm';
        default:
            return 'fas fa-cloud-sun';
    }
}

function reset() {
    let input = document.getElementById('input-box');
    input.value = "";
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
