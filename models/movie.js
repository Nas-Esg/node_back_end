const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({    
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true,
    },
    releaseDate : {
        type : Date,
        required : true
    },
    category : {
        type : String,
        required:true
    },
    movieDirector : {
        type: String,
        required:true
    }
});

module.exports = mongoose.model('Movies', MovieSchema);