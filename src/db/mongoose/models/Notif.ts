import mongoose, { Schema } from "mongoose";

const notifSchema = new Schema({
    barcode: {
        type: String,
        unique: true
    },
    name: String,
    stock: Number
})

export default mongoose.models.Notif || mongoose.model("Notif", notifSchema)