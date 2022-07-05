"use strict";

const input = document.querySelector(".search");
const searchIcon = document.querySelector(".icon");
const currLocation = document.querySelector(".current--location");
const clearBtn = document.querySelector(".clear");
const quoteContainer = document.querySelector(".container");
const cardsContainer = document.querySelector(".card");
const temperature = document.querySelector(".temp");
const descript = document.querySelector(".description");
const percent = document.querySelector(".humid-percent");
const feels = document.querySelector(".min-max-temp");
let cityCountry = document.querySelector(".current-location");
const weatherIcon = document.querySelector(".weather-icon");

////////////////////////////clear inputs and button////////////////////////////////////////

clearBtn.addEventListener("click", function () {
  input.value = "";
  quoteContainer.classList.remove("hidden");
  cardsContainer.classList.add("hidden");
});

////////////////////////////search city by enter key////////////////////////////////////////

input.addEventListener("keyup", function (e) {
  const inputValue = input.value;
  if (e.key === "Enter" && input.value != "") {
    getWeather(inputValue);
  }
});

const getWeather = async function (inputValue) {
  const api = "957f9d138f63b90829b32b69e7052875";
  const weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=${api}`;

  let data = await fetch(weatherApi);
  let jsonData = await data.json();
  console.log(jsonData);
  getCurrentWeather(jsonData);

  quoteContainer.classList.add('hidden');
  cardsContainer.classList.remove('hidden');
};

////////////////////////////search city by name////////////////////////////////////////

searchIcon.addEventListener("click", function () {
  const inputValue = input.value;
  const api = "957f9d138f63b90829b32b69e7052875";
  const weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=${api}`;

  const getWeather = async function () {
    let data = await fetch(weatherApi);
    let jsonData = await data.json();
    console.log(jsonData);
    getCurrentWeather(jsonData);
  };
  getWeather();
});
/////////////////////////////current weather function///////////////////////////////////

async function getCurrentWeather(jsonData) {
  const city = await jsonData.name;
  const country = await jsonData.sys.country;
  const id = await jsonData.weather[0].id;
  console.log(id);
  ///showing the current temperature
  temperature.textContent = `${jsonData.main.temp}\u00B0 C`;
  descript.textContent = jsonData.weather[0].description;
  percent.textContent = `${jsonData.main.humidity}%`;
  feels.textContent = `${jsonData.main.feels_like}\u00B0 C`;
  cityCountry.textContent = `${city}, ${country}`;

  ////////////////////////////weather image////////////////////////////////////////
  if (id === 800) {
    weatherIcon.src = "src/images/clear.png";
  } else if (id >= 200 && id <= 232) {
    weatherIcon.src = "src/images/thunderstrom.png";
  } else if (id >= 300 && id <= 321) {
    weatherIcon.src = "src/images/drizzle.png";
  } else if (id >= 500 && id <= 531) {
    weatherIcon.src = "src/images/rain.png";
  } else if (id >= 600 && id <= 622) {
    weatherIcon.src = "src/images/snow.png";
  } else if (id >= 701 && id <= 781) {
    weatherIcon.src = "src/images/atmosphere.png";
  } else if (id >= 801 && id <= 804) {
    weatherIcon.src = "src/images/cloud.png";
  }
  quoteContainer.classList.add('hidden');
  cardsContainer.classList.remove('hidden');
}

////////////////////////////get device location////////////////////////////////////////

currLocation.addEventListener("click", function (position) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      console.log(latitude, longitude);
      const weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${"957f9d138f63b90829b32b69e7052875"}`;

      const getCurrent = async function () {
        let data = await fetch(weatherApi);
        let jsonData = await data.json();
        console.log(jsonData);
        getCurrentWeather(jsonData);
      };
      getCurrent();
    },
    () => {
      alert("User denied to access the location ");
    }
  );
});
