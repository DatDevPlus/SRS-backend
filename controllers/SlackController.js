import Slack from "../models/Slack.js";
export const getAllChannel = async (req, res) => {
  try {
    const channelDayOff = await Slack.find(day_off_channel).sort([
      ["createdAt", -1],
    ]);
    const channelHR = await Slack.find(hr_channel).sort([["createdAt", -1]]);

    res.json({ success: true, channelDayOff, channelHR });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const addNotification = async (req, res) => {
  try {
    const { day_off_channel = [], hr_channel = [], by_email } = req.body;
    const newNotification = new Slack({
      day_off_channel,
      hr_channel,
      by_email,
    });
    await newNotification.save();
    res.json({
      success: true,
      message: "Create complete !",
      data: newNotification,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const editNotification = async (req, res) => {
  try {
    const { day_off_channel = [], hr_channel = [], by_email } = req.body;
    // Simple validation

    let updateNotification = {
      day_off_channel,
      hr_channel,
      by_email,
    };
    const updateNotificationCondition = { _id: req.params.id };
    updateNotification = await Slack.findByIdAndUpdate(
      updateNotificationCondition,
      updateNotification,
      { new: true }
    );
    if (!updateNotification)
      return res.status(404).json({
        success: false,
      });
    else {
      res.json({
        success: true,
        message: "Excellent progress!",
        data: updateNotification,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
