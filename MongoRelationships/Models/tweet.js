const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//or const {Schema} = mongoose;

db = mongoose.connect;
 
mongoose.connect('mongodb://localhost:27017/relationshipDemo');
main().catch(err => console.log(err));

async function main() {
  await db('mongodb://localhost:27017/relationshipDemo');
  console.log('mongo connection opened!!!')
}

const userSchema = new Schema({
    username: String,
    age: Number
})

const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: {type: Schema.Types.ObjectId, ref: 'User'}
})

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

/* const makeTweets = async()=>{
    // const user = new User({username: 'chickenFan69', age: 55}); 
    //const tweet1 = new Tweet({text: 'omg chickens are hawt af!', likes: 0})
    const user = await User.findOne({username: 'chickenFan69'})
    const tweet2 = new Tweet({text: 'why are chickens so loud lol', likes: -2})
    tweet2.user = user;
    tweet2.save();
}

makeTweets(); */

const findTweet = async()=>{
    const t = await Tweet.find({}).populate('user', 'username');
    console.log(t);
}

findTweet();