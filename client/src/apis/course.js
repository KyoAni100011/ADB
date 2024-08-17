import axiosInstance from "./axiosInstance";

/**
 * Handle API requests.
 * @param {Promise} request - The axios request promise.
 * @returns {Promise<Object>} The response data from the API.
 * @throws {Error} If the API request fails.
 */
const handleRequest = async (request) => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

/**
 * Get all courses.
 * @returns {Promise<Object>} The response data from the API.
 * @throws {Error} If the API request fails.
 */
export const getAllCourses = async () => {
  return handleRequest(axiosInstance.get("course"));
};

/**
 * Get a course by ID.
 * @param {string} id - The course ID.
 * @returns {Promise<Object>} The response data from the API.
 * @throws {Error} If the API request fails.
 */
export const getCourseById = async (id) => {
  return handleRequest(axiosInstance.get(`course/${id}`));
};

/**
 * Add a course to the cart.
 * @param {string} cartId - The cart ID.
 * @param {string} courseId - The course ID.
 * @returns {Promise<Object>} The response data from the API.
 * @throws {Error} If the API request fails.
 */
export const addCartItem = async (cartId, courseId) => {
  return handleRequest(
    axiosInstance.post("course/add_to_cart", {
      CartId: cartId,
      CourseId: courseId,
    })
  );
};
