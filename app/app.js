const form = document.querySelector('form');
const span = document.querySelector('span');
const infoResponses = document.querySelectorAll('.response');
const apiKey = 'at_9rCYwrQjSNECc90mrvTLT2SerdoHE';

let dataInfos = [];
var map = L.map('map', {zoomControl: false});

const createMap = () => {
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}

const getGeoIp = (ipOrDomain,callback) => {
    const request = new XMLHttpRequest();
    const getConvertResponse = () => {
        const data = JSON.parse(request.responseText);
            callback(null,data);
            return
    }
    
    request.addEventListener('readystatechange', () => {
        const isRequestOk = request.readyState === 4 && request.status === 200;
        const isRequestNotOk = request.readyState === 4;

        isRequestOk && getConvertResponse();
        isRequestNotOk && 'Dados não retornaram';
    })

    request.open('GET', `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&domain=${ipOrDomain}`);
    request.send();
}

const setPositionMap = data => map.setView([data.location.lat, data.location.lng], 15);

const setMarkersInMap = data => {
    var marker = L.marker([data.location.lat, data.location.lng]).addTo(map);

    var circle = L.circle([data.location.lat, data.location.lng], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(map);
}

const populateMap = value => {
    getGeoIp(value,(error,data)=>{
        if(error){
            return error;
        }
        
        setPositionMap(data);
        setMarkersInMap(data);

        dataInfos = [
            data.ip,
            `${data.location.city} - ${data.location.country}`,
            `UTC ${data.location.timezone}`,
            `${data.isp}`
        ];

        infoResponses.forEach((response,index) => {
            response.textContent = dataInfos[index]
        })
    })
}

const clearInput = ({target}) => {
    span.textContent = '';
    target.reset();
    return
}

const returnInputEmpy = (value) => {
    const inputEmpty = value === ''
    const inputEmptyResponse = span.textContent = 'insira um valor no campo abaixo';
    
    inputEmpty && inputEmptyResponse;
}

const returnInputValid = (value, target) => {
    const ipIsValid = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/gm.test(value);
    const domainIsValid = /^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,1}\.(xn--)?([a-z0-9\-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})$/gm.test(value);

    if(ipIsValid || domainIsValid){
        populateMap(value);
        clearInput(target);
        return
    }
    span.textContent = 'insira um valor válido como IP ou domínio "www.dominio.com" no campo abaixo.';
}

createMap();
populateMap('');
form.addEventListener('submit', e => {
    e.preventDefault();
    returnInputEmpy(form.input.value);
    returnInputValid(form.input.value,e);
})


