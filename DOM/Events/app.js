
const btn = document.querySelector('#v2');
//you can use document.dir(button) to view elements such as (onclick)

//onclick (2nd approach), better than inline
btn.onclick = function(){
    console.log('You clicked meee');
    console.log('Did this work?');
}

function scream(){
    console.log("AHHHH");
    console.log(';_;');
}

btn.onmouseenter = scream;

document.querySelector('h1').onclick = () => {
    alert('you clicked the h1');
}

//3rd and best approach/recommended

const btn3 = document.querySelector('#v3');

//params/args
//what is it listening for, then a function
btn3.addEventListener('dblclick', function(){
    alert("DOUBLE CLICKKEDDD");
})

function twist(){
    console.log("TWIST");
}

function shout(){
    console.log("SHOUT");
}

tasButton = document.querySelector('#tas');
//adds both
//{once: true} only runs one time even if you click it again
tasButton.addEventListener('click', twist, {once: true})
tasButton.addEventListener('click', shout)

//cant do it this way (2nd approach), b/c shout overwrites twist func
/*
tasButton.onclick = twist;
tasButton.onclick = shout;
*/



