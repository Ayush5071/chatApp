// Inside ConnectToMongoDb.js
import mongoose from "mongoose";
export const ConnectToDb = async () => {
    console.log("MONGO_URI:", process.env.MONGO_URI);
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error("MONGO_URI is not defined in the environment variables.");
        }
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("connected to mongodb");
    } catch (error) {
        console.log("error connecting to mongoDb", error.message);
    }
};
