import React, { useEffect, useState } from "react";
import Empty from "../components/Empty";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import fetchData from "../helper/apiCall";
import { setLoading } from "../redux/reducers/rootSlice";
import Loading from "../components/Loading";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/user.css";
import { useAppDispatch, useAppSelector } from "../redux/store";
import ReschedAppointment from "../components/ReschedAppointment";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [reschedEle, setreschedEle] = useState(null)
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.root);
  //@ts-ignore
  const { userId, role } = jwtDecode(localStorage.getItem("token"));
  const [modalOpen, setModalOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const handleModal = () => {
    if (token === "") {
      return toast.error("You must log in first");
    }
    setModalOpen(true);
  };

  const getAllAppoint = async () => {
    try {
      dispatch(setLoading(true));
      const temp = await fetchData(
        `/appointment/getallappointments?search=${userId}`
      );
      setAppointments(temp);
      dispatch(setLoading(false));
    } catch (error) { }
  };

  useEffect(() => {
    getAllAppoint();
  }, []);

  const complete = async (ele) => {
    try {
      await toast.promise(
        axios.put(
          "/appointment/completed",
          {
            appointid: ele?._id,
            doctorId: ele?.doctorId?._id,
            doctorname: `${ele?.userId?.firstname} ${ele?.userId?.lastname}`,
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

      getAllAppoint();
    } catch (error) {
      return error;
    }
  };

  const cancel = async (ele) => {
    try {
      await toast.promise(
        axios.put(
          "/appointment/deleted",
          {
            appointid: ele?._id,
            doctorId: ele?.doctorId?._id,
            doctorname: `${ele?.userId?.firstname} ${ele?.userId?.lastname}`,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "Appointment cancelled",
          error: "Unable to cancel appointment",
          loading: "cancelling appointment...",
        }
      );

      getAllAppoint();
    } catch (error) {
      return error;
    }
  };

  const renderCompleteButton = (ele) => {
    return (<td>
      <button
        className={`btn user-btn accept-btn ${ele?.status === "Completed" ? "disable-btn disable-color" : ""
          }`}
        disabled={ele?.status === "Completed"}
        onClick={() => complete(ele)}
      >
        Complete
      </button>
    </td>)
  }

  const renderCancelButton = (ele) => {
    return (<td>
      <button
        className={`btn user-btn accept-btn ${ele?.status === "Completed" ? "disable-btn disable-color" : ""
          }`}
        disabled={ele?.status === "Completed"}
        onClick={() => cancel(ele)}
      >
        Cancel
      </button>
    </td>)
  }

  const renderReschedButton = (ele) => {
    return (<td>
      <button
        className={`btn user-btn accept-btn ${ele?.status === "Completed" ? "disable-btn disable-color" : ""
          }`}
        disabled={ele?.status === "Completed"}
        onClick={() =>{
          setreschedEle(ele)
          setTimeout(() => setModalOpen(true), 400)
           
           
          }}
      >
        Reschedule
      </button>
    </td>)
  }




  return (
    <>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <section className="container notif-section">
          <h2 className="page-heading">Your Appointments</h2>
          {modalOpen && (
        <ReschedAppointment
          setModalOpen={setModalOpen}
          ele={reschedEle}
        />
      )}

          {appointments.length > 0 ? (
            <div className="appointments">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Doctor</th>
                    <th>Patient</th>
                    <th>Appointment Date</th>
                    <th>Appointment Time</th>
                    <th>Status</th>
                    {userId === appointments[0].doctorId?._id ? (
                      <th>Action</th>
                    ) : (
                      <></>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {appointments?.map((ele, i) => {
                    return (
                      <tr key={ele?._id}>
                        <td>{i + 1}</td>
                        <td>
                          {ele?.doctorId?.firstname +
                            " " +
                            ele?.doctorId?.lastname}
                        </td>
                        <td>
                          {ele?.userId?.firstname + " " + ele?.userId?.lastname}
                        </td>
                        <td>{ele?.date}</td>
                        <td>{ele?.time}</td>
                        <td>{ele?.status}</td>
                        {userId === ele?.doctorId?._id
                          ? renderCompleteButton(ele) :
                          (userId === ele?.userId?._id
                            ? renderCancelButton(ele)
                            : <></>
                          )
                        }
                        {userId === ele?.userId?._id
                            ? renderReschedButton(ele)
                            : <></>
                          
                        }

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <Empty />
          )}
        </section >
      )}
      <Footer />
    </>
  );
};
export default Appointments;
