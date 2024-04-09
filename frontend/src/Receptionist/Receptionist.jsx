import React, { useEffect, useState } from "react";
import "./Receptionist.css";
import { getUser } from "../helper/helper";

function Receptionist() {
    const [receptions, setReceptions] = useState([]);
    const [deletedReceptions, setDeletedReceptions] = useState([]);
    let token = getUser()?.msg;

    useEffect(() => {
        fetchReceptions();
    }, []);

    const fetchReceptions = async () => {
        try {
            let response = await fetch('http://localhost:8082/api/reception/lists', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status) {
                response = await response.json();
                setReceptions(response.data);
            } else {
                console.error("Failed to fetch receptions");
            }
        } catch (error) {
            console.error("Error fetching receptions:", error);
        }
    };
    const handleDeleteReceptionist=async(id)=>{
        try{
            let response=await fetch(`http://localhost:8082/api/reception/delete/${id}`,{
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if(response.status){
                const deletedReception = receptions.find(reception => reception.id === id);
                // Filter out the deleted receptionist from the receptions state
                setReceptions(receptions.filter(reception => reception.id !== id));
                // Add the deleted receptionist to the deletedReceptions state
                setDeletedReceptions([...deletedReceptions, deletedReception]);
                alert("Receptionist deleted successfully");
                fetchReceptions();
            }
            else {
                console.error("Failed to delete receptionist");
            }
        } catch (error) {
            console.error("Error deleting receptionist:", error);
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
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {receptions&&receptions.map((reception) => (
                            <tr key={reception.id}>
                                <td>{reception.id}</td>
                                <td>{reception.name}</td>
                                <td>{reception.phoneNumber}</td>
                                <td>{reception.email}</td>
                                <td>{reception.password}</td>
                                <td>{reception.raddress}</td>
                                <td>
                                    <button onClick={() => handleDeleteReceptionist(reception.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Receptionist;
