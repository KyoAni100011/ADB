import Cookies from "js-cookie";

// Define common expiration times in days
const EXPIRY_ACCESS_TOKEN = 1; // Access token expires in 1 day
const EXPIRY_REFRESH_TOKEN = 7; // Refresh token expires in 7 days

/**
 * Set a cookie with optional expiration and path.
 * @param {string} name - The name of the cookie.
 * @param {string} value - The value of the cookie.
 * @param {number} [expires] - Optional expiration time in days.
 * @param {string} [path] - Optional path for the cookie.
 */
export const setCookie = (
  name,
  value,
  expires = EXPIRY_ACCESS_TOKEN,
  path = "/"
) => {
  Cookies.set(name, value, { expires, path });
};

/**
 * Get the value of a cookie by name.
 * @param {string} name - The name of the cookie.
 * @returns {string | undefined} The value of the cookie or undefined if not found.
 */
export const getCookie = (name) => {
  return Cookies.get(name);
};

/**
 * Remove a cookie by name.
 * @param {string} name - The name of the cookie.
 */
export const removeCookie = (name) => {
  Cookies.remove(name);
};

// Export constants for use in other files
export { EXPIRY_ACCESS_TOKEN, EXPIRY_REFRESH_TOKEN };
