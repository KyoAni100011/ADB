import { Router } from "express";
import {
  addCartItem,
  getAllCourse,
  getAllCourseId,
} from "../controllers/course.controllers.js";

const routerCourse = Router();

routerCourse.get("/", getAllCourse);
routerCourse.get("/:id", getAllCourseId);
routerCourse.post("/add_to_cart", addCartItem);

export default routerCourse;
