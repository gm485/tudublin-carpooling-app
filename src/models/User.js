import mongoose, { Mongoose } from 'mongoose'


const userSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true},
    phoneNumber: String,
    role: {
            type: String, 
            enum: ['driver', 'passenger', 'admin'], 
            default: 'passenger'},
    userImg: String,
    
}, {timestamps: true})

export default mongoose.models.User || mongoose.model('User', userSchema)