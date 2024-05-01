import React, { useState } from "react";
import "../styles/bookappointment.css";
import axios from "axios";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";

const BookAppointment = ({ setModalOpen, ele }) => {
  const [formDetails, setFormDetails] = useState({
    date: "",
    time: "",
    doctorID: "",
    service: "",
    doctorName: ""
  });

  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const bookAppointment = async (e) => {
    e.preventDefault();
    try {
      await toast.promise(
        axios.post(
          "/appointment/bookappointment",
          {
            doctorId: formDetails.doctorID,
            date: formDetails.date,
            time: formDetails.time,
            doctorname: formDetails.doctorName,
            service: formDetails.service
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "Appointment booked successfully",
          error: "Unable to book appointment",
          loading: "Booking appointment...",
        }
      );
      // setModalOpen(false);
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <div className="flex-start">
        <div className="modal__content" style={{backgroundColor:'white'}}>
          <h2 className="" style={{color:'black'}}>Book Appointment</h2>
          
          <div className="register-container flex-center book">
            <form className="">
            <input
                type="text"
                name="doctorID"
                placeholder="doctor id"
                className=""
                value={formDetails.doctorID}
                onChange={inputChange}
              />
              <input
                type="text"
                name="doctorName"
                placeholder="doctor name"
                className=""
                value={formDetails.doctorName}
                onChange={inputChange}
              />
              <input
                type="text"
                name="service"
                placeholder="Service"
                className=""
                value={formDetails.service}
                onChange={inputChange}
              />
              <input
                type="date"
                name="date"
                className=""
                value={formDetails.date}
                onChange={inputChange}
              />
              <input
                type="time"
                name="time"
                className=""
                value={formDetails.time}
                onChange={inputChange}
              />
              <button
                type="submit"
                className=""
                onClick={bookAppointment}
              >
                book
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookAppointment;
