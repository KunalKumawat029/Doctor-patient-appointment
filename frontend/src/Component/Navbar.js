import React from "react";
import "./Navbar.css";
import Img from "./images.jpg";
import { NavLink } from "react-router-dom";

const Navbar1 = () => {
  return (
    <nav>
      <div className="logo">
        <img src={Img} width={50} height={50} alt="logo" />
      </div>
      <div className="menu-link">
        <ul>
          <li>
            <NavLink to="/doctor" activeClassName="active">Home</NavLink>
          </li>
          <li>
            <NavLink to="/doctor/appointment" activeClassName="active">Appointment</NavLink>
          </li>
          <li>
            <NavLink to="/doctor/receptionist" activeClassName="active">Receptionist</NavLink>
          </li>
          <li>
            <NavLink to="/doctor/addreceptionist" activeClassName="active">Add Receptionist</NavLink>
          </li>
          <li>
            <NavLink to="/doctor/oldreceptionist" activeClassName="active">Old Receptionist</NavLink>
          </li>
          <li>
            <NavLink to="/doctor/profile" activeClassName="active">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/login" activeClassName="active">Logout</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar1;
