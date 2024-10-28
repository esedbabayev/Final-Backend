import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Models
import { User } from "../../models/user.model.js";

export const signUp = async (request, response) => {
  const { userName, email, password } = request.body;

  try {
    const checkExistingUser = await User.findOne({ email });

    if (checkExistingUser) {
      return response.json({
        success: false,
        message:
          "Email is already in use. Please use a different email address.",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    response
      .status(200)
      .json({ success: true, message: "Account created successfully" });
  } catch (error) {
    console.log(error);
    response.status(500).json({ success: false, message: "An error occured" });
  }
};

export const login = async (request, response) => {
  const { email, password } = request.body;

  try {
    const checkExistingUser = await User.findOne({ email });

    if (!checkExistingUser)
      return response.json({
        success: false,
        message: "Wrong email or password",
      });

    const isCorrectPassword = await bcrypt.compare(
      password,
      checkExistingUser.password
    );

    if (!isCorrectPassword)
      return response.json({
        success: false,
        message: "Wrong email or password",
      });

    const token = jwt.sign(
      {
        id: checkExistingUser._id,
        role: checkExistingUser.role,
        email: checkExistingUser.email,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    response.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        id: checkExistingUser._id,
        role: checkExistingUser.role,
        email: checkExistingUser.email,
      },
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ success: false, message: "An error occured" });
  }
};
