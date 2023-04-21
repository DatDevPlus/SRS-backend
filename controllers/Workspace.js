import Workspace from "../models/Workspace";

export const Get_Workspace_Detail = async (req, res) => {
  try {
    const workspace = await Workspace.findById({
      _id: req.params.id,
    });
    if (!workspace) {
      res
        .status(404)
        .json({ success: false, message: "Workspace is not exist" });
    }
    if (workspace) res.json({ success: true, workspace });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const Get_All_Workspace = async (req, res) => {
  try {
    const workspace = await Workspace.find().sort([["createdAt", -1]]);
    res.json({ success: true, workspace });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const Create_Workspace = async (req, res) => {
//   try {
//     const { workspace_name, description,Manager_id } = req.body;
//     if (
//       !workspace_name ||
//       !description ||
   
//     )
//       return res
//         .status(400)
//         .json({ success: false, message: "Missing information" });
//     const newWorkspace = new Workspace({
//         workspace_name,
//         description
//     });
//     await newWorkspace.save();
//     res.json({
//       success: true,
//       message: "Create complete !",
//       category: newRequest,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
};
export const Update_Request = async (req, res) => {
  const {
    reason,
    quantity,
    start_date,
    end_date,
    user_id,
    date_off_time,
    date_off_type,
    status,
    approvers_number,
  } = req.body;
  if (
    !reason ||
    !quantity ||
    !start_date ||
    !end_date ||
    !user_id ||
    !date_off_time ||
    !date_off_type ||
    !status ||
    !approvers_number
  )
    return res
      .status(400)
      .json({ success: false, message: "Missing information" });
  try {
    let updateRequest = {
      reason,
      quantity,
      start_date,
      end_date,
      user_id,
      date_off_time,
      date_off_type,
      status,
      approvers_number,
    };
    const updateRequestCondition = { _id: req.params.id };
    updateRequest = await Request_detail.findByIdAndUpdate(
      updateRequestCondition,
      updateRequest,
      { new: true }
    );
    if (!updateRequest)
      return res.status(401).json({
        success: false,
        message: "Request not found",
      });

    res.json({
      success: true,
      message: "Excellent progress!",
      req: updateRequest,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const Delete_Request = async (req, res) => {
  try {
    const requestDeleteCondition = { _id: req.params.id };
    const deleteRequest = await Request_detail.findOneAndDelete(
      requestDeleteCondition
    );

    if (!deleteRequest)
      return res.status(401).json({
        success: false,
        message: "Request not found ",
      });
    res.json({ success: true, req: deleteRequest });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
