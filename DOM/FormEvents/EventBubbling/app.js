//bubbling occurs when it keeps going up 
//where when you click on button event (child), you also trigger paragraph event (parent)

const makeRandColor = () => {
    const r = Math.floor(Math.random()*255);
    const g = Math.floor(Math.random()*255);
    const b = Math.floor(Math.random()*255);
    return `rgb(${r}, ${g}, ${b})`;
}

const button = document.querySelector('#yo');
const container = document.querySelector('#container');


button.addEventListener('click', function(e){
    container.style.backgroundColor = makeRandColor();
    e.stopPropagation(); //stops bubbling (doesn't trigger parent/container event on line 21)
})


container.addEventListener('click', function(){
    container.classList.toggle('hide');
})