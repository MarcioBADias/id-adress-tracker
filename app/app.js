const form = document.querySelector('form');

var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


form.addEventListener('submit', e => {
    e.preventDefault();
    const inputValue = form.input.value;
    const spanResponse = form.querySelector('span');
    if(inputValue === ''){
        return spanResponse.textContent = `Isira um valor acima`;
    }
    return spanResponse.textContent = `Você escreveu ${inputValue}`;
})

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
    request.open('GET', 'https://geo.ipify.org/api/v2/country?apiKey=at_8j2YtcS1sRr6olfsrjR4iaPdHNn7o&ipAddress=8.8.8.8');
    request.send();
}

getGeoIp((error,data)=>{
    if(error){
        return error;
    }
    return console.log(data);
})


