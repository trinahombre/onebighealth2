import express from "express";
import auth from "../middleware/auth";
import appointmentController from "../controllers/appointmentController";

const appointRouter = express.Router();

appointRouter.get(
  "/getallappointments",
  auth,
  appointmentController.getallappointments
);

appointRouter.post(
  "/bookappointment",
  auth,
  appointmentController.bookappointment
);

appointRouter.post(
  "/resched",
  auth,
  appointmentController.resched
);

appointRouter.put("/completed", auth, appointmentController.completed);
appointRouter.put("/deleted", auth, appointmentController.deleteAppointment);
 
export default appointRouter;