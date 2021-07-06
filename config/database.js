  
const mongoose = require('mongoose')
const key = 'mongodb://127.0.0.1:27017/'

exports.Database_Connect = () => {
    mongoose.connect(key, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));
}