import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleRegister = async () => {
        const URL = `http://localhost:8080/register`; 
        const requestBody = {
            username: username,
            password: password,
            email: email
        };
        let requestData = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        };

        let responseData = await fetch(URL, requestData);
        let status = responseData.status;
        responseData = await responseData.json();

        if (status === 200) {
            navigate('/login'); // Navigate to login page or other page as needed
        }

        if (status === 500) {
            alert("Either user exists or there was an error")
        }
    };

    return (
        <div className='Register'>
            Username
            <input className='RegisterUsername' type="text" onChange={e => setUsername(e.target.value)} />
            Password
            <input className='RegisterPassword' type="password" onChange={e => setPassword(e.target.value)} />
            Email
            <input className='RegisterEmail' type="email" onChange={e => setEmail(e.target.value)} /> {/* Optional: Email input */}
            <Link className='FormSwapLink' to='/login'>Already have an account?</Link>
            <button className='RegisterButton' onClick={handleRegister}>Sign Up</button>
        </div>
    );
}

export default Register;
