import React, {  useState } from "react";
import './AddReceptionist.css';
// import { useNavigate } from "react-router-dom";
import { getUser } from "../helper/helper";

function AddReceptionist() {
    const [name, setName] = useState('');
    const [clinicAddress, setClinicAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
      let token = getUser()?.msg
        const data = {
            name: name,
            email: email,
            raddress: clinicAddress,
            phoneNumber: phoneNumber,
            password: password,
        };
        try {
            let respons = await fetch('http://localhost:8082/api/reception/save', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization':`Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            respons = await respons.json()
            if (respons.status) {
                alert('Receptionist Added Successfully')
            }
            else {
                console.error('Failed')
            }

        }
        catch (error) {
            console.error('Error:', error)
        }
    };
 
    return (
        <>
            <div>
                <div className="menu-rec">
                    <p> Total Reception: 3</p>
                </div>
                <div className="menu-form">
                    <form onSubmit={handleSubmit}>
                        <div className="input-recep">
                            <div className="input-rec">
                                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required></input>
                            </div>
                            <div className="input-rec">
                                <input type="text" placeholder="Clinic Address" value={clinicAddress} onChange={(e) => setClinicAddress(e.target.value)} required></input>
                            </div>
                        </div>
                        <div className="input-recep">
                            <div className="input-rec">
                                <input type="text" placeholder="Email Id" value={email} onChange={(e)=>setEmail(e.target.value)} required></input>
                            </div>
                            <div className="input-rec">
                                <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} required></input>
                            </div>
                        </div>
                        <div className="input-recep">
                            <div className="input-rec">
                                <input type="Password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required></input>
                            </div>
                            <div className="input-rec">
                                <input type="Password" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required></input>
                            </div>
                        </div>
                        <div className="input-rec">
                            <button type="Submit">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default AddReceptionist 