
function sing(){
    console.log("La la lalal aalallalaa");
}

function singWhat(v){
    console.log(v);
}

function name(fName, lName){
    console.log(`FirstName: ${fName} LastName: ${lName}`);
}

function add(n1, n2){
    return n1+n2;
}

sing();
singWhat("ahhhhhHAHAHAHAHAHHA");
name('Johh', 'Smith');

let ans = add(1, 2);
console.log(ans);

console.log("-----");

function lastElement(arr){   
    if(arr.length === 0){
        return null;
    }
    else{
        return arr[arr.length-1];
    }
}
let yo = [1,2,3,4];
console.log(lastElement(yo));

function capitalize(str){
    let s = str[0];
    let newStr = s.toUpperCase() + str.slice(1);
    return newStr;
}

let y = capitalize("yoshi");
console.log(y);