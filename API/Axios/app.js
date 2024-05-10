
/* //returns a promise
axios.get("https://swapi.dev/api/people/1")
    .then(res => {
        console.log('RESPONSE ', res);
    })
    .catch(e => {
        console.log('ERROR', e);
    }) */


const getStarWarsPpl = async (id) =>{
    try{
        const res = await axios.get(`https://swapi.dev/api/people/${id}`);
        console.log(res.data);
    }
    catch(e){
        console.log('ERROR', e);
    }

}

/* getStarWarsPpl(2);
getStarWarsPpl(5);
getStarWarsPpl(10); */


const jokes = document.querySelector('#jokes');
const button = document.querySelector('button');

const addNewJoke = async () => {
    const joke = await getDadJoke();

    const newLi = document.createElement('li');
    newLi.append(joke);
    jokes.append(newLi);
}

const getDadJoke = async () => {
    try{
        const config = {headers: {Accept: 'application/json'}}
        const res = await axios.get("https://icanhazdadjoke.com", config);
        /*console.log(res.data.joke); */
        return res.data.joke;
    }
    catch(e){
        return 'No jokes available:(';
    }

}


button.addEventListener('click', addNewJoke)