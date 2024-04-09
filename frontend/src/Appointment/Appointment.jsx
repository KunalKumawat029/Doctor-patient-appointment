import React, { useState, useEffect } from "react";
import "./Appointment.css";
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getUser } from "../helper/helper";

function Appointment() {
  const [patients, setPatients] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [activeStatus, setActiveStatus] = useState({}); // Track appointment status for each patient
    const user = getUser();
    const token = user?.msg;

    useEffect(() => {
        fetchAppointPatients();
        // Retrieve appointment status from localStorage on component mount
        const storedActiveStatus = localStorage.getItem("activeStatus");
        if (storedActiveStatus) {
          setActiveStatus(JSON.parse(storedActiveStatus));
        }
      }, []);
      
      useEffect(() => {
        // Save appointment status to localStorage whenever it changes
        localStorage.setItem("activeStatus", JSON.stringify(activeStatus));
      }, [activeStatus]);
      
      const fetchAppointPatients = async () => {
        try {
          const response = await fetch('http://localhost:8082/api/patient/list', {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            setPatients(data.data);
            setFilteredPatients(data.data); // Initialize filtered data with all patients
            
            // Initialize activeStatus based on data from the server
            const initialActiveStatus = {};
            data.data.forEach(patient => {
              initialActiveStatus[patient.id] = patient.activeStatus;
            });
            setActiveStatus(initialActiveStatus);
          } else {
            console.error("Failed to fetch Patients");
            }
          } catch (error) {
            console.error("Error fetching Patients:", error);
          }
        };
        
        const handleShowAppointments = () => {
          // Filter patients based on the selected date
        const filteredAppointments = patients.filter(patient => {
            const appointmentDate = new Date(patient.appointmentdate);
            return appointmentDate.toDateString() === selectedDate.toDateString();
        });
        setFilteredPatients(filteredAppointments);
    };

    // const handleToggleAppointment = async (id) => {
    //   try {
    //     const newStatus = !activeStatus[id]; // Toggle the status
        
    //     const response = await fetch(`http://localhost:8082/api/patient/done/${id}`, {
    //       method: 'PUT',
    //       headers: {
    //         'Content-type': 'application/json',
    //         'Authorization': `Bearer ${token}`
    //       },
    //       body: JSON.stringify({ done: newStatus }) // Send the new status in the body
    //     });
        
    //     if (response.status) {
    //       const updatedActiveStatus = { ...activeStatus, [id]: newStatus };
    //       setActiveStatus(updatedActiveStatus);
    //       alert(`Appointment ${newStatus ? "marked as done" : "activated"} successfully`);
    //     } else {
    //       console.error("Failed to toggle appointment status");
    //     }
    //   } catch (error) {
    //     console.error("Error toggling appointment status:", error);
    //   }
    // };
    
    
    return (
        <>
            <div className="menu">
                <div className="one">
                    <Datepicker
                        selected={selectedDate}
                        onChange={date => setSelectedDate(date)}
                        dateFormat="dd-MM-yyyy"
                        showYearDropdown
                    />
                </div>
                <div className="one" id="appoi">
                    <button onClick={handleShowAppointments}>Show Appointment</button>
                </div>
            </div>
            <div className="tab-rece">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Sex</th>
                            <th>Age</th>
                            <th>Diagnosis</th>
                            <th>Phone Number</th>
                            <th>Appointment Date</th>
                            <th>Time</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPatients?.map(patient => (
                            <tr key={patient.id}>
                                <td>{patient.id}</td>
                                <td>{patient.name}</td>
                                <td>{patient.sex}</td>
                                <td>{patient.age}</td>
                                <td>{patient.daignosis}</td>
                                <td>{patient.phoneNumber}</td>
                                <td>{patient.appointmentdate}</td>
                                <td>{patient.time}</td>
                                <td>

                                    {/* <button
                                        style={{
                                            backgroundColor: activeStatus[patient.id] ? "yellow" : "green", color: "white",
                                            color: "black",
                                            border: "4px solid rgb(38, 46, 46)",
                                            padding: "0px 10px",
                                            borderRadius: "20px",
                                            cursor: "pointer",
                                            marginRight: "8px",
                                        }}
                                        onClick={() => handleToggleAppointment(patient.id)}
                                        disabled={!activeStatus[patient.id]}
                                        
                                    >
                                        {activeStatus[patient.id] ? "UnDiagnosed" : "Diagnosed"}
                                    </button> */}
                                    {activeStatus[patient.id] ? "Undiagnosed" : "Diagnosed"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
  }
export default Appointment 