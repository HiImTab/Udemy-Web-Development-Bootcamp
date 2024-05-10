//to make an empty array
let arr = [];

let colors = ["red", "blue", "green"];

//mixed array
let stuff = [true, 0, "lol", 1.2, NaN, null, undefined];

console.log(stuff.length);
console.log(stuff[0]);

//3rd element in stuff array (lol), 2nd element of lol (o)
console.log(stuff[2][1]);

//can update array elements
stuff[1] = 99;
console.log(stuff[1]);
/*Note: you cannot do this with strings^^^ */

stuff[10] = "oopsies"
//3 empty items
console.log(stuff);
console.log(stuff.length); //fills empty spaces
console.log(stuff[9]);

//push - add to end
//pop - remove from end
//shift - remove from start
//unshift - add to start

stuff.push(123, 456);
console.log(stuff);

//concat - merge arrays
//includes - looks for value (returns T or F)
//indexOf - just like string.indexOf (returns first index at which a given element can be found)
//join - creates a string from an array
//reverse - reverses an array
// slice - copies a portion of an array
//splice - removes/replaces elements
//sort - sorts an array

let colors2 = ["blue", "green", "red", "yellow", "purple", "violet"];

//goes from index 4 to end of array
console.log(colors2.slice(4));
console.log(colors2);
console.log(colors2.slice(2));
//goes from index 2 to index 4
console.log(colors2.slice(2,4));

let months = ['jan', 'mar', 'apr', 'jun'];

//where to start splice, how many to delete, what to add in
months.splice(1, 0, 'feb');
console.log(months);
//delete what is in index 3 and puts yomama in
months.splice(3, 1, 'yomama');
console.log(months);

//sort sorts(compares by UTF-16())

//can't use == or === to compare contens of arrays (compares references in memory not actual content)
//HOWEVER
let nums = [1,2,3];
let numsCopy = nums; //points to same memory*********
console.log(numsCopy == nums);

nums.push(4);
console.log(nums);
console.log(numsCopy);
console.log(numsCopy == nums); //numsCopy and nums are linked

numsCopy.push(5);
console.log(nums);
console.log(numsCopy);
console.log(numsCopy == nums);
console.log(numsCopy === nums);

//the values can change as long as the reference remains the same
const letters = ['a', 'b', 'c']; //if the shell remains the same then the contents can change
letters.push('d'); //can do this

/* letters = [1, 2, 3]; */ //can't do this

//multi-dim array
//tic tac toe board
let board = [
    ['O', null, 'X'],
    [null, 'X', 'O'],
    ['X', 'O', null]
]

console.log(board);
console.log(board[1][1]);
