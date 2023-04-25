import User from "../models/User.js";
import argon2 from "argon2";
export const createUser = async (req, res, next) => {
  try {
    const hashedPassword = await argon2.hash(req.body.password);
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });

    await newUser.save();
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

export const getUsersWithStaffRole = async (req, res) => {
  try {
    const users = await User.find();
    //const staffs = users.filter((user) => user.role_id?.role_name.toUpperCase() === 'STAFF');
    //const staffs_info = staffs.map(({_id, username}) => ({_id, name: username}));
    const staffs_info = users.map(({_id, username}) => ({_id, name: username}));
    res.status(200).json(staffs_info);
  } catch (err) {
    console.log(err);
  }
}
