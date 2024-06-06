import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import deliveryZoneRouter from "./routes/deliveryZoneRoute.js";

// app config
// initilize app use express
const app = express();
//define the port number
const port = 4000;

// middleware
// initilize middleware
app.use(express.json());
app.use(cors());

// add db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/deliveryZone", deliveryZoneRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});
app.listen(port, () => {
  console.log("Server Started on http://localhost:${port}");
});

//mongodb+srv://food:65789282@cluster0.6ijkpwn.mongodb.net/?
