const makeRandColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
}

const buttons = document.querySelectorAll('button');

for(let button of buttons){

    button.addEventListener('click', colorizer);
/*  button.addEventListener('click', function(){
        /* console.log('clicked'); 
        button.style.backgroundColor = makeRandColor();
        button.style.color = makeRandColor();
    }) */
}

const allH1 = document.querySelectorAll('h1');

for(let h1 of allH1){
    h1.addEventListener('click', colorizer)
}


function colorizer(){
    this.style.backgroundColor = makeRandColor();
    this.style.color = makeRandColor();
}