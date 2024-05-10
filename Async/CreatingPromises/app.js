const fakeRequest = (url) => {
    return new Promise( (resolve, reject) => {
        const rand = Math.random();
        setTimeout(() => {
            if(rand < 0.7){
                resolve('your fake data here');
            }
            reject('request failed');
        }, 1000)
    })
}

/* const req = fakeRequest(); */

fakeRequest('/dogs/1')
.then((data) => {
    console.log('Done with request: ', data);
})
.catch((err) => {
    console.log('Error with request: ', err);
})

//go to CallbackHell and look at app.js (we will make a promise based on that logic)

const delayColorChange = (color, delay) => {
    return new Promise( (resolve, reject) => {
        //not really gonna reject the promise ever
        setTimeout(()=>{
            document.body.style.backgroundColor = color;
            resolve();
        }, delay)
    })
}

delayColorChange('red', 1000)
    .then(()=> {return delayColorChange('orange',1000)})
    .then(()=> {return delayColorChange('yellow',1000)})
    .then(()=> {return delayColorChange('green',1000)})
    .then(()=> {return delayColorChange('blue',1000)})
    .then(()=> {return delayColorChange('indigo',1000)})
    .then(()=> {return delayColorChange('violet',1000)})


/////////////////////////////////////////////////////////////////////
//part of async/await keyword
async function makeTwoRequests(){
    try{
        //promise resolved and captured in a variable(data1)
        let data1 = await fakeRequest('/dog/2');
/*         console.log('we in here'); */
        console.log(data1);
    }
    catch(e){
        console.log('It is okay bb:(', e)
    }
}


makeTwoRequests();
