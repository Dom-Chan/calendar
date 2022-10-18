import mongoose from 'mongoose'

const eventSchema = mongoose.Schema({
    description: String,
    startDate: Date,
    endDate: Date,
    users: [String]
})

const eventModel = mongoose.model('eventModel', eventSchema)

export default eventModel