const express = require('express')
const Router = express.Router()
const {WriteMovieRate, updateOne, deleteOne} = require('../controllers/rating')

// -- RATE SOME MOVIE --
Router.route('/:movieID/:uid').post((req,res)=>{
    WriteMovieRate(req,res)
})

// -- UPDATE -- 
Router.route('/:id').put((req,res)=>{
    updateOne(req,res)
})
// -- DELETE --
Router.route('/:id').delete((req,res)=>{
    deleteOne(req,res)
})

module.exports = Router