import express from "express";
import auth from "../middleware/auth";
import userController from "../controllers/userController";
const userRouter = express.Router();

userRouter.get("/getuser/:id", auth, userController.getuser);

userRouter.get("/getallusers", auth, userController.getallusers);

userRouter.post("/login", userController.login);

userRouter.post("/register", userController.register);

userRouter.put("/updateprofile", auth, userController.updateprofile);


userRouter.delete("/deleteuser", auth, userController.deleteuser);

export default userRouter;