import bcrypt from "bcrypt";

// Hash a password with a specified number of salt rounds
export const hashPassword = async (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};
