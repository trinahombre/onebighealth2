import express from "express";
import doctorController from "../controllers/doctorController";
import auth from "../middleware/auth";

const doctorRouter = express.Router();

doctorRouter.get("/getalldoctors", doctorController.getalldoctors);

doctorRouter.get("/getnotdoctors", auth, doctorController.getnotdoctors);

doctorRouter.post("/applyfordoctor", auth, doctorController.applyfordoctor);

doctorRouter.put("/deletedoctor", auth, doctorController.deletedoctor);

doctorRouter.put("/acceptdoctor", auth, doctorController.acceptdoctor);

doctorRouter.put("/rejectdoctor", auth, doctorController.rejectdoctor);

export default doctorRouter;