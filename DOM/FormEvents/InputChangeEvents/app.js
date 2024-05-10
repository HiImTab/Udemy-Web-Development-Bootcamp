const input = document.querySelector('input');
const h1 = document.querySelector('h1');

//works when you apply change and click out of input box (blur the input)
/* input.addEventListener('change', function(e){
    console.log("heheehehehhehehe");
}) */

//works as soon as you type something (shift, arrow keys, etc. don't trigger event, only things that
//change the value)
//for keydown/keyup notes, watch end of video 265
input.addEventListener('input', function(e){
    h1.innerText = input.value;
    console.log('inputttt event');
})