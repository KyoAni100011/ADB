import { hashPassword } from "../utils/hashPasswords.js";
import { callStoredProcedure } from "../utils/databaseHelper.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/tokenHelper.js";
import bcrypt from "bcrypt";

// Create tokens for the user
const createUserToken = (username, id) => {
  const payload = { username, id };
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
};

// Handle the result of a stored procedure
const handleProcedureResult = (result, res) => {
  if (result.length === 0) {
    return res
      .status(500)
      .json({ message: "No results returned from stored procedure" });
  }
  console.log(result);
  const { Message, UserData } = result[0];
  if (!Message) {
    return res
      .status(500)
      .json({ message: "Unexpected result format from stored procedure" });
  }

  if (!UserData) {
    return res.status(500).json({ message: "User data not found in result" });
  }

  const userData = JSON.parse(UserData);
  const { accessToken, refreshToken } = createUserToken(
    userData.UserName,
    userData.UserId
  );

  return res.status(200).json({
    message: Message,
    user: {
      UserId: userData.UserId,
      UserName: userData.UserName,
      CartId: userData.CartData.CartId,
    },
    accessToken,
    refreshToken,
  });
};

// Register a user using a stored procedure
const registerUser = async (req, res, procedureName) => {
  try {
    const { Password, ...otherData } = req.body;
    const hashedPassword = await hashPassword(Password);

    const result = await callStoredProcedure(procedureName, {
      ...otherData,
      Password: hashedPassword,
    });

    handleProcedureResult(result, res);
  } catch (error) {
    console.error("Error in registerUser:", error.message);
    return res
      .status(500)
      .json({ message: `Error registering user: ${error.message}` });
  }
};

// Handle registration of students
export const registerStudent = (req, res) => {
  registerUser(req, res, "RegisterStudent");
};

// Handle registration of lecturers
export const registerLecture = (req, res) => {
  registerUser(req, res, "RegisterLecture");
};

// Log in a user
export const loginUser = async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const result = await callStoredProcedure("LoginUser", { Email });
    if (result.length === 0) {
      return res
        .status(500)
        .json({ message: "No results returned from stored procedure" });
    }

    const { Message, UserData } = result[0];
    if (!UserData) {
      return res.status(401).json({ message: Message || "Login failed" });
    }

    const userData = JSON.parse(UserData);
    const isPasswordValid = await bcrypt.compare(Password, userData.Password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const { accessToken, refreshToken } = createUserToken(
      userData.UserName,
      userData.UserId
    );

    return res.status(200).json({
      message: "Login successful",
      user: {
        UserId: userData.UserId,
        UserName: userData.UserName,
        CartId: userData.CartId,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Error in loginUser:", error.message);
    return res
      .status(500)
      .json({ message: `Error logging in user: ${error.message}` });
  }
};
