import mongoose from "mongoose";

// Connect to mongoDB
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/ShoppyGlobe', {
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

export default connectDB;
