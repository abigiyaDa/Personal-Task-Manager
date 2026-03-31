// request handlers for user registration and login, => Connects HTTP → service 
// interacts with authService to perform the necessary operations and sends appropriate responses back to the client

import { registerUser, loginUser } from "../services/authService.js";

export const register = async (req, res, next) => {
  // next is used forerror handling 
  try {
    const result = await registerUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const result = await loginUser(req.body);
    res.status(200).json(result);
    console.log(result);
  } catch (error) {
    next(error);
  }
};