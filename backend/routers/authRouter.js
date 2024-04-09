const express = require('express');
const ApiResponse = require('./apiResponse/apiResponse');
const { Doctor, errorHendlar, reception1 } = require('../models')
const jwt = require('../config/Tokenmanage');
const router = express.Router()

router.post("/doctor/save", async (req, res) => {
    // console.log("body", req.body.phone);
    try {
        const user = await Doctor.create({
            "name": req.body.name,
            "phoneNumber": req.body.phoneNumber,
            "email": req.body.email,
            "password": req.body.password

        })
        res.json(new ApiResponse(true, user, "ragister successfully"))
    } catch (err) {
        // console.log(err.errors)
        const error = errorHendlar(err)
        res.json(new ApiResponse(false, error, "User Saved Failed !"))
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    const reception = await reception1.findOne({ where: { email, password } })
    const doctor = await Doctor.findOne({ where: { email, password } })
    // console.log("hell",doctor)
    // console.log("dall",reception);
    try {
        if (doctor == null && reception == null)
            res.json(new ApiResponse(false, null, "user not found"))
        else {
            if (doctor !== null) {
                const token = jwt.generateAccessToken(doctor.id)
                // console.log(token)
                res.json(new ApiResponse(true, doctor, token,"doctor"))
            } else {
                if (reception !== null) {
                    const token = jwt.generateAccessToken(reception.id)
                    res.json(new ApiResponse(true, reception, token, "reception"))
                }
            }
        }

    } catch (err) {
        const error = errorHendlar(err)
        res.json(new ApiResponse(false, error, "invalid email"))
    }
});



// router.post("/reception/login", async (req,res)=>{
//     try {
//         const {email , password} =  req.body
//         const reception =  await reception1.findOne({where : {email,password }})
//     if(reception==null)
//         res.json(new ApiResponse(false,null,"reception not found"))
//     else{
//         const token = jwt.generateAccessToken(reception.id)
//         res.json(new ApiResponse(true , reception.name,token,"login success"))
//     }

//     } catch (err) {
//        const error = errorHendlar(err)
//        res.json(new ApiResponse(false,error,"invalid email")) 
//     }
//     });





module.exports = router