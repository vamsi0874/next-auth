"use server"
import mongoose from "mongoose";

const connection: { isConnected?: number } = {};
const mongoUrl = process.env.MONGODB_URI || "";

export const connectToDb = async () => {
   
    try {
        console.log('mongodbbb')
        if (connection.isConnected) {
            console.log("existing connection");
            return;
        }
        const db = await mongoose.connect(mongoUrl);
        connection.isConnected = db.connections[0].readyState;
        console.log("New connection established");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
};
