//event object
//we have access to in every event handler, and is passed in automatically
//contains properties and info about the event

document.querySelector('button').addEventListener('click', function(evt){
    alert('Click');
    console.log(evt);
})

const input = document.querySelector('input');
input.addEventListener('keydown', function(e){ 
    console.log('key down');
    console.log(e);
    //if you want actual letters (nor do we care what what key was used to generate them)
    console.log(e.key);
    //if you care about position of keyboard (like using wasd for gaming/navigation)
    console.log(e.code);
});
/* input.addEventListener('keyup', function(){
    console.log('key up');
}); */

//e is event obj
window.addEventListener('keydown', function(e){
    console.log(e.code);
    switch(e.code){
        case 'ArrowUp':
            console.log('Up!');
            break;
        case 'ArrowDown':
            console.log('Down!');
            break;
        case 'ArrowRight':
            console.log('Right!');
            break;
        case 'ArrowLeft':
            console.log('Left!');
            break;
        default:
            console.log('fuck');
            break;
    }
})