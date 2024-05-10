const mongoose = require('mongoose');

db = mongoose.connect;
 
mongoose.connect('mongodb://localhost:27017/relationshipDemo');
main().catch(err => console.log(err));

async function main() {
  await db('mongodb://localhost:27017/relationshipDemo');
  console.log('mongo connection opened!!!')
}

const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses: [
        {
            _id: {id: false}, //turn off id's
            street: String,
            city: String,
            state: String,
            country: String,
        }
    ]
})

const User = mongoose.model('User', userSchema);

const makeUser = async()=>{
    const u = new User({
        first: 'Harry',
        last: 'Potter',
    })
     u.addresses.push({
        street: '123 Sesame St.',
        city: 'New York',
        state: 'NY',
        country: 'USA'
    }) 
    const res = await u.save()
    console.log(res);
}

const addAddress = async(id)=>{
    const user = await User.findById(id);
    user.addresses.push({
        street: '1234 Fake St.',
        city: 'Phoenix',
        state: 'AZ',
        country: 'USA'
    })
    const res = await user.save();
    console.log(res);
}


//makeUser();
//addAddress('63dad13e3fabe98b75dad731');
