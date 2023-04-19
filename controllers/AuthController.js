import jwt from "jsonwebtoken";
import argon2 from "argon2";
import User from "../models/User.js";
import Permission from "../models/Permission.js";
import Role from "../models/Role.js";

export const checkUser = async (req, res) => {
  console.log(req.userId);
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
  const { email, password } = req.body;
  // Simple validation
  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing email or password" });
  try {
    // check existing user
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" });

    //username found
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" });

    // all good
    // return token
    const accessToken = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "12h" }
    );
    const refreshToken = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "2d" }
    );
    res.json({
      success: true,
      message: "User logged in successfully",
      accessToken,
      refreshToken,
      role: user.role_id,
      permissions: user.permission_id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const addRole = async (req, res) => {
  const { role_id } = req.body;
  try {
    const addRole = await User.findByIdAndUpdate(req.params.id, {
      role_id: role_id,
    });
    await addRole.save();
    res.json({
      success: true,
      message: "Done !",
      user: addRole,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const addPermission = async (req, res) => {
  const { permission_id } = req.body;
  try {
    const user = await User.findById(req.params.id);
    const condition = user.permission_id.includes(permission_id);
    console.log(condition);
    if (condition == false) {
      return res.status(400).json({ msg: "Permission already exists" });
    }
    const addPermission = user.permission_id.push(permission_id);
    await user.save();
    res.json({
      success: true,
      message: "Done !",
      permission: user.permission_id,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const loginGoogle = async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findOne(decoded.email );
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
      const password = "password";
      const hashedPassword = await argon2.hash(password);
      const newUser = new User({
        username: decoded.displayName,
        email: decoded.email,
        password: hashedPassword,
        avatar: decoded.photoURL,
        role: "null",
      });
      await newUser.save();
      // return token
      const accessToken = jwt.sign(
        { userId: newUser._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "2d" }
      );
      const refreshToken = jwt.sign(
        {
          userId: user._id,
          email: user.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "2d" }
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
