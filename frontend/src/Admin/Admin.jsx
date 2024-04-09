import React, { useEffect, useState } from "react";
import "./Admin.css";
import { getUser } from "../helper/helper";

function Admin() {
    let user = getUser();
    let token = user?.msg;
    const [receptionCount, setReceptionCount] = useState(0);
    const [appointmentCount, setAppointmentCount] = useState(0);
    const [daignosePatient, setDaignosePatient] = useState()
    const [unDaignosePatient, setUnDaignosePatient] = useState()
    useEffect(() => {
        fetchReceptionCount();
        fetchAppointmentCount();
    }, []);

    const fetchReceptionCount = async () => {
        try {
            let response = await fetch('http://localhost:8082/api/reception/lists', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status) {
                const responseData = await response.json();
                console.log(responseData); // Log the extracted data for debugging purposes

                if (Array.isArray(responseData.data)) {
                    const count = responseData.data.length;
                    setReceptionCount(count);
                } else {
                    console.error('Receptions data is not an array');
                }
            } else {
                console.error('Failed to fetch reception list');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    const fetchAppointmentCount = async () => {
        try {
            let response = await fetch('http://localhost:8082/api/patient/list', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (response.status) {
                const data = await response.json();
                const patients = data.data;
    
                // Count total appointments
                const totalAppointments = patients.length;
                setAppointmentCount(totalAppointments);
    
                // Filter diagnosed and undiagnosed patients based on activeStatus
                const diagnosedPatients = patients.filter(patient => !patient.activeStatus);
                const undiagnosedPatients = patients.filter(patient => patient.activeStatus);
    
                // Set diagnosed and undiagnosed patient counts
                setDaignosePatient(diagnosedPatients.length);
                setUnDaignosePatient(undiagnosedPatients.length);
            } else {
                console.error("Failed to fetch Patients");
            }
        } catch (error) {
            console.error("Error fetching Patients:", error);
        }
    };
    

    return (
        <>
            <div className="B">
                <h1>Doctor Panel</h1>
                <div className="A">
                    <div className="on">
                        <p>Total Appointments({appointmentCount})</p>
                    </div>
                    <div className="on">
                        <p>Receptions({receptionCount})</p>
                    </div>
                    <div className="on">
                        <p>Diagnosed patients({daignosePatient})</p>
                    </div>
                    <div className="on">
                        <p>Undiagnosed patients({unDaignosePatient})</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Admin;
