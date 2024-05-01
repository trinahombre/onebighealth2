import {Schema, model} from "mongoose";

const schema = new Schema(
  {
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Notification = model("Notification", schema);

export default Notification;