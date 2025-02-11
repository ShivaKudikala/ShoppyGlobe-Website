import mongoose from "mongoose";

// Create a schema for the product items
const productSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    reviews: {
        type: Array,
    },
    warrantyInformation: {
        type: String,
    },
    shippingInformation: {
        type: String,
    },
    availabilityStatus: {
        type: String,
    },
    returnPolicy: {
        type: String,
    },
    discountPercentage: {
        type: String,
    },

});

const Product = mongoose.model("product", productSchema);

export default Product;