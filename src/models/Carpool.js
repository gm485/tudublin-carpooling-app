import mongoose from "mongoose";


const CarpoolSchema = new mongoose.Schema({
    origin: String,
    originLat: Number,
    originLng: Number,

    destination: String,
    destinationLat: Number,
    destinationLng: Number,
    date: {type: Date, required: true},
    seatsAvailable: Number  || 1,

    driver: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    passengers: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}

}, {timestamps: true})

export default mongoose.models.Carpool || mongoose.model('Carpool', CarpoolSchema);