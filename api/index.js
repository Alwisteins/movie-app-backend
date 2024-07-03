const express = require("express");
const cors = require("cors");
const captureRoutes = require("../src/routes/capture.route");

const app = express();

//middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Selamat datang di server!",
  });
});

app.use("/api/v1/capture-moment", captureRoutes);

app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });

module.exports = app;
