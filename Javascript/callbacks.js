//array callback methods (require you to pass a function into them)
//FOR EACH - accepts a callback function, calls the function once per element in array
//not used often because of for of loop
const numbers = [1,2,3,4,5,6,7,8,9,10];

/* function print(element){
    console.log(element);
}
//does it for each element
numbers.forEach(print); */

//more common
numbers.forEach(function(el){
    console.log(el);
})

console.log("-------");
numbers.forEach(function(el){
    if(el%2 == 0){
        console.log(el);
    }
})

//----------------------------------------
//MAP! - creates a new array with the results of calling a callback on every element in the array

const doubles = numbers.map(function(num){
    return num*2;
})

console.log(doubles);

// DO NOT ALTER THE FOLLOWING CODE:
const fullNames = [{first: 'Albus', last: 'Dumbledore'}, {first: 'Harry', last: 'Potter'}, {first: 'Hermione', last: 'Granger'}, {first: 'Ron', last: 'Weasley'}, {first: 'Rubeus', last: 'Hagrid'}, {first: 'Minerva', last: 'McGonagall'}, {first: 'Severus', last: 'Snape'}];

// Write your code here
const firstNames = fullNames.map(function(name){
  return name.first;  
})
//------------------------------------------

//ARROW FUNCTIONS (SUPER USEFUL**)
//not supported by internet explorer
//help us make a function expression (more compact)

//function expression exp
/* const add = function(x,y){
    return x+y;
} */
const add = (x,y) => {
    return x+y;
}

console.log(add(1,2));

//don't need parenthesis if you only have one arg/parameter
const square = (x) => {
    return x*x;
}

console.log(square(1));

//no parameters/args
const rollDie = () => {
    return Math.floor(Math.random() * 6) + 1;
}

console.log(rollDie());
console.log("-------");

//arrow functions implicit return (return without stating return)
//only works for one statement
const rollDie2 = () => (
    Math.floor(Math.random() * 6) + 1
)

console.log(rollDie2());

const sub = (a,b) => a-b
console.log(sub(2,1));

//---------------------------
console.log("Hello...");

/* //setTimeout
//parameters: (a callback function, num of seconds to delay)
//after 3 seconds (3000 ms), it will run the function
setTimeout(() => {
    console.log("Are you still there?")
}, 3000)

console.log("Goodbye");

//setInterval (returns id of interval), repeats every 2 sec
//is continuous until clearInterval
//look at triggerID ??
const id = setInterval(() => {
    console.log(Math.random())
}, 2000);

console.log(id); */

//stops interval  (can have multiple intervals at once)
//clearInterval(id); 

//-------------------------
//FILTER (filter array)
//creates new array with all elements that pass the test implemented by the function

//using old numbers array created earlier
const a = numbers.filter((n) => {
    return n < 5;
})

console.log(a);

//can use map after filter (look at colt's example on filter video 5min)
//movies.filter(m => m.score > 80).map(m => m.title) //returns array of good movie titles

//need to return twice** tough practice
const usernames = ['mark', 'staceysmom1978', 'q92809830972904703', 'carrie98', 'moanafan'];
function validUserNames(usernames) {
    // your code here
    return usernames.filter( user => {
        return user.length < 10;
    })
  }

const l = validUserNames(usernames);
console.log(l)

//-------------------------
//some - similar to every, but returns true if ANY of the array elements pass the test function
//returns true or false
//every returns true if every element passes test

const exams = [99,88,76,89,32,59,61];

//every
console.log(exams.every(score => score >= 30))
console.log(exams.every(score => score >= 70))
//some
console.log(exams.some(score => score >= 70))

console.log("exercise:");
const numberz = [2,4,6,8,10];
function allEvens(numbers){
    return numbers.every(num => (num % 2) === 0)
}

console.log(allEvens(numberz));

//---------------------------------
//Reduce - executes a reducer function on each element of the array, results in a single value

const prices = [9.99,1.50,19.99,49.99,30.50];

/* let total = 0;
for(let price of prices){
    total += price;
} */

//reduction (1st param is accumulator/single value, variable that will keep being used
//2nd param is element of array)
const total = prices.reduce((total, currentPrice) => {
    return total + currentPrice
})
console.log(total);

const min = prices.reduce((min, currentPrice) => {
    if(min < currentPrice){
        return min;
    }else{ 
        return currentPrice;
    }
})

console.log(min);

//there's a 2nd param for reduce for exp:
const evens = [2,4,6,8];
//100 is initial value for sum/accumulator/single val
const p = evens.reduce((sum, num) => sum + num, 100)
console.log(p);

//------------------------------
//ARROW FUNCTIONS & THIS!
//the keyword this behaves different in an arrow function compared to a regular function
//obj
/* const person = {
    firstName: 'Abbie',
    lastName: 'Graham',
    fullName: function(){
        return `${this.firstName}, ${this.lastName}`;
    }
}
console.log(person.fullName()); */

const person = {
    firstName: 'Abbie',
    lastName: 'Graham',
    fullName: () => {
        //this refers to the scope it was created in, therefore the window obj
        //console.log(this); //refers to window obj
        return `${this.firstName}, ${this.lastName}`;
    },
    shoutName: function(){
        setTimeout(() => { //refers to scope where this function was created
            console.log(this); //refers to person (Abbie)
            console.log(this.fullName())
        }, 3000)
    }
}
console.log(person.fullName());
console.log(person.shoutName());
