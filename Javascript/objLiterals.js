console.log(typeof [])

///create empty obj
/* const person = {} */

//just like with arrays we commonly use const
const person = {firstName: "John", lastName: "Smith"}

console.log(person);

//to get last name
console.log(person["lastName"]);
console.log(person.lastName); 

//all keys (firstname, lastname) are converted to strings
const years = {1999: "GOOD", 2020: "BAD"};
console.log(years["2020"]);
console.log(years[2020]); //converts num to string

const midterms = {john: 96, tab: 33};
console.log(midterms);

midterms.tab = 88;
console.log(midterms);

midterms.cheese = 0;
console.log(midterms);

//arrays and objects
const comments = [
    {user: "pooMan", text: "lol", votes: 3},
    {user: "rawrXD", text: "rawrrr", votes: -1}
]

console.log(comments[1].text);