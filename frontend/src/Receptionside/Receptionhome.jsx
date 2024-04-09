import React, { useEffect, useState } from "react";
import "./receptionhome.css";
import { getUser } from "../helper/helper";

function Receptionhome() {
    const [patients, setPatients] = useState([]);
    const [diagnosedCount, setDiagnosedCount] = useState(0);
    const [undiagnosedCount, setUndiagnosedCount] = useState(0);
    const user = getUser();
    const token = user?.msg;
    const receptionId = user?.data?.id;

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            let response = await fetch(`http://localhost:8082/api/patient/list?receptionId=${receptionId}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                const filteredPatients = data.data.filter(patient => patient.raddress === receptionId);
                setPatients(filteredPatients);
                countDiagnosedAndUndiagnosed(filteredPatients);
            } else {
                console.error("Failed to fetch Patients");
            }
        } catch (error) {
            console.error("Error fetching Patients:", error);
        }
    };

    const countDiagnosedAndUndiagnosed = (filteredPatients) => {
        const diagnosedPatients = filteredPatients.filter(patient => !patient.activeStatus);
        const undiagnosedPatients = filteredPatients.filter(patient => patient.activeStatus);
        setDiagnosedCount(diagnosedPatients.length);
        setUndiagnosedCount(undiagnosedPatients.length);
    };

    return (
        <>
            <div className="B">
                <h1>Receptions Panel</h1>
                <div className="A">
                    <div className="on">
                        <p>Total Patients: {patients.length}</p>
                    </div>
                    <div className="on">
                        <p>Diagnosed Patients: {diagnosedCount}</p>
                    </div>
                    <div className="onn">
                        <p>Undiagnosed Patients: {undiagnosedCount}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Receptionhome;
