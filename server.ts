require('dotenv').config()
const cors = require('cors')
const PORT = process.env.API_PORT || 5001
import mongoDB from './mongoDB_server'
const express = require('express')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))


// routes
app.use('/api/products', require('./controllers/productController'))
app.use('/api/authentication', require('./controllers/authenticationController'))


// initialize mongoDB
mongoDB()
app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`))