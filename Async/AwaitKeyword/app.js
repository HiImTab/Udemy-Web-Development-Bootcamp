//async and await are used together

//going back from creating promises

const delayColorChange = (color, delay) => {
    return new Promise( (resolve, reject) => {
        //not really gonna reject the promise ever
        setTimeout(()=>{
            document.body.style.backgroundColor = color;
            resolve();
        }, delay)
    })
}
/*
delayColorChange('red', 1000)
    .then(()=> {return delayColorChange('orange',1000)})
    .then(()=> {return delayColorChange('yellow',1000)})
    .then(()=> {return delayColorChange('green',1000)})
    .then(()=> {return delayColorChange('blue',1000)})
    .then(()=> {return delayColorChange('indigo',1000)})
    .then(()=> {return delayColorChange('violet',1000)})
*/

//more of an improvement than just promises
async function rainbow(){
    await delayColorChange('red', 1000);
    console.log('hi')
    await delayColorChange('orange', 1000);
    await delayColorChange('yellow', 1000);
    await delayColorChange('green', 1000);
    await delayColorChange('blue', 1000);
    await delayColorChange('indigo', 1000);
    await delayColorChange('violet', 1000);
    return 'ALL DONE'; //will return a resolve promise with a resolved with value of all done
}


rainbow().then((data) => {console.log('End of rainbow!', data)});

//does same thing as above
/* async function printRainbow() {
    await rainbow(); //waits until end of rainbow() (7 secs)
    console.log('end of rainbow')
}

printRainbow(); */