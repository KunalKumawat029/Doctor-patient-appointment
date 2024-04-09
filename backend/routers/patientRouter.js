const express = require('express');
const { patient, reception1, errorHendlar } = require('../models/index');
const ApiResponse = require('./apiResponse/apiResponse')
const router = express.Router()


router.post("/addpatient", async (req, res) => {
    const Reception = await reception1.findOne({ where: { id: req.user } })


    console.log(Reception)
    try {
        if (Reception == null)

            res.json(new ApiResponse(false, null, "reception Not Found !"))

        else {
            const pat = await patient.create({
                "name": req.body.name,
                "age": req.body.age,
                "sex": req.body.sex,
                "phoneNumber": req.body.phoneNumber,
                "appointmentdate": req.body.appointmentdate,
                "time": req.body.time,
                "daignosis": req.body.daignosis,
                "raddress": Reception.id,
                "doctor_name": Reception.doctor
            })

            res.json(new ApiResponse(true, pat, "patient detail is saved","patient"))
        }
    } catch (err) {
        var error = errorHendlar(err)
        res.json(new ApiResponse(false, error, "patient detailed not saved !","patient"))

    }



});

router.get("/list", async (req, res) => {

    try {
        const patients = await patient.findAll({
            include: ['address'],
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        })
        // console.log(patients)
        res.json(new ApiResponse(true, patients, "patients list","patient"))
    } catch (err) {
        const error = errorHendlar(err)
        res.json(new ApiResponse(false, error, "could not find","patient"))
    }

});
// router.get("/activePatients", async (req, res) => {
//     try {
//         const patients = await patient.findAll({
//             where: { activestatus: true },
//             include: ['address'],
//             attributes: { exclude: ['createdAt', 'updatedAt'] }
//         })
//         console.log(patients)
//         res.json(new ApiResponse(true, patients, "patients list"))
//     } catch (err) {
//         const error = errorHendlar(err)
//         res.json(new ApiResponse(false, error, "could not find"))
//     }

// });

router.delete("/delete/:id", async (req, res) => {
    try {
        var id = req.params.id
        var patients = await patient.findOne({ where: { id: id } })
        if (patients == null)
            res.json(new ApiResponse(false, null, "patient not found"))
        else
            patients.destroy()
        res.json(new ApiResponse(true, patients, "patient deleted !","patient"))
    } catch (err) {
        var error = errorHendlar(err)
        res.json(new ApiResponse(false, error, "patient cant be delete","patient"))
    }
});
router.put("/done/:id", async (req, res) => {
    try {
        const id = req.params.id
        var patients = await patient.findOne({
            where: { id: id },
            include: ['address'],
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        })
        if (patients == null)
            res.json(new ApiResponse(false, null, "patient not found"))
        else
            var activeStatus = false
        var data = await patients.update({ activeStatus })
        res.json(new ApiResponse(true, data, "patient detail update","patient"))
    } catch (err) {
        const error = errorHendlar(err)
        res.json(new ApiResponse(false, error, "patient cannot updated","patient"))
    }
});

router.put("/undo/:id", async (req, res) => {
    try {
        const id = req.params.id
        var patients = await patient.findOne({
            where: { id: id },
            include: ['address'],
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        })
        if (patients == null)
            res.json(new ApiResponse(false, null, "patient not found","patient"))
        else
            var activeStatus = true
        var data = await patients.update({ activeStatus })
        res.json(new ApiResponse(true, data, "patient detail update","patient"))
    } catch (err) {
        const error = errorHendlar(err)
        res.json(new ApiResponse(false, error, "patient cannot updated","patient"))
    }
});

router.get("/lists", async (req, res) => {

    try {
        const patients = await patient.findAll({
            where: {
                raddress: req.user
            },
            include: ['address'],
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        })
        console.log(patients)
        res.json(new ApiResponse(true, patients, "patients list","patient"))
    } catch (err) {
        const error = errorHendlar(err)
        res.json(new ApiResponse(false, error, "could not find","patient"))
    }

});

router.put("/update/:id", async (req, res) => {
    try {
        const name = req.body.name
        const appointmentdate = req.body.appointmentdate
        const phoneNumber = req.body.phoneNumber
        const id = req.params.id
        const patients = await patient.findOne({ where: { id } })
        if (patients == null)
            res.json(new ApiResponse(false, null, "patient not found" ,"patient"))
        else

            var data = await patients.update({ name, appointmentdate, phoneNumber })

        res.json(new ApiResponse(true, data, "patient details update !","patient"))
    } catch (err) {
        var error = errorHendlar(err)
        res.json(new ApiResponse(false, error, "patient cant be deleted" ,"patient"))
    }
});






module.exports = router