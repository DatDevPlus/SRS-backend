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
    const group = await Group.findById(req.params.id);
    res.status(200).json(group);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const create_Group = async (req, res) => {
  try {
    const { name, description, masters_id, staffs_id } = req.body;
    console.log(req.body);
    const newGroup = new Group({
      name,
      description,
      masters_id: [masters_id],
      staffs_id: [staffs_id],
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
export const addID = async (req, res) => {
  try {
    const { masters_id, staffs_id } = req.body;
    const group = await Group.findById(req.params.id);
    //   const existingMasterId = Array.from(group.masters_id).some((id) =>
    //   id.equals(masters_id)
    // );
    // const existingStaffId = Array.from(group.staffs_id).some((id) =>
    //   id.equals(staffs_id)
    // );

    // if (existingMasterId || existingStaffId) {
    //   return res.status(400).json({ msg: "ID already exists" });
    // }

    group.masters_id.push(masters_id);
    group.staffs_id.push(staffs_id);
    console.log("hi");
    await group.save();
    res.json({
      success: true,
      message: "Done !",
      permission: group,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const update_Group = async (req, res) => {
  try {
    const { name, description } = req.body;
    // Simple validation
    if (!name)
      return res
        .status(400)
        .json({ success: false, message: "Missing information !" });

    let updateGroup = {
      name,
      description,
    };
    const updateGroupCondition = { _id: req.params.id };
    updateGroup = await Group.findByIdAndUpdate(
      updateGroupCondition,
      updateGroup,
      { new: true }
    );
    if (!updateGroup)
      return res.status(401).json({
        success: false,
        message: "Group not found",
      });

    res.json({
      success: true,
      message: "Excellent progress!",
      Group: updateGroup,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const delete_Group = async (req, res) => {
  try {
    const groupDeleteCondition = { _id: req.params.id };
    const deleteGroup = await Group.findOneAndDelete(groupDeleteCondition);
    if (!deleteGroup)
      return res.status(401).json({
        success: false,
        message: "Group not found ",
      });
    res.json({ success: true, group: deleteGroup });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
