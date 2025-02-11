import mongoose from "mongoose";

// Create a schema for the cart items
const cartSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    shippingInformation: {
        type: String,
    },
    discountPercentage: {
        type: Number,
    },
    returnPolicy: {
        type: String,
    },
});

const cartItems = mongoose.model("cartItem", cartSchema);

export default cartItems;