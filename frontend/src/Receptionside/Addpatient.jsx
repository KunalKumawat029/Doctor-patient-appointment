import React, { useState } from "react";
import './Addpatient.css';
import { getUser } from "../helper/helper";


function Addpatient() {
    const [name,setName]=useState("");
    const [phoneNumber,setPhoneNumber]=useState("");
    const [sex,setSex]=useState("");
    const [age,setAge]=useState("");
    const [daignosis,setDaignosis]=useState("");
    const [appointmentdate,setAppointmentdate]=useState("");
    const [time,setTime]=useState("");
    const handleSubmit = async(e) => {
        e.preventDefault();
        let token=getUser()?.msg
        const data={
            name:name,
            phoneNumber:phoneNumber,
            sex:sex,
            age:age,
            daignosis:daignosis,
            appointmentdate:appointmentdate,
            time:time,
        };
        try{

            let reaponse= await fetch('http://localhost:8082/api/patient/addpatient',{
                method:'POST',
                body:JSON.stringify(data),
                headers:{
                    'content-type':'application/json',
                    'Authorization':`Bearer ${token}`
                },
            });
            reaponse=await reaponse.json()
            if (reaponse.status) {
                alert('Patient Added Successfully')
            }
            else {
                console.error('Failed')
            }
        }
        catch(error){
            console.error('Error:',error);
        }
    };
    return (
        <>
            <div>
                <div className="menu-form">
                    <form onSubmit={handleSubmit}>
                        <div className="input-recep">
                            <div className="input-rec">
                                <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} required></input>
                            </div>
                            <div className="input-rec">
                                <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} required></input>
                            </div>
                        </div>
                        <div className="input-recep">
                            <div className="input-rec">
                                <input type="text" placeholder="Sex" value={sex} onChange={(e)=>setSex(e.target.value)} required></input>
                            </div>
                            <div className="input-rec">
                                <input type="text" placeholder="Age" value={age} onChange={(e)=>setAge(e.target.value)}  required></input>
                            </div>
                        </div>
                        <div className="input-recep">
                            <div className="input-rec">
                                <input type="text" placeholder="Diagnose" value={daignosis} onChange={(e)=>setDaignosis(e.target.value)}></input>
                            </div>
                            <div className="input-rec">
                                <input type="date" placeholder="Appointment Date" value={appointmentdate} onChange={(e)=>setAppointmentdate(e.target.value)} ></input>
                            </div>
                        </div>
                        <div className="input-recep">
                            <div className="input-rec">
                                <input type="time" placeholder="Time" value={time} onChange={(e)=>setTime(e.target.value)} ></input>
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
export default Addpatient 