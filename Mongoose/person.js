//mongoose virtuals
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/shopApp');
  console.log('connection opened!!!')
}

const personSchema = new mongoose.Schema({
    first: String,
    last: String
})

//getter
//doesn't exist on database but only on the mongoose side of things in javascript
personSchema.virtual('fullName').get(function(){
    return `${this.first} ${this.last}`
})

//setter's similar to getters^^

//middleware (may need to look at docs)
//for example, when you create a new review, you want to update the average score of all reviews

//before save 
personSchema.pre('save', async function(){
    //overrides first and last before saving
/*     this.first = 'yo';
    this.last = 'mama'; */
    //to see output in node
    //l.save().then(p => console.log(p))
    console.log('ABOUT TO SAVE!') 
})
//after save
personSchema.post('save', async function(){
    console.log('JUST SAVED!')
})
//create a new person in node and then save

const Person = mongoose.model('Person', personSchema);
//in gitbash
//const tab = new Person({first: 'Tab', last: 'Poop'})
//tab.fullName
//tab.save() to see in mongoose side