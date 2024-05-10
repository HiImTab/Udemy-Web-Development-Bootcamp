const people = ["Scooby", "Velma", "Daphne", "Shaggy", "Fred"]; //DONT TOUCH THIS LINE!

// WRITE YOUR LOOP BELOW THIS LINE:

for(let i = 0; i<people.length; i++){
    console.log(people[i].toUpperCase());
}

//the FOR OF LOOP***
//not supported in internet explorer

//syntax
/*
for (variable of iterable){
    statement
}
*/

const subreddits = ['cringe', 'chickens', 'doggos', 'funny', 'INFJ'];

for(let i = 0; i < subreddits.length; i++){
    console.log(`Visit reddit.com/r/${subreddits[i]}`);
}


for(let j of subreddits){
    console.log(`Visit reddit.com/r/${j}`);
}

console.log('----------------');
//multi-dim array
const petNames = [
    ['Barker', 'Bonerriffic'],
    ['Meower', 'Fluffy']
]

for(let i of petNames){
    for(let j of i){
        console.log(j);
    }
}

console.log('----------------');
for(let c of "hello world"){
    console.log(c);
}

const numbers = [1,2,3,4,5,6,7,8,9]; //DON'T CHANGE THIS LINE PLEASE!

// WRITE YOUR LOOP BELOW THIS LINE:
for(let i of numbers){
    console.log(Math.pow(i, 2));
}


//ITERATING OVER OBJECTS
//FOR IN LOOP
const testScores = {
    tab: 88,
    john: 0,
    kolton: 50,
    chris: 99
}

//gives us the key
for(let person in testScores){
    console.log(`${person} scored ${testScores[person]}`);
}

//Object.keys(testScores)
//returns an array of people names
//Object.values(testScores)
//returns an array of actual scores
console.log(Object.keys(testScores));
console.log(Object.values(testScores));

let sum = 0;
for(let score of Object.values(testScores)){
    console.log(score);
    sum += score;
}

console.log("--------------");
console.log(sum);
let total = Object.keys(testScores).length;
console.log(total);
//average
console.log(sum/total);