import React from "react";
import Login from './Loginform/Login';
import DoctorRoute from "./protectedRoute/DoctorRoute";
import ReceptionRoute from "./protectedRoute/ReceptionRoute"; // Import ReceptionRoute
import { Navigate, Route, Routes } from "react-router-dom";
import { getUser } from "./helper/helper";
import Admin from "./Admin/Admin";
import Appointment from "./Appointment/Appointment";
import Receptionist from "./Receptionist/Receptionist";
import AddReceptionist from "./AddReceptionist/AddReceptionist";
import OldReceptionist from "./OldReceptionist/OldReceptionist";
import Receptionhome from "./Receptionside/Receptionhome";
import Patientappointment from "./Receptionside/Patientappointment";
import Patient from "./Receptionside/Patient";
import Addpatient from "./Receptionside/Addpatient";
import RecepProfile from "./Component/Profile";
import Profile from "./Component/Profile";

function App() {

  // let user = getUser(); // Retrieve user information

  return (
    <>
      <Routes>
      <Route path="/" element={<Navigate to={getUser()?.type==="reception" ?"/receptionist":getUser()?.type==="doctor" ?"/doctor" : "/login"} />} />

        <Route path='/doctor' element={<DoctorRoute />}>
          <Route index element={<Admin />} />
          <Route path="appointment" element={<Appointment />} />
          <Route path="receptionist" element={<Receptionist />} />
          <Route path="addreceptionist" element={<AddReceptionist />} />
          <Route path="oldreceptionist" element={<OldReceptionist />} />
          <Route path="oldreceptionist" element={<OldReceptionist />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path='/receptionist' element={<ReceptionRoute />}>
          <Route index element={<Receptionhome />} />
          <Route path="patientappointment" element={<Patientappointment />} />
          <Route path="patient" element={<Patient />} />
          <Route path="addpatient" element={<Addpatient/>} />
          <Route path="recepprofile" element={<RecepProfile />} />
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
