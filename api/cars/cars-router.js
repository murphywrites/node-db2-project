// DO YOUR MAGIC
const express = require('express')
const Cars = require('./cars-model')
const { checkCarId , checkCarPayload, checkVinNumberValid, checkVinNumberUnique} = require('./cars-middleware')

const router = express.Router()

router.get('/', (req, res, next) => {
    Cars.getAll().then(cars => {
        res.status(200).json(cars)
    }).catch(err => {
        next(err)
    })
})

router.get('/:id', checkCarId, (req, res, next) => {
    const { id }  = req.params
    Cars.getById(id).then(car => {
        res.status(200).json(car)
    }).catch(err => {
        next(err)
    })
})

router.post('/', checkCarPayload, checkVinNumberValid,checkVinNumberUnique, (req, res, next) => {
    Cars.create(req.body).then(car => {
        res.status(201).json(car)
    }).catch(err => {
        next(err)
    })
})

module.exports = router
