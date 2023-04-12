import jwt from "jsonwebtoken";
import argon2 from "argon2";
import User from "../models/User.js";
export const checkUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const register = async (req, res) => {
  const { username, password, email, role } = req.body;
  // Simple validation
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing information" });
  try {
    // Check for existing user
    const user = await User.findOne({ username });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "Username already taken" });
    // All good
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });
    // Return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "2h" }
    );
    //save
    await newUser.save();
    res.json({
      msg: "Register Success!",
      success: true,
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const login = async (req, res) => {
  const { username, password } = req.body;

  // Simple validation
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing username and/or password" });

  try {
    // check existing user
    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password" });

    //username found
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password" });

    // all good
    // return token
    console.log(user);
    const accessToken = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    res.json({
      success: true,
      message: "User logged in successfully",
      accessToken,
    });
  } catch (err) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const loginGoogle = async (req, res) => {
  try {
    const { name, avatar, email } = req.body.body;
    const user = await User.findOne({ email });
    if (user) {
      const accessToken = jwt.sign(
        {
          userId: user._id,
          username: user.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      return res
        .status(200)
        .json({ success: true, message: "User has exist", accessToken });
    } else {
      const password = "password123";
      const hashedPassword = await argon2.hash(password);
      const newUser = new User({
        username: name,
        email: email,
        password: hashedPassword,
        avatar: avatar,
        role: "user",
      });
      await newUser.save();
      // return token
      const accessToken = jwt.sign(
        { userId: newUser._id },
        process.env.ACCESS_TOKEN_SECRET
      );

      res.json({
        success: true,
        message: "User created successfully",
        accessToken,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
