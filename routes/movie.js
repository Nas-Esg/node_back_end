const express = require('express')
const Router = express.Router()
const {readAllMovieRates, readAll, readOne, create, updateOne, deleteOne} = require('../controllers/movie')
// CRUD

Router.route('/ratings/:movieID').get((req,res)=>{
    readAllMovieRates(req,res)
})


// -- READ ALL --
Router.route('/movies').get((req,res)=>{
    readAll(req,res)
})
// -- READ ONE --
Router.route('/:id').get((req,res)=>{
    readOne(req,res)
})
// -- CREATE --
Router.route('/').post((req,res)=>{
    create(req,res)
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