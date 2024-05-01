import {Schema, model} from "mongoose";

const schema = new Schema(
  {
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    doctorId: {
      type: String,
      ref: "User",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = model("Appointment", schema);

export default Appointment;