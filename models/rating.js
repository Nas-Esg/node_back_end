const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new Schema({    
    rating : {
        type : Number,
        required : true
    },
    commentTitle : {
        type : String,
        required : true
    },
    commentContent : {
        type : String,
        required:true
    },
    user_ID : {
        type: String,
        required:true
    },
});

module.exports = mongoose.model('Ratings', RatingSchema);