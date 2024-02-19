import mongoose from 'mongoose'

const gundamSchema = mongoose.Schema(
    {
     title: {
        type: String,
        required: true,
     },
     scale: {
        type: Number,
        required: true,
     },
     price: {
        type: Number,
        required: true,
     }   
    },
    {
        timestamps: true,
    }
)


export const Gundam = mongoose.model('Gundam', gundamSchema)