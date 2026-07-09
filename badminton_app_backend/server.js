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

//Age
const ageGroupRoutes = require("./routes/ageGroupRoutes");
app.use("/api/agegroups", ageGroupRoutes);

//Student
const studentRoutes = require("./routes/studentRoutes");
app.use("/api/students", studentRoutes);

//Session
const sessionRoutes = require("./routes/sessionRoutes");
app.use("/api/sessions", sessionRoutes);

//Attendance
const attendanceRoutes = require("./routes/attendanceRoutes");
app.use("/api/attendance", attendanceRoutes);

//Payment
const paymentRoutes = require("./routes/paymentRoutes");
app.use("/api/payments", paymentRoutes);


const managementTeamRoutes = require("./routes/managementTeamRoutes");
console.log("Management Team Routes Loaded");
app.use("/api/management-team", managementTeamRoutes);