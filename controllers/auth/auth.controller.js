import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Models
import { User } from "../../models/user.model.js";

export const signUp = async (request, response) => {
  const { userName, email, password } = request.body;

  try {
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    response.status(200).json({ message: "sign up succesful" });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "an error occured" });
  }
};

export const login = async (request, response) => {
  try {
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "an error occured" });
  }
};
