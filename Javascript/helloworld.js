//right click html and do open w/ live server to see webpage

//display to console
//console.log('My first JS program');

//declare variable
let name = "pooo";
console.log(name);

//constant
const rate = 0.3;
console.log(rate);

//javascript is a dynamic language!!!
name = 1;
//type is now a number
//in console you can do "typeof name" to check current type
//ctrl l clears console

name = "Taco";
let age = 30;

//object literal
let person = {
    name: 'Tab',
    age: 25
}

console.log(person);

//change person
person.name = "Tabitha";
console.log(person);
person["name"] = "Tab";
console.log(person);

let arr = [1,2,3];
console.log(arr);
console.log(arr[0]);

arr[4] = "lala";
console.log(arr);
//type of arr is an obj


function greet(){

    console.log("greetings earthling");
 
}

greet();

function ayo(name, food){

    console.log("Ayoo " + name + " " + food);
}

ayo(name, "cheese");

function add2(num){

    return num + 2;
}

console.log(add2(2));


//Javascript notes from freecodeacademy
//String values are immutable, which means that they cannot be altered once created, so you can't do str[0] = "h" to change the string var from ji to hi

/*
n JavaScript, scope refers to the visibility of variables. Variables which are defined outside of a function block have Global scope. This means, they can be seen everywhere in your JavaScript code.

Variables which are declared without the let or const keywords are automatically created in the global scope. This can create unintended consequences elsewhere in your code or when running a function again. You should always declare your variables with let or const.
*/



