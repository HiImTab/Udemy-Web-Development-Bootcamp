const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

const ImageSchema = new Schema({
    url: String,
    filename: String
});

//https://mongoosejs.com/docs/tutorials/virtuals.html
ImageSchema.virtual('thumbnail').get(function(){
    //this refers to the particular image
    return this.url.replace('/upload', '/upload/w_200');
});

//stringify virtuals so they can be used in clustermap.js
const opts = { toJSON: { virtuals: true } };

const CampgroundSchema = new Schema ({
    title: String,
    images: [ImageSchema],
    //mongoose schema type for geoJSON: https://mongoosejs.com/docs/geojson.html
    geometry: {
        type: {
          type: String, 
          enum: ['Point'], 
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }
    ]
}, opts);

//virtuals not stored in database, but can be used to get properties
CampgroundSchema.virtual('properties.popUpMarkup').get(function(){
    //this refers to the particular image
    return `<strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>`;
});

//delete reviews when a campground is deleted
CampgroundSchema.post('findOneAndDelete', async function(doc){
    //console.log(doc);
    //if campground/doc was deleted
    if(doc){
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema);



