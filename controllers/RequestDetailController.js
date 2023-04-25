import Request_detail from "../models/RequestDetail.js";
import RequestHistory from "../models//RequestHistory.js";
import jwt from "jsonwebtoken";
import moment from "moment";

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
      !day_off_type ||
      !day_off_time ||
      !status ||
      !approvers_number
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing information" });
    }
    const authHeader = req.header("Authorization");
    const accessToken = authHeader && authHeader.split(" ")[1];
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const user_id = decoded.userId;
    const newRequest = new Request_detail({
      reason,
      quantity,
      start_date,
      end_date,
      user_id,
      day_off_type,
      day_off_time,
      status,
      approvers_number,
    });
    await newRequest.save();

    //Add to history
    const newRequestHistory = new RequestHistory({
      request_id: newRequest._id,
      action: 'create', //create, update, approve, reject
      author_id: user_id,
    });
    await newRequestHistory.save();

    res.json({
      success: true,
      message: "Create day off request successfully!",
      request: newRequest,
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
    !date_off_time ||
    !date_off_type ||
    !status ||
    !approvers_number
  )
    return res
      .status(400)
      .json({ success: false, message: "Missing information" });
  try {
    const authHeader = req.header("Authorization");
    const accessToken = authHeader && authHeader.split(" ")[1];
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const user_id = decoded.userId;
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

      //Add to history
    const newRequestHistory = new RequestHistory({
      request_id: req.params.id,
      action: 'update', //create, update, approve, reject
      author_id: user_id,
    });
    await newRequestHistory.save();

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

export const countRequestsByStatus = async (req, res) => {
  try {
    const requests = await Request_detail.find();
    const requests_count = requests.reduce((acc, request) => {
      if (acc[request.status]) acc[request.status]++;
      else acc[request.status] = 1;
      return acc;
    }, {});
    const result = Object.keys(requests_count).map((status) => ({
      status,
      count: requests_count[status],
    }));
    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const countRequestsByMonth = async (req, res) => {
  try {
    const requests = await Request_detail.find();
    const requests_count = requests.reduce((acc, request) => {
      let month = request.start_date.substring(0, 2);
      if (acc[month]) acc[month]++;
      else acc[month] = 1;
      return acc;
    }, {});

    const arrRequestsWithSpecifiedMonth = Object.keys(requests_count).map(
      (month) => ({
        month: +month,
        count: requests_count[month],
      })
    );

    const minKey = Math.min(
      1,
      ...arrRequestsWithSpecifiedMonth.map((obj) => obj.month)
    );
    const maxKey = Math.max(
      12,
      ...arrRequestsWithSpecifiedMonth.map((obj) => obj.month)
    );

    const arrRequestsWithSequentialMonths = Array.from(
      { length: maxKey - minKey + 1 },
      (_, i) => ({ month: i + minKey, count: 0 })
    ).reduce((acc, obj) => {
      const index = obj.month - minKey;
      const match = arrRequestsWithSpecifiedMonth.find(
        (item) => item.month === obj.month
      );
      if (match) {
        acc[index] = match;
      } else {
        acc[index] = obj;
      }
      return acc;
    }, []);

    const result = arrRequestsWithSequentialMonths.map((request) => {
      return {
        month: moment.monthsShort(request.month - 1),
        count: request.count
    }});

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const countRequestsByGroup = (req, res) => {};
