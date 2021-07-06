const Rate = require('../models/rating')
const Movie = require('../models/movie')


// write one movie rate
exports.WriteMovieRate = (req, res) => {
    id = req.params.id
    Movie.findOne({_id: id})
    .then(response=>{
        if(!response){
            return res.status(400).json({message : `There is no movie available with id=${id}`});
        }
        else if(response){
            let newRating = new Rate({
                rating : req.body.rating,
                commentTitle : req.body.commentTitle,
                commentContent : req.body.commentContent,
                user_ID : req.params.uid,
                Movie_ID : id
            })
            newRating.save()
            .then(response=> {
                if(response) {
                    return res.status(200).json({message : "Movie Rated successfully."});
                }
            })
            .catch(err => {
                return res.status(500).json({message : err});
            })
        }
    })
    .catch(err=> {
        console.log(err);
        return res.status(500).json({message : "Oops, we're sorry but it appears that something went wrong."})
    })
}

// Update one rate
exports.updateOne = (req,res) => {
    id = req.params.id
    Rate.findOne({id: id})
    .then(response=>{
        if(!response){
            return res.status(400).json({message : `There is no rate available with id=${id}`});
        }
        else if(response){
            response.updateOne(req.body, function(err,doc){
                if(doc) {
                    console.log(`Rate updated successfully, rateID : ${id}`)
                    return res.status(200).json({message : "Rate updated successfully."});
                }
            })
        }
    })
    .catch(err=> {
        console.log(err);
        return res.status(500).json({message : "Oops, we're sorry but it appears that something went wrong."})
    })
   
}
// delete rating
exports.deleteOne = (req,res) => {
    id = req.params.id

    if(id) {
        Rate.findByIdAndDelete({_id : id})
        .then(response => {
            if(!response) {
                return res.status(400).json({message : "There is no Rate available with the given ID."})
            } else {
                console.log(`Rate deleted successfully, spaceId : ${id}`)
                return res.status(200).json({message : "Rate deleted successfully."});
            }
        })
        .catch((err)=> {
            console.log(err)
            return res.status(500).json({message : "It appears that there is no Rate with the given information."})
        })
    } else {
        return res.status(500).json({message : "Please select a document to delete !"})
    }
}