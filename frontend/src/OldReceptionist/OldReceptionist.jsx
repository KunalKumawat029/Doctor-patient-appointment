import React, { useEffect, useState } from "react";
import "./OldReceptionist.css";
import { getUser } from "../helper/helper";

function OldReceptionist() {
    const [oldReceptions, setOldReceptions] = useState([]);
    let token = getUser()?.msg;

    useEffect(() => {
        fetchOldReceptions();
    }, []);

    const fetchOldReceptions = async () => {
        try {
            let response = await fetch('http://localhost:8082/api/reception/oldreceptionlist', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status) {
                const data = await response.json();
                const reception=data.data;
                
                setOldReceptions(reception);
            } else {
                console.error("Failed to fetch receptions");
            }
        } catch (error) {
            console.error("Error fetching receptions:", error);
        }
    };

    return (
        <>
            <div className="tab-rec">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {oldReceptions&&oldReceptions.map((reception) => (
                            <tr key={reception.id}>
                                <td>{reception.id}</td>
                                <td>{reception.name}</td>
                                <td>{reception.phoneNumber}</td>
                                <td>{reception.email}</td>
                                <td>{reception.password}</td>
                                <td>{reception.raddress}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default OldReceptionist;
