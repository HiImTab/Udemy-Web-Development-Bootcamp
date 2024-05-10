/*look at JS async slides*/
//can use debugger on chrome, f12 -> sources tab (watch callstack vid #273)***
//call stack - lifo (like a stack, which functions being called)
//a structure helps JS keep its place in our code and function calls (like using a bookmark
//in a book or using your finger to follow words in book)

//JS is single threated, cant run multiple lines of code at once (only one)
//there are ways around this (like setTimeout) b/c the browser is doing the work (not written in
//JS, it's written in a lang like c++ (which supports multi threading))
//JS hands off tasks to browsers (it recognizes these web APIs and [ ])
//when browser finishes the tasks, it is added back onto the callstack


// ===============
// YIKES!!!!!!!!!!!
// ===============
// setTimeout(() => {
//     document.body.style.backgroundColor = 'red';
//     setTimeout(() => {
//         document.body.style.backgroundColor = 'orange';
//         setTimeout(() => {
//             document.body.style.backgroundColor = 'yellow';
//             setTimeout(() => {
//                 document.body.style.backgroundColor = 'green';
//                 setTimeout(() => {
//                     document.body.style.backgroundColor = 'blue';
//                 }, 1000)
//             }, 1000)
//         }, 1000)
//     }, 1000)
// }, 1000)


const delayedColorChange = (newColor, delay, doNext) => {
    setTimeout(() => {
        document.body.style.backgroundColor = newColor;
        doNext && doNext();
    }, delay)
}

// STILL A LOT OF NESTING!!!
delayedColorChange('red', 1000, () => {
    delayedColorChange('orange', 1000, () => {
        delayedColorChange('yellow', 1000, () => {
            delayedColorChange('green', 1000, () => {
                delayedColorChange('blue', 1000, () => {

                })
            })
        })
    })
});


// searchMoviesAPI('amadeus', () => {
//     saveToMyDB(movies, () => {
//         //if it works, run this:
//     }, () => {
//         //if it doesn't work, run this:
//     })
// }, () => {
//     //if API is down, or request failed
// })




