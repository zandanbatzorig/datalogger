const Sensor = require('../models/Sensor')

//show the list of Sensor
const index = (req, res, next) => {
    Sensor.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            messege: 'An error Occured!'
        })
    })
}

//Show single sensor
const show = (req, res, next) => {
    let sensorID = req.body.sensorID
    Sensor.findById(sensorID)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            messege: 'An error Occured!'
        })
    })
}

// add new sensor
const store = (req, res, next) => {
    let sensor = new Sensor({
        devid:req.body.devid,
        devserial: req.body.devserial,
        temp1: req.body.temp1,
        temp2: req.body.temp2,
        humi: req.body.humi,
    })    
    sensor.save()
    .then(response => {
        res.json({
            messege: 'Employee Added Successfully!'
        })
    })
    .catch(error => {
        res.json({
            messege: 'An error Occured'
        })
    })
}

// update an sensor
const update = (req, res, next) => {
    let sensorID = req.body.sensorID

    let updatedData = {
        devid: req.body.devid,
        devserial: req.body.devserial,
        temp1: req.body.temp1,
        temp2: req.body.temp2,
        humi: req.body.humi       
    }

    Sensor.findByIdAndUpdate(sensorID, {$set: updatedData})
    .then(() => {
        res.json({
            messege: 'Employee updated successfully!'
        })
    })
    .catch(error => {
        res.json({
            messege: 'An error Occured!'
        })
    })
}

// delete an employee
const destroy = (req, res, next) => {
    let sensorID = req.body.sensorID

    Sensor.findByIdAndDelete(sensorID)

    .then(() => {
        res.json({
            messege: 'Employee deleted successfully!'
        })
    })
    .catch(error => {
        res.json({
            messege: 'An error Occured!'
        })
    })
}

module.exports = {
    index, show, store, update, destroy
}