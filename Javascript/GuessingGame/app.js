let max = parseInt(prompt("Enter the maximum number!"));

//if max is not a valid num
while(!max){
    max = parseInt(prompt("Enter a valid maximum number!"));
}

let rand = Math.floor(Math.random() * max) + 1;
console.log(rand);

let guess = parseInt(prompt("Enter your first guess:"));
let attempts = 1;

while(parseInt(guess) !== rand){

    if(guess === 'q'){
        console.log("Quit");
        break;
    }
    if(guess > rand){
        guess = prompt("Too high, enter a new guess:");
    }
    else{
        guess = prompt("Too low, enter a new guess:");
    }
    attempts++;
}

if(guess === 'q'){
    console.log("Fuckin loser");
}
else{
    console.log("You Win!");
    console.log(`Attempts: ${attempts}`);
}
