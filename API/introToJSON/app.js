//string of JSON
const data = `{"ticker":{"base":"BTC","target":"USD","price":"443.7807865468","volume":"31720.1493969300","change":"0.3766203596"},"timestamp":1399490941,"success":true,"error":""}`

//puts in obj
const parseObj = JSON.parse(data);

console.log(parseObj.ticker.price);

//javascript obj to json
//dog obj
const dog = {breed: 'lab', color: 'black', isAlive: true, owner: undefined};
const j = JSON.stringify(dog);

console.log(j);
