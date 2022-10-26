const Cars = require('./cars-model')
const yup = require('yup')

const carsSchema = yup.object({
  vin: yup.string().typeError('VIN must be a string').required('vin is missing').trim(), 
  make:yup.string().typeError('Make must be a string').required('make is missing').trim(), 
  model:yup.string().typeError('Model must be a string').required('model is missing').trim(),
  mileage:yup.number().typeError('Mileage must be a number').required('mileage is missing'),
  title:yup.string().typeError('title must be a string'),
  transmission:yup.string().typeError('transmission must be a string')
})

const checkCarId = (req, res, next) => {
  // DO YOUR MAGIC
  Cars.getById(req.params.id).then( car => {
    car ? next() : res.status(404).json({message: `car with id ${req.params.id} is not found`})
  })
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  carsSchema.validate(req.body, { stripUnknown: true}).then(validated => {
    req.car = validated
    next()
  }).catch(err => {
    console.log(err.message)
    err.message.includes("is missing") ? res.status(400).json({message: err.message}) : next(err)
  })
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  if(req.body.vin.trim().length !== 17 || req.body.vin.includes("i", "o", "q","I","O","Q")){
    res.status(400).json({message:`vin ${req.body.vin.trim()} is invalid`})
  } else {
    next()
  }
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
  Cars.getByVin(req.body.vin).then(car => {
    !car ? next() : res.status(400).json({message: `vin ${req.body.vin.trim()} already exists`})
  })
}

// checkCarId returns a status 404 with a { message: "car with id <car id> is not found" } if the id in req.params does not exist in the database.

// checkCarPayload returns a status 400 with a { message: "<field name> is missing" } if any required field is missing.

// checkVinNumberValid returns a status 400 with a { message: "vin <vin number> is invalid" } if the vin number is invalid.

// checkVinNumberUnique returns a status 400 with a { message: "vin <vin number> already exists" } if the vin number already exists in the database.

module.exports = {checkCarId, checkCarPayload, checkVinNumberUnique, checkVinNumberValid}