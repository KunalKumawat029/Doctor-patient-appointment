import { useEffect, useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [selectedOption, setSelectedOption] = useState('doctor');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const requestBody = {
                email: username,
                password: password,
                role: selectedOption.toLowerCase()
            };
            if (selectedOption === "doctor") {
                let respons = await fetch('http://localhost:8082/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });
                respons = await respons.json();
                if (respons.status) {
                    localStorage.setItem("user", JSON.stringify(respons))
                    if (respons.type === "doctor") {
                        navigate("/doctor")
                    }
                } else {
                    alert("please enter valid deatails")
                }
            }
            else {
                let respons = await fetch('http://localhost:8082/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });
                respons = await respons.json();
                if (respons.status) {
                    localStorage.setItem("user", JSON.stringify(respons))
                    if (respons.type === "reception") {
                        navigate("/receptionist")
                    }
                } else {
                    alert("please enter valid deatails")
                }
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        localStorage.removeItem("user")
    })
    return (
        <div className="body">
            <div className="main">
                <div className="log">
                    <h1>Login</h1>
                    <div className="drop">
                        <button className="dropdown-toggle" onClick={() => setSelectedOption(selectedOption === 'doctor' ? 'receptionist' : 'doctor')} aria-expanded="false">
                            {selectedOption}
                        </button>
                        <ul className="dropdown-menu">
                            <li><button className="dropdown-item" onClick={() => setSelectedOption('doctor')}>doctor</button></li>
                            <li><button className="dropdown-item" onClick={() => setSelectedOption('Receptionist')}>Receptionist</button></li>
                        </ul>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="input-box">
                            <input type="text" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)}></input>
                        </div>
                        <div className="input-box">
                            <input type="Password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}></input>
                        </div>
                        <button type="submit">Login</button>
                        <div className="para">
                            <p>PLease make sure your Username and Password is correct?</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;