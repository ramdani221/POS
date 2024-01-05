import mongoose, { Schema } from "mongoose";

const notifSchema = new Schema({
    barcode: String,
    name: String,
    stock: Number,
    isRead: {
        type: Boolean,
        default: false
    },
}, {timestamps: true})

export default mongoose.models.Notif || mongoose.model("Notif", notifSchema)