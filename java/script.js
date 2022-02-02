function formatDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednedsday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hour}:${minutes}`;
}
let time = document.querySelector(".date");
let now = new Date();
time.innerHTML = formatDate(now);

function newFahrenheit(event) {
  event.preventDefault();
  let newTemperature = document.querySelector(".temperature");
  newTemperature.innerHTML = 12;
}

let fahrenheit = document.querySelector("#fahrenheit");

fahrenheit.addEventListener("click", newFahrenheit);

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
  console.log(response.data);
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
search("Vienna");
