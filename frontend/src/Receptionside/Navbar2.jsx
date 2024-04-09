import React from "react";
import "./Navbar2.css";
import Img from "../Component/images.jpg";
import { NavLink } from "react-router-dom";

const Navbar2 = () => {
  return (
    <nav>
      <div className="logo">
        <img src={Img} width={50} height={50} alt="logo" />
      </div>
      <div className="menu-link">
        <ul>
          <li>
            <NavLink to="/receptionist" activeClassName="active" className="Navlink">Home</NavLink>
          </li>
          <li>
            <NavLink to="/receptionist/patientappointment" activeClassName="active" className="Navlink">Patientappointment</NavLink>
          </li>
          <li>
            <NavLink to="/receptionist/patient" activeClassName="active" className="Navlink">Patients</NavLink>
          </li>
          <li>
            <NavLink to="/receptionist/addpatient" activeClassName="active" className="Navlink">Add Patient</NavLink>
          </li>
          <li>
            <NavLink to="/receptionist/recepprofile" activeClassName="active" className="Navlink">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/login" activeClassName="active" className="Navlink">Logout</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar2;
