/*
function add(x,y){
    return x+y;
}
*/

//FUNCTION EXPRESSION
//storing in variable
const add = function(x,y){
    return x+y;
}
//storing a function with no name, inside of a variable
add(1,2)
console.log(add);
console.log(add(1,2));

//HIGHER ORDER FUNCTIONS
//pass in a function
function callTwice(func){
    func();
    func();
}

function ayo(){
    console.log("Ayooo");
}
callTwice(ayo);


//RETURN A FUNCTION
function makeBetweenFunc(min,max){
    return function(num){ //returns a function
        return num >= min && num <= max; //returns true or false
    }
}

const isChild = makeBetweenFunc(0, 17);
console.log(isChild);
console.log(isChild(2));
console.log("-------------");
const isAdult = makeBetweenFunc(18, 65);
console.log(isAdult);
console.log(isAdult(2));


//DEFINING METHODS
//we can add functions as properties on objects - we call them methods
//every method is a function, but not every function is a method

//The Math object contains many methods (i.e. pow, max, etc.)

//myMath is an obj
//square and cube is a method
//a method is function that has been added as a property on some object
const myMath = {
    square: function(num){
        return num ** num;
    },
    cube: function(num){
        return num ** 3;
    }
}

console.log(myMath.cube(2));

//SHORTHAND OF THIS ^^^
const myMath2 = {
    square(num){
        return num ** num;
    },
    cube(num){
        return num ** 3;
    }
}

console.log(myMath2.cube(2));


//THIS KEYWORD
const cat = {
    name: "Fluffy",
    color: "grey",
    breed: "russian blue",
    meow(){
        console.log("This: ", this); //this refers to the object that this method is defined on
        console.log(`${this.name} says Meow Meow`);
    }
}

cat.meow(); //this is cat obj
/* console.log(this); //try in browswer f12 */
const meow2 = cat.meow;
console.log(meow2);
meow2(); //window object(should be the same as line 91^)

//udemy exercise
const hen = {
    name: "Helen",
    eggCount: 0,
    layAnEgg(){
        this.eggCount++;
        return "EGG";
    }
}

// TRY/CATCH 
//handles errors in program and allows us to continue program instead
//of it stopping due to error
try{
    hello.toUpperCase();
}
catch{
    console.log("ERROR");
}
console.log("we still going!");


function yell(msg){
    try{
        //in case msg not a string
        console.log(msg.toUpperCase().repeat(3));
    }
    catch{
        console.log("Please pass a string next time...");
    }
}

yell("AHHHH");
yell(123);
