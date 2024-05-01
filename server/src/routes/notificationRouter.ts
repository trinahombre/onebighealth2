import express from "express";
import auth from "../middleware/auth";
import notificationController from "../controllers/notificationController";

const notificationRouter = express.Router();

notificationRouter.get(
  "/getallnotifs",
  auth,
  notificationController.getallnotifs
);

export default notificationRouter;