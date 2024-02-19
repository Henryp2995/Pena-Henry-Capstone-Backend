import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose'
import { Gundam } from './models/GundamModel.js'

const app = express()

//Middleware for parsing req body
app.use(express.json( ))

app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send('Welcome to my webstore')
})

//Route to save a new Gundam
app.post('/gundams', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.scale ||
            !req.body.price
            ) {
                return res.status(400).send({
                    message: 'Send all required fields: title, scale and price'
                })
            }
            const newGundam = {
                title: req.body.title,
                scale: req.body.scale,
                price: req.body.price
            }

            const gundam = await Gundam.create(newGundam)

            return res.status(201).send(gundam)
    } catch (error) {
      console.log(error.message)
      res.status(500).send({message: error.message})
    }
})

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