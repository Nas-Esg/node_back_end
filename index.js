const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const server = express()
const PORT = process.env.PORT || 3333

// Server use

    server.use(helmet())
    server.use(cors())
    server.use(express.urlencoded({ extended: false }))
    server.use(express.json())

// Routes
    const movieRoute = require('./routes/movie')
    server.use('/movie', movieRoute)    

// Database connection
    const {Database_Connect} = require('./config/database') 
    Database_Connect()

// API WRAPPING 
const app = express()
app.use('/api/v1', server)

// PORT Listener
app.listen(PORT, ()=> {
    console.log(`API is running on port : ${PORT}`)
})