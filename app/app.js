const form = document.querySelector('form');
const span = document.querySelector('span');
const infoResponses = document.querySelectorAll('.response');
const apiKey = 'at_9rCYwrQjSNECc90mrvTLT2SerdoHE';

// CRIAÇÃO DO MAPA COM LEAFLET

var map = L.map('map', {zoomControl: false});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// API DE VERIFICAÇÃO DAS CORDENADAS E RETORNO

const getGeoIp = (ipOrDomain,callback) => {
    const request = new XMLHttpRequest();
    const getConvertResponse = () => {
        const data = JSON.parse(request.responseText);
            callback(null,data);
            return
    }
    
    request.addEventListener('readystatechange', () => {
        const isRequestOk = request.readyState === 4 && request.status === 200;
        const isRequestNotOk = request.readyState === 4 && request.status === 200;

        isRequestOk && getConvertResponse();
        isRequestNotOk && console.log('Dados não retornaram',null);
    })

    request.open('GET', `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&domain=${ipOrDomain}`);
    request.send();
}

// CAPTAÇÃO DA POSIÇÃO DO USUÁRIO

getGeoIp('',(error,data)=>{
    if(error){
        return error;
    }
    const getData = data;
    const getDataInfos = [
        getData.ip,
        `${getData.location.city} - ${getData.location.country}`,
        `UTC ${getData.location.timezone}`,
        `${getData.isp}`
    ]
    
    map.setView([getData.location.lat, getData.location.lng], 15);

    
    var marker = L.marker([getData.location.lat, getData.location.lng]).addTo(map);

    var circle = L.circle([getData.location.lat, getData.location.lng], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(map);

    infoResponses.forEach((response,index) => {
        response.textContent = getDataInfos[index]
    })
})

// CAPITURA DO FORM

form.addEventListener('submit', e => {
    e.preventDefault();
    const inputValue = form.input.value;

    const ipIsValid = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/gm.test(inputValue);
    const domainIsValid = /^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,1}\.(xn--)?([a-z0-9\-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})$/gm.test(inputValue);
    if(inputValue === ''){
        span.textContent = 'insira um valor no campo abaixo';
        return
    }

    if(ipIsValid || domainIsValid){
        
        getGeoIp(inputValue,(error,data)=>{
            if(error){
                return error;
            }
            // Acesso a API e crio o Objeto com infos
            const getData = data;
        
            const getDataInfos = [
                getData.ip,
                `${getData.location.city}
                ${getData.location.country}`,
                `UTC ${getData.location.timezone}`,
                getData.isp
            ]
            // Seta a long e lat no MAPA
            map.setView([getData.location.lat, getData.location.lng], 15);

            // marcadores
            var marker = L.marker([getData.location.lat, getData.location.lng]).addTo(map);

            var circle = L.circle([getData.location.lat, getData.location.lng], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 500
            }).addTo(map);
            
            // Populando o mapa
            infoResponses.forEach((response,index) => {
                response.textContent = getDataInfos[index]
            })
            return
        })
        // limpa a tela
        span.textContent = '';
        e.target.reset()
        return
    }

    span.textContent = 'insira um valor válido como IP ou domínio "www.dominio.com" no campo abaixo.';
})
