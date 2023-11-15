import "../style/styles.css";

console.clear();
const test = document.querySelector(".test");

function getWeather(location) {
  const weatherInfo = {};
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=0d23b12804e64ad0b8673526231411&q=${location}`,
    {
      mode: "cors",
      method: "get",
    },
  ).then((response) =>
    response.json().then((resp) => {
      weatherInfo.name = resp.location.name;
      return weatherInfo;
    }),
  );
}

const x = getWeather("traralgon");
