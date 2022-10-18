import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    user: String
})

const userModel = mongoose.model('userModel', userSchema)

export default userModel