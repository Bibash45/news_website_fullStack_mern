import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });

  // Check if user exists and password matches
  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET
    );
    res.cookie("jwt", token, { expire: Date.now() + 99999 });

    // Respond with user details
    res.status(200).json({
      token: token,
      userInfo: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

export const getUser = asyncHandler(async (req, res) => {
  const user = await User.find();
  res.status(200).json(user);
});

export const logOut = asyncHandler(async (req, res) => {
  res.clearCookie("jwt");
  res.json({
    message: "signout success",
  });
});
