const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    }
});

//statics is where we can define methods that we can call on the model
userSchema.statics.findAndValidate = async function(username, password) {
    //this refers to User model/schema
    const foundUser = await this.findOne({username});
    const isValid = await bcrypt.compare(password, foundUser.password);
    //if valid is true, return the user, otherwise return false
    return isValid ? foundUser : false;
}

//before saving a User
userSchema.pre('save', async function(next) {
    //if the password has not been modified, return next
    if(!this.isModified('password')) return next();
    //this refers to the user that is about to be saved
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

module.exports = mongoose.model('User', userSchema);