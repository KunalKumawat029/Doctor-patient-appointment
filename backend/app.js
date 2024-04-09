const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const jwt = require('./config/Tokenmanage')
const apiRouter = require('./routers/apiRouter')
const authRouter = require('./routers/authRouter')

dotenv.config()

const server = express()

server.use(express.json())
server.use(cors())
server.use("/api", async (req, res, next) => {
    const result = await jwt.authenticateToken(req)
    if (result.status)
        next()
    else
        res.json(result)

});



server.use("/api", apiRouter)
server.use("/auth", authRouter)
// server.use("/patient", patientRouter)


const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log(`http://localhost:8082, ${PORT}`)
})
