import path from "path";
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

app.use("/api/students", studentRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(errorMiddleware);

app.listen(port, () => console.log(`Server started on port: ${port}`));
