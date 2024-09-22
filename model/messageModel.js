const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    campaign: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "campaign",
        required: true,
    },
    donation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "donation",
        
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "npo",
        
    },
    Nporeceiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "npo",
        
    },
    Individualreceiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "individual",
        
    },
    message: {
        type: String, required: true,
        trim: true, max: 500
    },

}, { timestamps: true })
const messageModel = mongoose.model("message", messageSchema)
module.exports = messageModel