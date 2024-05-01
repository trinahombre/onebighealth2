import express from "express";
import cors from "cors";
require("dotenv").config();
require("./db/conn");
import userRouter from "./routes/userRoutes";
import doctorRouter from "./routes/doctorRoutes";
import appointRouter from "./routes/appointRoutes";
import path from "path";
import notificationRouter from "./routes/notificationRouter";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/appointment", appointRouter);
app.use("/api/notification", notificationRouter);
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(2022, () =>
  console.log(`
  🚀 🏹 🙋   💚💚💚💚
  Server ready!! \n\n`),
)