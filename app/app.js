const form = document.querySelector('form');

var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

console.log(L.tileLayer())

form.addEventListener('submit', e => {
    e.preventDefault();
    const inputValue = form.input.value;
    const spanResponse = form.querySelector('span');
    if(inputValue === ''){
        return spanResponse.textContent = `Isira um valor acima`;
    }
    return spanResponse.textContent = `Você escreveu ${inputValue}`;
})