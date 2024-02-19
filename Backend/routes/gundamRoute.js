import express from "express"
import { Gundam } from '../models/GundamModel.js'

const router = express.Router()

//Route to save a new Gundam
router.post('/', async (req, res) => {
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

// Route to get all Gundams
router.get('/', async (req, res) => {
    try{
        const gundams = await Gundam.find({})
        return res.status(200).json({
            count: gundams.length,
            data: gundams
        })
    } catch(error) {
        console.log(error.message)
        res.status(500).send({message: error.message })
    }
})

//Route to book by ID
router.get('/gundams/:id', async (req, res) => {
    try{

        const { id } = req.params

        const gundam = await Gundam.findById(id)
        return res.status(200).json(gundam)
    } catch(error) {
        console.log(error.message)
        res.status(500).send({message: error.message })
    }
})

//Route to update the gundam
router.put('/:id', async (req, res) => {
    try {
        // Check if all required fields are provided in the request body
        if (!req.body.title || !req.body.scale || !req.body.price) {
            return res.status(400).send({
                message: 'Send all required fields: title, scale, and price'
            });
        }

        // Extract the ID from the request parameters
        const { id } = req.params;

        // Find the Gundam object by ID and update its properties
        const updatedGundam = await Gundam.findByIdAndUpdate(id, {
            title: req.body.title,
            scale: req.body.scale,
            price: req.body.price
        }, { new: true });

        // Check if the Gundam object with the provided ID exists
        if (!updatedGundam) {
            return res.status(404).send({
                message: 'Gundam not found'
            });
        }

        // Send the updated Gundam object as the response
        return res.status(200).send(updatedGundam);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//Route for deleting a gundam
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const result = await Gundam.findByIdAndDelete(id) 

        if (!result) {
            return res.status(404).json({message: 'Gundam not found'})
        }

return res.status(200).send({message: 'Gundam deleted'})

    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
        
    }
})


export default router
