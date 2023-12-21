import express from "express";
import dotenv from "dotenv";
import studentRoutes from "./routes/studentRoute.js";
import connectDB from "./config/db.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/students", studentRoutes);

app.get("/", (req, res) => res.send("Server is Ready"));

app.use(errorMiddleware);

app.listen(port, () => console.log(`Server started on port: ${port}`));
