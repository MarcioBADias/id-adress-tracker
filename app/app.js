const form = document.querySelector('form');

form.addEventListener('submit', e => {
    e.preventDefault();
    const inputValue = form.input.value;
    const spanResponse = form.querySelector('span');
    if(inputValue === ''){
        return spanResponse.textContent = `Isira um valor acima`;
    }
    return spanResponse.textContent = `Você escreveu ${inputValue}`;
})