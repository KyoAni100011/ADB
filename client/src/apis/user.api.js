import axiosInstance from "./axiosInstance";

/**
 * Register a new student.
 * @param {Object} data - Student data.
 * @returns {Promise<Object>} The response data from the API.
 * @throws {Error} If the API request fails.
 */
export const registerStudent = async (data) => {
  try {
    const response = await axiosInstance.post("user/join/signup", data);
    return response.data;
  } catch (error) {
    console.error("Failed to register student:", error);
    throw error;
  }
};

/**
 * Log in a user.
 * @param {Object} data - Login data.
 * @returns {Promise<Object>} The response data from the API.
 * @throws {Error} If the API request fails.
 */
export const loginUser = async (data) => {
  try {
    const response = await axiosInstance.post("user/join/login", data);
    return response.data;
  } catch (error) {
    console.error("Failed to log in user:", error);
    throw error;
  }
};
