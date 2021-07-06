const Movie = require('../models/movie')
const Rate = require('../models/rating')

// Read all movies
exports.readAll = (req, res) => {
    Movie.find()
    .then(response=>{
        if(!response){
            return res.status(400).json({message : "There is no movies available"});
        }
        else if(response){
            return res.status(200).json({Movies : response})
        }
    })
    .catch(err=> {
        console.log(err);
        return res.status(500).json({message : "Oops, we're sorry but it appears that something went wrong."})
    })
}

exports.readAllMovieRates = (req, res) => {
    id = req.params.movieID
    Movie.findOne({id: id})
    .then(response=>{
        if(!response){
            return res.status(400).json({message : `There is no movie available with id=${id}`});
        }
        else if(response){
            Rate.find({movie_ID : id})
            .then((re)=>{
                return res.status(200).json({Ratings : re})
            })
            .catch((err)=>{
                return res.status(400).json({message : err})
            })
        }
    })
    .catch(err=> {
        console.log(err);
        return res.status(500).json({message : "Oops, we're sorry but it appears that something went wrong."})
    })
}
// Read one movie
exports.readOne = (req, res) => {
    id = req.params.id
    Movie.findOne({_id: id})
    .then(response=>{
        if(!response){
            return res.status(400).json({message : `There is no movie available with id=${id}`});
        }
        else if(response){
            return res.status(200).json({Movies : response})
        }
    })
    .catch(err=> {
        console.log(err);
        return res.status(500).json({message : "Oops, we're sorry but it appears that something went wrong."})
    })
}

// Create one movie
exports.create = (req, res) => {
    // CHECK IF THERE IS A MOVIE WITH THE SAME IN THE DB, IF NOT GO ELSE 
    Movie.findOne({title : req.body.title})
    .then(response => {
        if(response){
            return res.status(400).json({message : "Movie title is not available, there is an item in the database with the same name."})
        }
        else {
            newMovie = new Movie({
                title : req.body.title,
                releaseDate : req.body.releaseDate,
                description : req.body.description,
                category : req.body.category,
                movieDirector : req.body.movieDirector,
            })
            newMovie.save()
            .then(response=> {
                if(response) {
                    return res.status(200).json({message : "Movie created successfully."});
                }
            })
            .catch(err => {
                return res.status(500).json({message : err});
            })
        }
    })
    .catch(err=>{
        return res.status(500).json({message : err});
    })

}
// Update one movie
exports.updateOne = (req,res) => {
    id = req.params.id
    Movie.findOne({_id : id})
    .then(response => {
        if(!response) {
            return res.status(400).json({message : "There is no movie available with the given ID."})
        } else {
            response.updateOne(req.body,function(err,doc){
                if(doc) {
                    console.log(`Movie updated successfully, movieId : ${id}`)
                    return res.status(200).json({message : "Movie updated successfully."});
                }
            })
        }
    })
    .catch((err)=> {
        console.log(err)
        return res.status(500).json({message : "It appears that there is no Movie with the given information."})
    })
   
}

exports.deleteOne = (req,res) => {
    id = req.params.id

    if(id) {
        Movie.findByIdAndDelete({_id : id})
        .then(response => {
            if(!response) {
                return res.status(400).json({message : "There is no movie available with the given ID."})
            } else {
                console.log(`Movie deleted successfully, spaceId : ${id}`)
                return res.status(200).json({message : "Movie deleted successfully."});
            }
        })
        .catch((err)=> {
            console.log(err)
            return res.status(500).json({message : "It appears that there is no movie with the given information."})
        })
    } else {
        return res.status(500).json({message : "Please select a document to delete !"})
    }
}