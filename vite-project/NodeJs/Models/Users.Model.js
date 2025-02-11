
import mongoose from "mongoose";

// Create a schema for the user items
const user = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const Users = mongoose.model("user", user);

export default Users;