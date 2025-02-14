import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import newsRoutes from "./routes/newsRoutes.js";
import userRoute from "./routes/userRoute.js";

// port
const port = process.env.PORT;

connectDB();

const app = express();
// morgan
app.use(morgan("dev"));

// cors
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Cookie parser middleware
app.use(cookieParser());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// morgan
app.use(morgan("dev"));

// routes
app.use("/api/user", userRoute);
app.use("/api/news", newsRoutes);

const __dirname = path.resolve(); // set __dirname to current directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// FOR PRODUCTION
if (process.env.NODE_ENV == "production") {
  //set static folder
  app.use(express.static(path.join(__dirname, "/client/build")));

  // any route that is not api will be redirected to index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

// middleware for error handling
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
