const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

connectDB();
const app = express();
dotenv.config();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is Running Successfully");
});

app.use("/api/user", userRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`server opened on port ${PORT}`.yellow.bold));
