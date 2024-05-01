import { Resend } from "resend";
import Appointment from "../models/appointmentModel";
import Notification from "../models/notificationModel";
import User from "../models/userModel";
import { getTemplate } from "../mailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);


const getallappointments = async (req: any, res: any) => {
  try {
    const keyword = req.query.search
      ? {
        $or: [{ userId: req.query.search }, { doctorId: req.query.search }],
      }
      : {};

    const appointments = await Appointment.find(keyword)
      .populate("doctorId")
      .populate("userId");
    return res.send(appointments);
  } catch (error) {
    res.status(500).send("Unable to get apponintments");
  }
};

const bookappointment = async (req: any, res: any) => {
  try {
    const appointment = await new Appointment({
      date: req.body.date,
      time: req.body.time,
      doctorId: req.body.doctorId,
      userId: req.locals,
    });

    const usernotification = new Notification({
      userId: req.locals,
      content: `You booked an appointment with Dr. ${req.body.doctorname} for ${req.body.date} ${req.body.time}`,
    });

    await usernotification.save();

    const user = await User.findById(req.locals);


    const doctornotification = new Notification({
      userId: req.body.doctorId,
      //@ts-ignore
      content: `You have an appointment with ${user.firstname} ${user.lastname} on ${req.body.date} at ${req.body.time}`,
    });

    await doctornotification.save();
    //@ts-ignore
    console.log("email", user.email,`]${user.email}[`)
    resend.emails.send({
      from: 'One Big Healthcare <onboarding@resend.dev>',
      //@ts-ignore
      to: `${user.email}`,
      subject: `Appointment confirmation`,
      html: getTemplate(user?.firstname, user?.lastname, req.body.doctorname, req.body.service, req.body.date, req.body.time)
    });

    const result = await appointment.save();
    return res.status(201).send(result);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Unable to book appointment");
  }
};

const completed = async (req: any, res: any) => {
  try {
    const alreadyFound = await Appointment.findOneAndUpdate(
      { _id: req.body.appointid },
      { status: "Completed" }
    );

    const usernotification = new Notification({
      userId: req.locals,
      content: `Your appointment with ${req.body.doctorname} has been completed`,
    });

    await usernotification.save();

    const user = await User.findById(req.locals);

    const doctornotification = new Notification({
      userId: req.body.doctorId,
      //@ts-ignore
      content: `Your appointment with ${user.firstname} ${user.lastname} has been completed`,
    });

    await doctornotification.save();

    return res.status(201).send("Appointment completed");
  } catch (error) {
    res.status(500).send("Unable to complete appointment");
  }
};

const resched = async (req: any, res: any) => {
  try {
    const alreadyFound = await Appointment.findOneAndUpdate(
      { _id: req.body.appointid },
      {
        date: req.body.date,
        time: req.body.time,
      }
    );

    const usernotification = new Notification({
      userId: req.locals,
      content: `Your appointment with ${req.body.doctorname} has been rescheduled`,
    });

    await usernotification.save();

    const user = await User.findById(req.locals);

    const doctornotification = new Notification({
      userId: req.body.doctorId,
      //@ts-ignore
      content: `Your appointment with ${user.firstname} ${user.lastname} has been rescheduled`,
    });

    await doctornotification.save();

    return res.status(201).send("Appointment rescheduled");
  } catch (error) {
    res.status(500).send("Unable to reschedule appointment");
  }
};

const deleteAppointment = async (req: any, res: any) => {
  try {
    const result = await Appointment.findOneAndDelete(
      { _id: req.body.appointid }
    );

    const usernotification = new Notification({
      userId: req.locals,
      content: `Cancelled an appointment with ${req.body.doctorname}`,
    });

    await usernotification.save();


    const user = await User.findById(req.locals);

    const doctornotification = new Notification({
      userId: req.body.doctorId,
      //@ts-ignore
      content: `Your appointment with ${user.firstname} ${user.lastname} is cancelled`,
    });

    await doctornotification.save();

    return res.status(201).send("Appointment cancelled");
  } catch (error) {
    res.status(500).send("Unable to cancel appointment");
  }
};

export default {
  getallappointments,
  bookappointment,
  resched,
  completed,
  deleteAppointment
}