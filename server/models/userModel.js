import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    username: String,
    name: String,
    events:[String]
    
})

const userModel = mongoose.model('userModel', userSchema)

export default userModel