import Request_detail from "../models/RequestDetail.js";
import RequestHistory from "../models/RequestHistory.js";
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

export const informationRequest = async (req, res) => {
  try {
    const { action, author_id } = req.body;
    if (action === "approved") {
      const newRequest = new RequestHistory({
        action,
        request_id: req.params.id,
        author_id,
      });
      await newRequest.save();
      res.json({
        success: true,
        message: "update success",
        request: newRequest,
      });
    } else if (action === "reject") {
      const newRequest = new RequestHistory({
        action,
        request_id: req.params.id,
        author_id,
      });
      await newRequest.save();
      res.json({
        success: true,
        message: "update success",
        request: newRequest,
      });
    } else if (action === "revert") {
      const newRequest = new RequestHistory({
        action,
        request_id: req.params.id,
        author_id,
      });
      await newRequest.save();
      res.json({
        success: true,
        message: "update success",
        request: newRequest,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Missing information !" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
