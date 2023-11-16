import "../style/styles.css";
import searchIconImage from '../search.png'

// page elements
const locationName = document.getElementById("location-name");
const currentTime = document.querySelector(".weather-time");
const currentTemp = document.querySelector(".weather-current-temp");
const feelsLike = document.querySelector(".weather-feels-like");
const rainChance = document.getElementById("details-rain");
const wind = document.getElementById("details-wind");
const humidity = document.getElementById("details-humidity");
const clouds = document.getElementById("details-clouds");
const forecastCards = document.querySelectorAll(".forecast-card");
const search = document.getElementById('location-search');
const searchButton = document.getElementById('search-button')
const searchError = document.querySelector('.search-error');
const searchIcon = document.getElementById('search-icon');

searchIcon.src = searchIconImage;

function dateFormat(date) {
  let dateObject = new Date(date);
  let day = dateObject.getDate();
  let month = dateObject.getMonth() + 1; // Months are zero-based
  let year = dateObject.getFullYear();

  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;

  // Format the date in 'DD/MM/YYYY' and return
  let outputDate = day + " / " + month + " / " + year;
  return outputDate;
}

function updatePage(location) {
  locationName.textContent = location.name;
  currentTime.textContent = location.time;
  currentTemp.textContent = `${location.temp_c}°C`;
  feelsLike.textContent = `Feels like ${location.feels_like_c}°C`;
  rainChance.textContent = `${location.rain}%`;
  wind.textContent = `${location.wind_dir} ${location.wind_speed} kph`;
  humidity.textContent = `${location.humidity}%`;
  clouds.textContent = `${location.cloud}%`;
  forecastCards.forEach((card, index) => {
    const date = card.querySelector(".weather-date");
    const min = card.querySelector(".weather-min-temp");
    const max = card.querySelector(".weather-max-temp");

    date.textContent = dateFormat(location.forecast[index].date);
    min.textContent = location.forecast[index].min_temp;
    max.textContent = location.forecast[index].max_temp;
  });
}

function getWeather(location) {
  const weatherInfo = {};
  searchError.style.opacity = '0';
  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=0d23b12804e64ad0b8673526231411&q=${location}&days=3`,
    {
      mode: "cors",
      method: "get",
    },
  ).then((response) => {
      if (!response.ok) {
        searchError.style.opacity = '1';
        return;
      }
      response.json().then((weather) => {
      const currentLocation = {};
      currentLocation.name = weather.location.name;
      currentLocation.time = weather.current.last_updated.slice(11);
      currentLocation.temp_c = weather.current.temp_c;
      currentLocation.feels_like_c = weather.current.feelslike_c;
      currentLocation.wind_dir = weather.current.wind_dir;
      currentLocation.wind_speed = weather.current.wind_kph;
      currentLocation.humidity = weather.current.humidity;
      currentLocation.cloud = weather.current.cloud;
      currentLocation.rain =
        weather.forecast.forecastday[0].day.daily_chance_of_rain;
      currentLocation.forecast = [{}, {}, {}];
      for (let i = 0; i < 3; i++) {
        currentLocation.forecast[i].date = weather.forecast.forecastday[i].date;
        currentLocation.forecast[i].max_temp =
          `Max: ${weather.forecast.forecastday[i].day.maxtemp_c}°C`;
        currentLocation.forecast[i].min_temp =
          `Min: ${weather.forecast.forecastday[i].day.mintemp_c}°C`;
      }
      updatePage(currentLocation);
    })}
  );
}

searchButton.addEventListener('click', (e) => {
  e.preventDefault();
  getWeather(search.value);
  search.value = '';
});

getWeather('nice');

