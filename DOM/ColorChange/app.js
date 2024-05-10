//improve? watch end of video, change color of text when rando color too dark
//flexbox for center in middle middle
//make a cooler button
//change h1 to white rgb(48,15,2) when to change to white?
//maybe fade in the colors?! (gradual change)


const btn = document.querySelector('button');
const h1 = document.querySelector('h1');

btn.addEventListener('click', function(){    

    const newColor = makeRandColor();
    document.body.style.backgroundColor = newColor;
    document.body.style.transition = 'all 1.5s';
    h1.innerText = newColor;
})


//rgb(255,0,0)
const makeRandColor = () => {
    const r = Math.floor(Math.random()*255);
    const g = Math.floor(Math.random()*255);
    const b = Math.floor(Math.random()*255);
    
    checkColor(r,g,b);
    return `rgb(${r}, ${g}, ${b})`;
}

const checkColor = (r,g,b) => {
    
    if(r < 100 && g < 100 && b < 100){
        h1.style.color = 'white';
    }
    else{
        h1.style.color = 'black';
    }
}