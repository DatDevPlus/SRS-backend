import Request_detail from "../models/Group.js";

export const create = async (req, res) => {
    try {
        const {
            name,
            description
        } = req.body;
        const newRequest = new Request_detail({
            name,
            description
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