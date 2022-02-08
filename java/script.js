function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hour}:${minutes}`;
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}
let searchCity = document.querySelector("#form-search");
searchCity.addEventListener("submit", handleSubmit);

function search(city) {
  let apiKey = "59e85c7a60217259c9906fee3425b9ba";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}
function showTemperature(response) {
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".humidity").innerHTML =
    "Humidity: " + response.data.main.humidity + "%";

  document.querySelector(".wind").innerHTML =
    "Wind: " + response.data.wind.speed + "km/h";
  document.querySelector(".day-description").innerHTML =
    response.data.weather[0].description;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);
  celcius = response.data.main.temp;
  document.querySelector(".date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  getForecast(response.data.coord);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "59e85c7a60217259c9906fee3425b9ba";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}
function getPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let buttonCurrent = document.querySelector("#button-current");
buttonCurrent.addEventListener("click", getPosition);

function newFahrenheit(event) {
  event.preventDefault();
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let newTemperature = document.querySelector(".temperature");
  newTemperature.innerHTML = Math.round((celcius * 9) / 5 + 32);
}
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", newFahrenheit);
function newCelcius(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let newTemperature = document.querySelector(".temperature");
  newTemperature.innerHTML = Math.round(celcius);
}
let celcius = null;
let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", newCelcius);

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  let forecastHtml = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="col">
              <div class="day-1">${formatDay(forecastDay.dt)}</div>
              <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
                width="42"
              />
              <div class="forecast-temperature">
                <span class="forecast-temperature-max">${Math.round(
                  forecastDay.temp.max
                )}°</span>
                <span class="forecast-temperature-min">${Math.round(
                  forecastDay.temp.min
                )}°</span>
              </div>
            </div>`;
    }
  });

  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function getForecast(coordinates) {
  let apiKey = "59e85c7a60217259c9906fee3425b9ba";
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayForecast);
  console.log(url);
}

search("Vienna");
