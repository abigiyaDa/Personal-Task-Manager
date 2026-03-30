import { createUser, findUserByEmail } from "../repositories/userRepository.js";
import { hashPassword, comparePassword } from "../utils/passwordHasher.js";
import { generateToken } from "../utils/token.js";
import { validateRegister, validateLogin } from "../validators/authValidator.js";

export const registerUser = async (data) => {
  validateRegister(data);

  const { fullName, email, password } = data;

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await hashPassword(password);
  await createUser(fullName, email, hashedPassword);

  return { message: "User registered successfully" };
};

export const loginUser = async (data) => {
  validateLogin(data);

  const { email, password } = data;

  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
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