import Notification from "../models/notificationModel";

const getallnotifs = async (req: any, res: any) => {
  try {
    const notifs = await Notification.find({ userId: req.locals });
    return res.send(notifs);
  } catch (error) {
    res.status(500).send("Unable to get all notifications");
  }
};

export default {
  getallnotifs,
};