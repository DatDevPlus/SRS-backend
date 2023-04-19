import Group from "../models/Group.js";

export const get_All_Groups = async (req, res) => {
  try {
    const group = await Group.find().sort([["createdAt", -1]]);
    res.json({ success: true, group });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const get_Group = async (req, res) => {
  try {
    const group = await Group.find().sort([["createdAt", -1]]);
    res.json({ success: true, group });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const create_Group = async (req, res) => {
  try {
    const { name, description, masters_id, staffs_id } = req.body;
    const newGroup = new Group({
      name,
      description,
      masters_id,
      staffs_id,
    });
    await newGroup.save();
    res.json({
      success: true,
      message: "Create complete !",
      group: newGroup,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const update_Group = async (req, res) => {
  try {
    const { name, description, masters_id, staffs_id } = req.body;
    const newGroup = new Group({
      name,
      description,
      masters_id,
      staffs_id,
    });
    await newGroup.save();
    res.json({
      success: true,
      message: "Create complete !",
      group: newGroup,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const delete_Group = async (req, res) => {
  try {
    const { name, description, masters_id, staffs_id } = req.body;
    const newGroup = new Group({
      name,
      description,
      masters_id,
      staffs_id,
    });
    await newGroup.save();
    res.json({
      success: true,
      message: "Create complete !",
      group: newGroup,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
