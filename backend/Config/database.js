import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config({
    path:'.env'
})

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
    } catch (error) {
        process.exit(1)
    }
}

export default connectDB;