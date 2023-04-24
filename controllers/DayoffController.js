
import Request_detail from "../models/RequestDetail.js";

export const Get_All_DayOff = async (req, res) => {
  try {
    const request = await Request_detail.find({ status: "approved" }).sort([
      ["status"],
    ]);
    console.log(request);
    res.json({ success: true, request });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const revertDayOff = async (req, res) => {
  try {
    const { reason } = req.body;
    // Simple validation
    if (!reason)
      return res
        .status(400)
        .json({ success: false, message: "Missing information !" });

    let revert = {
      reason,
      status: "pending",
    };
    const revertCondition = { _id: req.params.id };
    revert = await Request_detail.findByIdAndUpdate(revertCondition, revert, {
      new: true,
    });
    if (!revert)
      return res.status(401).json({
        success: false,
        message: "Group not found",
      });
    res.json({
      success: true,
      message: "Excellent progress!",
      revert: revert,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
