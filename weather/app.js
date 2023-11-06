window.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector(".loader");

  setTimeout(() => {
    loader.computedStyleMap.opasity = "0";

    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }, 2000);
});

const api = {
  key: "e80a87ec21521a472184b3aa9bc0dcb1",
  baseurl: "https://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector(".searchBox");

searchBox.addEventListener("keypress", setQuery);

function setQuery(e) {
  if (e.keyCode == 13) {
    getResults(searchBox.value);
    console.log(searchBox.value);
  }
}

function getResults(query) {
  fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector(".city");
  city.innerHTML = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".date");
  date.innerHTML = dateBuilder(now);

  let temp = document.querySelector(".temp");
  temp.innerHTML = `${Math.round(
    weather.main.temp
  )} <span class="icon">°C</span>`;

  let weathers = document.querySelector(".weather");
  weathers.innerHTML = weather.weather[0].main;

  let hilow = document.querySelector(".selse");
  hilow.innerHTML = `${Math.round(weather.main.temp_min)} °C / ${Math.round(
    weather.main.temp_max
  )} °C`;
}

function dateBuilder(s) {
  let months = [
    "Januery",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October ",
    "November ",
    "December",
  ];
  let days = [
    "Monday",
    " Tuesday",
    " Wednesday",
    " Thursday",
    "Friday",
    " Saturday",
    " Sunday",
  ];

  let day = days[s.getDay()];
  let date = [s.getDate()];
  let month = months[s.getMonth()];
  let years = s.getFullYear();

  return `${day}, ${date}, ${month}, ${years}`;
}
