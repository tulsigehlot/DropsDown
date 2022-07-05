'use strict'

const input = document.querySelector('.search');
const searchIcon = document.querySelector('.icon');
const currLocation = document.querySelector('.current--location');
const clearBtn = document.querySelector('.clear');
const quoteContainer = document.querySelector('.container');
const cardsContainer = document.querySelector('.card');
const temperature = document.querySelector('.temp');
const descript = document.querySelector('.description');
const percent= document.querySelector('.humid-percent');
const feels = document.querySelector('.min-max-temp');
let cityCountry= document.querySelector('.current-location');


////////////////////////////clear inputs and button////////////////////////////////////////

clearBtn.addEventListener('click',function(){
    input.value = '';
    quoteContainer.classList.remove('hidden');
    cardsContainer.classList.add('hidden');
});


////////////////////////////search city by name////////////////////////////////////////

searchIcon.addEventListener('click',function(){
    const inputValue = input.value;
    const api = "957f9d138f63b90829b32b69e7052875";


    const getWeather =  async function(){
       let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=${api}` );
       let jsonData = await data.json(); 
       console.log(jsonData); 


       const city =await jsonData.name;
       const {country,id}=await jsonData.sys.country;
       ///showing the current temperature
       temperature.textContent =`${jsonData.main.temp}\u00B0 C` ;
       descript.textContent = jsonData.weather[0].description;
       percent.textContent =`${jsonData.main.humidity}%`;
       feels.textContent = `${jsonData.main.feels_like}\u00B0 C` ;
       cityCountry.textContent = `${city}, ${country}`;
    }


////////////////////////////weather image////////////////////////////////////////



    getWeather();
});

////////////////////////////get device location////////////////////////////////////////

let lat,lng;
function getGeolocation (position){
    navigator.geolocation.getCurrentPosition((position) => {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        console.log(lat,lng);
    },() => {
        alert("User denied to access the location ");

    });

};

currLocation.addEventListener('click',getGeolocation);
