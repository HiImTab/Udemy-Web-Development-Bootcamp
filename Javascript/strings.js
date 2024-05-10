let str = 'you had me at "hello"';
console.log(str);

console.log(str[0]);
console.log(str.length);

let concatenation = "first name" + " last name";
console.log(concatenation);

//can't update one char at a time in a string, only can overwrite the entire string
//String values are immutable, which means that they cannot be altered once created, so you can't do str[0] = "h" to change the string  from ji to hi

let wut = 1 + "hi";
console.log(wut);
//javascript makes them both strings (1 and "hi") (makes them into a common type)
console.log(typeof wut);

//string methods
let lala = "lala";
console.log(lala.toUpperCase());
console.log(lala);

//trim method: removes extra spaces
let yuh = "   get into it yuh    ";
console.log(yuh.trim());

//indexOf MDN in google to find what that method does (returns first occurence of specified value)
//slice returns new string containing extracted section of the string

console.log("you aren't stupid".slice(11));
console.log("you aren't stupid".slice(-6));
console.log("you are stupid".slice(4,8));

let msg = "you fuckin suck";
console.log(msg.replace("suck","are amazing"));

//STRING TEMPLATE LITERALS *****
//use back-tick not single quote : ```
//all content in ${} is evaluated
console.log(`hello ${1 + 2+ 9}`);

let qty = 99;
let product = "bananas";
let price = 1.20;

console.log("You bought " + qty + " " + product + ". Total is: " + price * qty);
//this is a string template literal
console.log(`You bought ${qty} ${product}. Total is: ${price*qty}`);

console.log(Math.floor(34.1));
//random num from 0 to 1
console.log(Math.random());

//random num between 1 to 10
console.log(Math.round(Math.random() * 10) + 1);


const die1 = Math.floor(Math.random() * 6) + 1; //random number from 1-6
const die2 = Math.floor(Math.random() * 6) + 1; //random number from 1-6

// YOUR CODE BELOW THIS LINE:
let roll = `You rolled a ${die1} and a ${die2}. They sum to ${die1+die2}`;
console.log(roll);