import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose'
import { Gundam } from './models/GundamModel.js'
import gundamRoute from './routes/gundamRoute.js'
import cors from 'cors'

const app = express()

//Middleware for parsing req body
app.use(express.json( ))

app.use(cors())



app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send('Welcome to my webstore')
})

app.use('/gundams', gundamRoute)

mongoose
.connect(mongoDBURL)
.then(() => {
    console.log('connected to database')
    app.listen(PORT, () => {
        console.log(`App is listenting on port: ${PORT}`)
    })
})
.catch((error) => {
    console.log(error)
})