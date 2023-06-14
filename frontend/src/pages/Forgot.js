import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import PacmanLoader from "react-spinners/PacmanLoader";

const Forgot = () => {
    const [email, setEmail] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(email)
        const response = await fetch('https://guitar-paths-api.onrender.com/api/user/forgot', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email})
        })
        const json = await response.json()
        console.log(json)
    }
    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Log in</h3>
            <label>Email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <button disabled={isLoading}>Send link</button>
            {error && <div className="error">{error}</div>}
            {isLoading && 
                <div className="loading">
                    <p>Sending email...</p>
                    <p>This process tends to take 20-60 seconds</p>
                    <PacmanLoader color="#c1dafb" />
                </div>}
        </form>
    )
}

export default Forgot