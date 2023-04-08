import express, { Router } from "express"
import { addLecture, createCourses, deleteCourse, deleteLecture, getAllCourses, getCourseLecture } from "../controllers/courseController.js";
import singleUpload from "../middlewares/multer.js";
import { authorizeAdmin, isAuthenticated, authorizeSubscribers } from "../middlewares/auth.js";


const router = express.Router();

// Get All courses without lectures
router.route("/courses").get(getAllCourses);

// create new course - only admin
router.route("/createcourses").post(isAuthenticated, authorizeAdmin, singleUpload, createCourses);

// Add lecture, Delete Course, Get Course Details
router.route("/course/:id").get(isAuthenticated, authorizeSubscribers, getCourseLecture).post(isAuthenticated, authorizeAdmin, singleUpload, addLecture).delete(isAuthenticated, authorizeAdmin, deleteCourse);

// Delete Lecture
router.route("/lecture").delete(isAuthenticated, authorizeAdmin, deleteLecture);

export default router;