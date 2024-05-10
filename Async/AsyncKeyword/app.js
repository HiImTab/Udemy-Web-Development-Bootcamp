//async functions always returns a promise
/* async function hello(){
    //this function returns a promise
} */

//if function returns a value, then the promise will be *resolved* with that value
//the way we reject a promise is by throwing an error inside of a async func

/* const sing = async () => {
    //throw 'problem' //rejected
    return 'lalalla';
}

sing()
    .then((data)=>{
        console.log('promise resolved with: ', data)
    })
    .catch((err) =>{
        console.log('promise rejected')
        console.log(err);
    }) */

    
    const login = async (username, password) => {
        if(!username || !password) throw 'Missing Credentials'
        if(password === 'corgi') return 'Welcome!'
        throw 'invalid password...'
    } 

    login('kjaklja', 'corgi')
        .then(msg => {
            console.log('logged in...')
            console.log(msg);
        })
        .catch(err => {
            console.log('error...')
            console.log(err);
        })

    