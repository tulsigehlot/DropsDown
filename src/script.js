'use strict'

const input = document.querySelector('.search');
const searchIcon = document.querySelector('.icon');
const currLocation = document.querySelector('.current--location');
const clearBtn = document.querySelector('.clear');


////////////////////////////clear inputs and button////////////////////////////////////////

clearBtn.addEventListener('click',function(){
    input.value = '';
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
