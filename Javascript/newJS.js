//---------------------------
//default parameters
//if user doesn't pass in a param
//old way
/* function rollDie(numOfSides){
    if(numOfSides === undefined){
        numOfSides = 6;
    }
    return Math.floor(Math.random() * numOfSides) + 1;
} */

//NEW and better way********!!
function rollDie(numOfSides = 6){
    return Math.floor(Math.random() * numOfSides) + 1;
}
console.log(rollDie(20));
console.log(rollDie());

//issue: order matters for ex:
/* function greet(msg="Ayo", person){
    console.log(`${msg}, ${person}!`)
} */
//result is John, undefined! (ORDER MATTERS!)
//greet("John");
//correct way: (make sure default parameters are after any non-default params)
 function greet(person, msg="Hey there"){
    console.log(`${msg}, ${person}!`);
} 
greet("John");

//--------------------------
//SPREAD (expanding an iterable such as an array/string, etc)

const nums = [1,2,3,4,5,6,7,8,9,10];
console.log(Math.max(nums)); //returns NaN
console.log(Math.max(...nums)); //spreading the elements of the nums array as separate args

console.log(nums);
console.log(...nums);

console.log("Hello");
console.log(..."Hello"); //spreading them as separate args/chars

//Spread with array literals!
//how we can spread an iterable into an array!

const cats =["Stormy", "Smokey", "Simon"];
const dogs = ["Murphy", "Purel", "Casey", "Nala"];
//copy contents of cats and dogs in allPets
const allPets = [...cats, ...dogs, "Speedy"];
console.log(allPets);

//Spread with object literals!
//copies properties from one object into another obj literal
const feline = {legs: 4, family: "Felidae"}
const canine = {legs: 4, family: "Caninae"}

const kitty = {...feline, color: 'grey'}
console.log(kitty);

//copies qualities of both but there is a conflict
//they both have a family property so order matters (therefore feline wins)
const catDog = {...feline, ...canine}
console.log(catDog);
const catDog2 = {...kitty, ...canine}
console.log(catDog2);

console.log({..."HIIIIII"});

const dataFromForm = {
    email: 'lala@gmail.com',
    password: '1234',
    username: 'potato'
}

const newUser = {...dataFromForm, id: 0001, isAdmin: false};
console.log(newUser);

//-------------------
//The Arguments object!!!
//looks/acts like an array (array-like), not available in arrow functions
//holds all args passed in function

//Rest Params
//collects all remaining args and puts them in an actual array

//doesn't work because arguments is NOT an array (even tho it acts like one)
/* function sum(){
    return arguments.reduce((total, elements) => total+elements)
} */

//3 dots for rest, collecting the rest of the params and put them in num
//rest - collecting things into a single param
function sum(...nums){
    console.log(nums);
    return nums.reduce((total, elements) => total+elements)
}

console.log(sum(1));
console.log(sum(1,2,3));
console.log(sum(99,55,33,22));

function raceResults(gold, silver, ...everyoneElse){
    console.log(`Gold Medal goes to: ${gold}`);
    console.log(`Silver Medal goes to: ${silver}`);
    console.log(`And thanks to everyone else: ${everyoneElse}`);
}

raceResults('John','Becky','Putin','Shrek','Kirby');

//-----------------------------
//Destructuring Arrays
//unpacking values from arrays and putting them in distinct variables

//already sorted from high to low
const scores = [8493846546, 3434544, 343242, 45464, 34343, 1111];

//normal way
const highScore = scores[0];
const secHighScore = scores[1];

//shorter way
//storing 1st 3 elements into variables (gold, silver, bronze, everyoneElse(everyting else in array))
const [gold, silver, bronze, ...everyoneElse] = scores;
console.log(gold);
console.log(everyoneElse);

//-------------------------------
//destructuring from objects (more common)

const user = {
    email: "ahh@gmail.com",
    phone: "623-111-1111",
    fName: "Jogn",
    lName: "ikhdiwd",
    born: 1996,
    city: 'phoenix',
    died: 1999
}
const user2 = {
    email: "lalalalalalala@gmail.com",
    phone: "623-222-2222",
    fName: "girl",
    lName: "jkasjdowl",
    born: 1997,
    city: 'san diego'
}

//normal way
/* const firstName = user.fName;
const lastName = user.lName; */

//const email = user.email;
//shorter way, equivalent to line above
//const {email} = user;

//have to be the same name as what it is in user
const{email, fName, lName, born} = user;
console.log(email);
console.log(fName);

//to change name, taking user.born and putting it into birthYear variable
const {born: birthYear, died='N/A'} = user;

//N/A is a default value that will be assigned if no there is no died found in user2
const{city, fName:fName2, died:died2 = 'N/A'} = user2;
console.log(died);
console.log(died2);

//----------------------------------------------
//destructuring params

/* function fullName(user){
    const{fName, lName} = user; //destructing params
    return `${fName}, ${lName}` //easier instead of user.firstName
}
console.log(fullName(user)); */

//even better way (destruct params in params)
//poo default lastname if not found
function fullName({fName, lName = "poo"}){
    return `${fName}, ${lName}`;
}
console.log(fullName(user));