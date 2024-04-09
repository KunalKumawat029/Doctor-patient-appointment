import React, { useState, useEffect } from "react";
import "./Patient.css";
import { getUser } from "../helper/helper";

function Patient() {
    const [patients, setPatients] = useState([]);
    const [deletedpatients, setDeletedPatients] = useState([]);
    let user = getUser()
    let token = user?.msg

     useEffect(() => {
         fetchPatients();
     }, []);

    const fetchPatients = async () => {
        try {
            let response = await fetch('http://localhost:8082/api/patient/list', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status) {
                response = await response.json();
                setPatients(response.data);
            } else {
                console.error("Failed to fetch Patients");
            }
        } catch (error) {
            console.error("Error fetching Patients:", error);
        }
    };
    const handleDeletePatients = async (id) => {
        try {
            let response = await fetch(`http://localhost:8082/api/patient/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status) {
                const deletedpatients = patients.find(patients => patients.id === id);
                // Filter out the deleted receptionist from the receptions state
                setPatients(patients.filter(patients => patients.id !== id));
                // Add the deleted receptionist to the deletedReceptions state
                setDeletedPatients([...deletedpatients, deletedpatients]);
                alert("Patient deleted successfully");
                fetchPatients();
            }
            else {
                console.error("Failed to delete patient");
            }
        } catch (error) {
            console.error("Error deleting patients:", error);
        }
    }

    return (
        <>
            <div className="tab-rec">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Sex</th>
                            <th>Age</th>
                            <th>Daignosis</th>
                            <th>Phone Number</th>
                            <th>Appointment Date</th>
                            <th>Time</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients?.filter((item=>item.raddress===user.data.id)).map((patients) => (
                            <tr key={patients.id}>
                                <td>{patients.id}</td>
                                <td>{patients.name}</td>
                                <td>{patients.sex}</td>
                                <td>{patients.age}</td>
                                <td>{patients.daignosis}</td>
                                <td>{patients.phoneNumber}</td>
                                <td>{patients.appointmentdate}</td>
                                <td>{patients.time}</td>
                                <td>
                                    <button onClick={() => handleDeletePatients(patients.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Patient;
