const express = require('express')
const patientRouter = require('../routers/patientRouter')
const doctorRouter = require("../routers/doctorRouter")
const receptionRouter = require("../routers/receptionRouter")
const router = express.Router()


router.use("/doctor", doctorRouter)
router.use("/reception", receptionRouter)
router.use("/patient", patientRouter)


module.exports = router;
