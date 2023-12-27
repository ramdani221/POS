import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/posdb")
    } catch (error) {
        throw error
    }
}

export default connectDB