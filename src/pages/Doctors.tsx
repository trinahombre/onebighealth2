import React, { useEffect, useState } from "react";
import DoctorCard from "../components/DoctorCard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/doctors.css";
import fetchData from "../helper/apiCall";
import Loading from "../components/Loading";
import { setLoading } from "../redux/reducers/rootSlice";
import Empty from "../components/Empty";
import { useAppDispatch, useAppSelector } from "../redux/store";
import BookAppointment from "../components/BookAppointment";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.root);

  const fetchAllDocs = async () => {
    dispatch(setLoading(true));
    const data = await fetchData(`/doctor/getalldoctors`);
    setDoctors(data);
    dispatch(setLoading(false));
  };

  useEffect(() => {
    fetchAllDocs();
  }, []);

  return (
    <>
      <Navbar />
      {loading && <Loading />}
      {!loading && (
        <section className="container doctors">
          <h2 className="">Our Doctors</h2>
          {doctors.length > 0 ? (
            <div className="doctors-card-container">
              {doctors.map((ele) => {
                return (
                  <DoctorCard
                    ele={ele}
                    key={ele._id}
                  />
                );
              })}
            </div>
          ) : (
            <Empty />
          )}
          <BookAppointment setModalOpen={undefined} ele={undefined}        />
        </section>
      )}
      <Footer />
    </>
  );
};

export default Doctors;
