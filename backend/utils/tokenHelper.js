import jwt from "jsonwebtoken";

// Token expiration times
const ACCESS_TOKEN_EXPIRY = "15m"; // 15 minutes
const REFRESH_TOKEN_EXPIRY = "7d"; // 7 days

// Generate an access token
export const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
};

// Generate a refresh token
export const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });
};
