import User from "../models/User.js";
import argon2 from "argon2";
export const createUser = async (req, res, next) => {
  try {
    const { username, password, email, role_id, permission_id } = req.body;
    // Simple validation
    if (!username || !password)
      return res
        .status(400)
        .json({ success: false, message: "Missing information" });
    try {
      // Check for existing user
      const user = await User.findOne({ email });
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
        role_id,
      });
      //save
      const permission_ids = user.permission_id.map((permission_id) =>
        permission_id._id.toString()
      );
      const condition = permission_ids.includes(permission_id.toString());
      if (condition) {
        return res.status(400).json({ msg: "Permission already exists" });
      }
      const addPermission = user.permission_id.push(permission_id);
      await newUser.save();
      await user.save();
      res.json({
        msg: "create Success!",
        addPermission,
        newUser,
        user,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};
export const editAccountUser = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    let updateAccount = {
      username,
      email,
    };
    const updateAccountCondition = { _id: req.userId };
    updateAccount = await User.findByIdAndUpdate(
      updateAccountCondition,
      updateAccount,
      { new: true }
    );
    if (!updateAccount)
      return res.status(401).json({
        success: false,
        message: "Group not found",
      });

    res.json({
      success: true,
      message: "Excellent progress!",
      user: updateAccount,
    });
  } catch (err) {
    next(err);
  }
};
export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
