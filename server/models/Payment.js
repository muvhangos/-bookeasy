const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking"
    },

    customerName: String,

    customerEmail: String,

    amount: Number,

    paymentStatus: {
        type: String,
        enum: [
            "pending",
            "paid",
            "failed"
        ],
        default: "pending"
    },

    refundable: {
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model(
    "Payment",
    paymentSchema
);