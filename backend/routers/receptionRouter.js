const express = require('express')
const { reception1, errorHendlar, Doctor } = require('../models');
const ApiResponse = require('./apiResponse/apiResponse');

const router = express.Router()

router.post("/save", async (req, res) => {

    const doctor = await Doctor.findOne({ where: { id: req.user } })
    try {
        const reception = await reception1.create({
            "name": req.body.name,
            "phoneNumber": req.body.phoneNumber,
            "email": req.body.email,
            "password": req.body.password,
            "raddress": req.body.raddress,
            "doctor": doctor.id
        })
        res.json(new ApiResponse(true, reception, "reception detail saved","reception"))
    } catch (err) {
        var error = errorHendlar(err)
        res.json(new ApiResponse(false, error, "reception detailed not saved !"))

    }
});



router.get("/lists", async (req, res) => {

    try {
        const reception = await reception1.findAll({
            where: { doctor: req.user, activeStatus: true },

            attributes: { exclude: ['createdAt', 'updatedAt'] }
        })
        res.json(new ApiResponse(true, reception, "all receptions","receptions"))

    } catch (err) {
        const error = errorHendlar(err)
        res.json(new ApiResponse(false, error, "receptions failed !"))

    }
})

router.get("/oldreceptionlist", async (req, res) => {

    try {
        const reception = await reception1.findAll({
            where: { doctor: req.user, activeStatus: false },

            attributes: { exclude: ['createdAt', 'updatedAt'] }
        })
        res.json(new ApiResponse(true, reception, "all receptions","receptions"))

    } catch (err) {
        const error = errorHendlar(err)
        res.json(new ApiResponse(false, error, "receptions failed !"))

    }
})
router.put("/delete/:id", async (req, res) => {
    try {
        var id = req.params.id
        var receptions = await reception1.findOne({ where: { id: id } })
        if (receptions == null)
            res.json(new ApiResponse(false, null, "reception not found"))
        else
            var recdata = await receptions.update({ activeStatus: false })
        res.json(new ApiResponse(true, recdata, "reception deleted !","reception"))
    } catch (err) {
        var error = errorHendlar(err)
        res.json(new ApiResponse(false, error, "reception cant be deleted","reception"))
    }
});

router.put("/update/:id", async (req, res) => {
    try {
        const name = req.body.name
        const password = req.body.password
        const Oldpassword = req.body.Oldpassword
        const phoneNumber = req.body.phoneNumber
        const id = req.params.id
        const receptions = await reception1.findOne({ where: { id } })
        if (receptions == null)
            res.json(new ApiResponse(false, null, "reception not found"))
        else
            if (Oldpassword == receptions.password)
                var data = await receptions.update({ name, password, phoneNumber })

        res.json(new ApiResponse(true, data, "reception details update !","reception"))
    } catch (err) {
        var error = errorHendlar(err)
        res.json(new ApiResponse(false, error, "reception can't be update","reception"))
    }
});
module.exports = router