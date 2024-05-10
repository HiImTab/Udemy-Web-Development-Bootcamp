//powershell: mongod
//other powershell: mongo
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movieApp');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/movieApp');
  console.log('connection opened!!!')
}

/* {
    title: 'Friday',
    year: 1995,
    score: 8.5,
    rating: 'R'
} */
//node (to open node repl)
//.load index.js

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
})
//to see all databases use command: show dbs

//creates model called Movie, creates collection for us in mongoose called movies
//collections (in nosql databases) are similar to tables in sql databases
const Movie = mongoose.model('Movie', movieSchema);
//const friday = new Movie({title: 'Friday', year: 1995, score: 8.5, rating: 'R'});
//friday.save() in node repl to add to db
///can now open powershell: mongo -> use movieApp -> db.movies.find()

/* Movie.insertMany([
     { title: 'Amelie', year: 2001, score: 8.3, rating: 'R' },
     { title: 'Alien', year: 1979, score: 8.1, rating: 'R' },
     { title: 'The Iron Giant', year: 1999, score: 7.5, rating: 'PG' },
     { title: 'Stand By Me', year: 1986, score: 8.6, rating: 'R' },
     { title: 'Moonrise Kingdom', year: 2012, score: 7.3, rating: 'PG-13' }
])
  .then(data => {
      console.log("IT WORKED!")
      console.log(data);
  }) */

//FIND
//use in node repl to get all movies
// Movie.find({}).then(data => console.log(data))
//Movie.find({rating: 'PG-13'}).then(data => console.log(data))
//get recent movies later than or equal to 2010
//Movie.find({year: {$gte: 2010}}).then(data => console.log(data))

//Movie.find({_id: '63a3b00e9c524fc309962e21'}).then(m => console.log(m))
//Movie.findById('63a3b00e9c524fc309962e21').then(m=> console.log(m))

//UPDATE
//Movie.updateOne({title: 'Friday'}, {year: 1998}).then(res => console.log(res))
//Movie.updateMany({title: {$in: ['Friday', 'Stand By Me']}}, {score: 10}).then(res => console.log(res))

//DELETE
//Movie.remove({title: 'Amelie'}).then(msg => console.log(msg))

//DOCS
//https://mongoosejs.com/docs/api/model.html