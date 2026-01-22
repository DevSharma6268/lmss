import mongoose from "mongoose";
import dns from 'dns';

const connectDB = async () => {
  try {
    dns.setServers(['8.8.8.8']);
    await mongoose.connect(process.env.MONGO_URI, {
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      },
      family: 4,
    });
    console.log("You successfully connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    setTimeout(() => process.exit(1), 1000);
  }
};

export default connectDB;