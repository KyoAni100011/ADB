import { callStoredProcedure } from "../utils/databaseHelper.js";

// Get all courses
const getAllCourse = async (req, res) => {
  try {
    const result = await callStoredProcedure("GetAllCourses");
    res.status(200).json({ courses: result });
  } catch (error) {
    console.error("Error in getAllCourse:", error.message);
    res.status(500).json({
      message: "Error getting all courses",
      error: error.message || "Unknown error",
    });
  }
};

// Get course by ID
const getAllCourseId = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Course ID is required" });
  }

  try {
    const result = await callStoredProcedure("GetCourseById", { CourseId: id });

    if (!result || result.length === 0) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ course: result[0] });
  } catch (error) {
    console.error("Error in getAllCourseId:", error.message);
    res.status(500).json({
      message: "Error getting course by ID",
      error: error.message || "Unknown error",
    });
  }
};

// Add item to cart
const addCartItem = async (req, res) => {
  const { CartId, CourseId } = req.body;

  if (!CartId || !CourseId) {
    return res
      .status(400)
      .json({ message: "CartId and CourseId are required" });
  }

  try {
    const result = await callStoredProcedure("AddCartItem", {
      CartId,
      CourseId,
    });

    const message = result[0]?.Message || "Cart item added successfully";
    res.status(200).json({ message });
  } catch (error) {
    console.error("Error in addCartItem:", error.message);
    res.status(500).json({
      message: "Error adding cart item",
      error: error.message || "Unknown error",
    });
  }
};

export { getAllCourse, getAllCourseId, addCartItem };
