const express = require("express")
const carsRouter = require('./cars/cars-router')
const server = express()
server.use(express.json())



// DO YOUR MAGIC

server.use('/api/cars', carsRouter)

server.use((err, req, res, next) => {
    const { message, stack, status = 500 } = err
    const response = { message }
    if (process.env.NODE_ENV !== 'production' && stack) {
        response.stack = stack
    }
    res.status(status).json(response)
})

module.exports = server
