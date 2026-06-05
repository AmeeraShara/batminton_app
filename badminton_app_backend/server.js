require("./config/db");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));

app.get("/", (req, res) => {
  res.send("Backend Working");
});

app.listen(5000, () => {
  console.log("Server Running on Port 5000");
});

const ageGroupRoutes = require("./routes/ageGroupRoutes");

app.use("/api/agegroups", ageGroupRoutes);
