import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";

const app = express();

dotenv.config();

// mongoDB connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("MongoDB connected"); // Log a message when connected
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};


app.use(express.json())

//middlewares
app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)


mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// Call the connect function to initiate the connection
connect();

app.listen(1500, () => {
  console.log("Connected to backend");
});
