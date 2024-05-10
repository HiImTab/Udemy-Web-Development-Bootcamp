//had to install old version of franc that still uses require()
//npm i franc@5.0.0
const franc = require("franc");
const langs = require("langs");
const colors = require("colors");

const input = process.argv[2];
const langCode = franc(input);

if(langCode === 'und'){
    console.log("error...".red);
}
else{
    const language = langs.where("3", langCode);
    console.log(`Our best guess is: ${language.name}`.green);
}
