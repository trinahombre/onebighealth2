import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "./Loading";
import { setLoading } from "../redux/reducers/rootSlice";
import Empty from "./Empty";
import fetchData from "../helper/apiCall";
import "../styles/user.css";
import { useAppDispatch, useAppSelector } from "../redux/store";
import ReschedAppointment from "./ReschedAppointment";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.root);
  const [reschedEle, setreschedEle] = useState(null)
  const [modalOpen, setModalOpen] = useState(false);

  const getAllAppoint = async () => {
    try {
      dispatch(setLoading(true));
      const temp = await fetchData(`/appointment/getallappointments`);
      setAppointments(temp);
      dispatch(setLoading(false));
    } catch (error) {}
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
            doctorId: ele?.doctorId._id,
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

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="user-section">
          <h3 className="home-sub-heading">All Users</h3>
          {modalOpen && (
        <ReschedAppointment
          setModalOpen={setModalOpen}
          ele={reschedEle}
        />
      )}
          {appointments.length > 0 ? (
            <div className="user-container">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Doctor</th>
                    <th>Patient</th>
                    <th>Appointment Date</th>
                    <th>Appointment Time</th>
                    {/* <th>Booking Date</th>
                    <th>Booking Time</th> */}
                    <th>Status</th>

                    <th>Action</th>
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
                        {/* <td>{ele?.createdAt.split("T")[0]}</td>
                        <td>{ele?.updatedAt.split("T")[1].split(".")[0]}</td> */}
                        <td>{ele?.status}</td>
                        <td>
                          <button
                            className={`btn user-btn accept-btn ${
                              ele?.status === "Completed" ? "disable-btn disable-color" : ""
                            }`}
                            disabled={ele?.status === "Completed"}
                            onClick={() => complete(ele)}
                          >
                            Complete
                          </button>
                        </td>
                        {renderReschedButton(ele)}
                        {renderCancelButton(ele)}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <Empty />
          )}
        </section>
      )}
    </>
  );
};

export default AdminAppointments;
