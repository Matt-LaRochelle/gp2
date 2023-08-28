import { useState } from 'react'
import PacmanLoader from "react-spinners/PacmanLoader";
import './forgot.css'

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
        <div className="forgot">
        {!linkSent ? 
            <div>
                <div className='loginTop'>
                    <div className="loginLogo">
                        <p>Logo</p>
                    </div>   
                </div>
                <p>Enter your email and we will send you a reset link.</p>
                <form onSubmit={handleForgotSubmit}>
                    <input
                        type="email"
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <div className="forgotBottom">
                        <button disabled={isLoading}>Send Link</button>
                        
                        {error && <div className="error">{error}</div>}
                        {isLoading && 
                            <div className="loading">
                                <p>Sending email...</p>
                                <p>This process tends to take 5-60 seconds</p>
                                <PacmanLoader color="#1aac83" />
                            </div>}
                    </div>
                </form>
            </div>
            : <div className="good-response">A reset link has been sent to your email.</div> }
            
        </div>
    )
}

export default Forgot