const fs = require('fs');

//if argv[2] undefined, make default folder name Project
const folderName = process.argv[2] || 'Project';

/* console.log(fs);*/

//synchronous version blocks entire process until callback complete, halting all connections
//in busy processes use asynchronous version

//must provide a data argument after file for writeFileSync
try{
    fs.mkdirSync(folderName);
    fs.writeFileSync(`${folderName}/index.html`, '')
    fs.writeFileSync(`${folderName}/app.js`, '')
    fs.writeFileSync(`${folderName}/styles.css`, '')
} catch(e){
    console.log("Something when wrong...");
    console.log(e);
}