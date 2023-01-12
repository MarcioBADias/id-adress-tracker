const form = document.querySelector('form');

// CRIAÇÃO DO MAPA COM LEAFLET

var map = L.map('map')

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// API DE VERIFICAÇÃO DAS CORDENADAS E RETORNO

const getGeoIp = callback => {
    const request = new XMLHttpRequest();
    
    request.addEventListener('readystatechange', () => {
        if(request.readyState === 4 && request.status === 200){
            const data = JSON.parse(request.responseText);
            callback(null,data);
            return
        }
        if(request.readyState === 4){
            return console.log('Dados não retornaram',null)
        }
    })
    request.open('GET', 'https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_8j2YtcS1sRr6olfsrjR4iaPdHNn7o&ipAddress=');
    request.send();
}

// CAPTAÇÃO DA POSIÇÃO DO USUÁRIO

getGeoIp((error,data)=>{
    if(error){
        return error;
    }
    const getData = data;
    map.setView([getData.location.lat, getData.location.lng], 15);
    return console.log(getData);
})


// const success = position => {
//     console.log(position)
//     return 
// }

// navigator.geolocation.watchPosition(success)


// CAPITURA DO FORM

form.addEventListener('submit', e => {
    e.preventDefault();
    const inputValue = form.input.value;
    const spanResponse = form.querySelector('span');
    if(inputValue === ''){
        return spanResponse.textContent = `Isira um valor acima`;
    }
    return spanResponse.textContent = `Você escreveu ${inputValue}`;
})
