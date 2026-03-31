// business logic - handles validation, password hashing, and token generation for user registration and login

import { createUser, findUserByEmail } from "../repositories/userRepository.js";
import { hashPassword, comparePassword } from "../utils/passwordHasher.js";
import { generateToken } from "../utils/token.js";
import { validateRegister, validateLogin } from "../validators/authValidator.js";

export const registerUser = async (data) => {
  validateRegister(data);

  const { fullName, email, password } = data;

  const existingUser = await findUserByEmail(email);
  // Check if user with the same email already exists
  if (existingUser) {
    throw new Error("Email already exists");
  }
  // Hash the password before storing it in the database for security reasons 
  const hashedPassword = await hashPassword(password);
  await createUser(fullName, email, hashedPassword);

  return { message: "User registered successfully" };
};

export const loginUser = async (data) => {
  validateLogin(data);

  const { email, password } = data;

  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid email");
  }
  // Compare the provided password with the hashed password stored in the database using bcrypt's compare function
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }

  const token = generateToken(user);

  return {
    message: "Login successful",
    token,
    user: {
      id: user.user_id,
      name: user.name,
      email: user.email,
    },
  };
};