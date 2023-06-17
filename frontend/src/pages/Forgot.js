import { useState } from 'react'
import PacmanLoader from "react-spinners/PacmanLoader";

const Forgot = () => {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [linkSent, setLinkSent] = useState(false)

    const handleForgotSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const response = await fetch('https://guitar-paths-api.onrender.com/api/user/forgot', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: email})
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError("There was an error: " + json.error)
        }
        if (response.ok) {
            const text = JSON.stringify(json)
            console.log("got things back: " + text)
            setLinkSent(true)
            setIsLoading(false)
            setError(false)
        }
    }
    
    return (
        <div>
        {!linkSent ? 
            <form className="login" onSubmit={handleForgotSubmit}>
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
                        <p>This process tends to take 5-60 seconds</p>
                        <PacmanLoader color="#1aac83" />
                    </div>}
            </form>
            : <div className="good-response">A reset link has been sent to your email.</div> }
            
        </div>
    )
}

export default Forgot