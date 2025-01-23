const Device = require('../models/Device')

//show the list of Sensor
const index = (req, res, next) => {
    Device.find()
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
    Device.findById(sensorID)
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
    let sensor = new Device({
        devid: req.body.devid,
        devserial: req.body.devserial,
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
        devserial: req.body.devserial      
    }

    Device.findByIdAndUpdate(sensorID, {$set: updatedData})
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

    Device.findByIdAndDelete(sensorID)

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