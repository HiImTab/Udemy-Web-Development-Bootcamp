const bcrypt = require('bcrypt');

/* const hashPassword = async(pwd) => {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(pwd, salt);
    console.log(salt)
    console.log(hash)
} */

const hashPassword = async(pwd) => {
    const hash = await bcrypt.hash(pwd, 12);
    console.log(hash)
} 


const login = async(pwd, hashedPwd) => {
    const result = await bcrypt.compare(pwd, hashedPwd);
    if(result){
        console.log('Logged in');
    }
    else{
        console.log('Incorrect password');
    }
}

hashPassword('monkey');