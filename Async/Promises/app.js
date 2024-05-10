//request is a promise obj

//you don't need to put request in a variable (see line 76+)
/* const request = fakeRequestPromise('yelp.com/api/coffeee')
//to handle if it does work
request.then( () => {
    console.log('Promise RESOLVED);
    console.log('it worked!');
})
//to handle if doesn't work
request.catch( () => {
    console.log('Promise REJECTED);
    console.log('OH NO, ERROR');
}) */



//COLT's code

// THE CALLBACK VERSION
const fakeRequestCallback = (url, success, failure) => {
    const delay = Math.floor(Math.random() * 4500) + 500;
    setTimeout(() => {
        if (delay > 4000) {
            failure('Connection Timeout :(')
        } else {
            success(`Here is your fake data from ${url}`)
        }
    }, delay)
}
// THE PROMISE VERSION 
const fakeRequestPromise = (url) => {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * (4500)) + 500;
        setTimeout(() => {
            if (delay > 4000) {
                reject('Connection Timeout :(')
            } else {
                resolve(`Here is your fake data from ${url}`)
            }
        }, delay)
    })
}


// fakeRequestCallback('books.com/page1',
//     function (response) {
//         console.log("IT WORKED!!!!")
//         console.log(response)
//         fakeRequestCallback('books.com/page2',
//             function (response) {
//                 console.log("IT WORKED AGAIN!!!!")
//                 console.log(response)
//                 fakeRequestCallback('books.com/page3',
//                     function (response) {
//                         console.log("IT WORKED AGAIN (3rd req)!!!!")
//                         console.log(response)
//                     },
//                     function (err) {
//                         console.log("ERROR (3rd req)!!!", err)
//                     })
//             },
//             function (err) {
//                 console.log("ERROR (2nd req)!!!", err)
//             })
//     }, function (err) {
//         console.log("ERROR!!!", err)
//     })



//.then() means if this is resolved



// fakeRequestPromise('yelp.com/api/coffee/page1')
//     .then(() => {
//         console.log("IT WORKED!!!!!! (page1)")
//         fakeRequestPromise('yelp.com/api/coffee/page2')
//             .then(() => {
//                 console.log("IT WORKED!!!!!! (page2)")
//                 fakeRequestPromise('yelp.com/api/coffee/page3')
//                     .then(() => {
//                         console.log("IT WORKED!!!!!! (page3)")
//                     })
//                     .catch(() => {
//                         console.log("OH NO, ERROR!!! (page3)")
//                     })
//             })
//             .catch(() => {
//                 console.log("OH NO, ERROR!!! (page2)")
//             })
//     })
//     .catch(() => {
//         console.log("OH NO, ERROR!!! (page1)")
//     })


// THE CLEANEST OPTION WITH THEN/CATCH***************************
// RETURN A PROMISE FROM .THEN() CALLBACK SO WE CAN CHAIN! (what makes this so easy/clean)
//if page 1 resolved then call fakeRequestPromise(page2) (then means if this is resolved)
fakeRequestPromise('yelp.com/api/coffee/page1')
    .then((data) => {
        console.log("IT WORKED!!!!!! (page1)")
        console.log(data) //data from request
        return fakeRequestPromise('yelp.com/api/coffee/page2') //returns promise obj 
    })
    .then((data) => { //.then refers to obj returned above 
        console.log("IT WORKED!!!!!! (page2)")
        console.log(data)
        return fakeRequestPromise('yelp.com/api/coffee/page3')
    })
    .then((data) => {
        console.log("IT WORKED!!!!!! (page3)")
        console.log(data)
    })
    //can use a single .catch for all above requests
    .catch((err) => { 
        console.log("OH NO, A REQUEST FAILED!!!")
        console.log(err)
    })



