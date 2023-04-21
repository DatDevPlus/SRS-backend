import Request_detail from "../models/RequestDetail.js";
export const Get_Request_Detail = async (req, res) => {
  try {
    const request = await Request_detail.findById({
      _id: req.params.id,
    });
    if (!request) {
      res.status(404).json({ success: false, message: "Request is not exist" });
    }
    if (request) res.json({ success: true, request });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const Get_All_Request = async (req, res) => {
  try {
    const request = await Request_detail.find().sort([["createdAt", -1]]);
    res.json({ success: true, request });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const Create_Request = async (req, res) => {
  try {
    const {
      reason,
      quantity,
      start_date,
      end_date,
      user_id,
      day_off_type,
      day_off_time,
      status,
      approvers_number,
    } = req.body;
    if (
      !reason ||
      !quantity ||
      !start_date ||
      !end_date ||
      !user_id ||
      !day_off_type ||
      !day_off_time ||
      !status ||
      !approvers_number
    )
      return res
        .status(400)
        .json({ success: false, message: "Missing information" });
    const newRequest = new Request_detail({
      reason,
      quantity,
      start_date,
      end_date,
      user_id: req.userId,
      day_off_type,
      day_off_time,
      status,
      approvers_number,
    });
    await newRequest.save();
    res.json({
      success: true,
      message: "Create complete !",
      category: newRequest,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
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
      user_id:req.userId,
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
