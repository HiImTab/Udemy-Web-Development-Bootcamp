const math = require('./math');

//if just wanted pi and square from math.js
/* const math{PI, square} = require('./math');*/

//exports an empty obj if not module.export not defined in math.js
console.log(math);

console.log(math.PI);
console.log(math.square(9));