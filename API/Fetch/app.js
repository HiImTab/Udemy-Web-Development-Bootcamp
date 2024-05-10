//supports promises

//returns a promise
/* fetch("https://swapi.dev/api/people/1")
    .then(res => {
        console.log("RESOLVED", res);
        //also returns a promise
        //res.json().then(data => {console.log('JSON DONE', data)}) 
        return res.json();
    })
    .then(data => {
        console.log(data);
        //first request needs to be resolved before the 2nd even starts (doing it this way that is)
        return fetch("https://swapi.dev/api/people/2")        
    })
    .then(res => {
        console.log('Second request resolved!!');
        return res.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(e => {
        console.log("ERROR", e);
    }) */

    //using async!
    const loadStarWarsPpl = async() => {
        try{
            const res = await fetch("https://swapi.dev/api/people/1");
            const data = await res.json();
            console.log(data);
    
            const res2 = await fetch("https://swapi.dev/api/people/2");
            const data2 = await res2.json();
            console.log(data2);
        }
        catch(e){ console.log('ERROR!', e)}
    }

    loadStarWarsPpl();