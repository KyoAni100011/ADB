import { Router } from "express";
import { loginUser, registerStudent } from "../controllers/user.controllers.js";

const routerUser = Router();

routerUser.post("/teaching");
routerUser.post("/join/signup", registerStudent);
routerUser.post("/join/login", loginUser);

export default routerUser;
