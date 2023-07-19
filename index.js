const express = require("express");
const cors = require("cors");
const { userRouter } = require("./routes/User.routes");
const { connection } = require("./db");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());





app.get("/", (req, res) => {
  res.status(200).json("Welcome to HomePage");
});

app.use("/users", userRouter);


app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to Atlas Server...");
  } catch (error) {
    console.log(error.message);
  }
  console.log(`Server is running at port ${process.env.port}...`);
});