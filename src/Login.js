import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login({DoLoginStuff}) {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        const URL = `http://localhost:8080/login`
        const requestBody = {username: username, password: password}
        let requestData = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        }

        let responseData = await fetch(URL, requestData)
        let status = responseData.status
        responseData = await responseData.json()
        
        if (status === 200) {
            DoLoginStuff(responseData.currentUser)
            
            navigate('/')
        }

        if (status === 500) {

        }
    }

    return (
        <div className='Login'>
            Username
            <input className='LoginUsername' type="text" onChange={e => setUsername(e.target.value)} />
            Password
            <input className='LoginPassword' type="password" onChange={e => setPassword(e.target.value)} />
            <Link className='FormSwapLink' to='/'>Need an account?</Link>
            <button className='LoginButton' onClick={handleLogin}>Sign In</button>
        </div>
    );
}

export default Login;