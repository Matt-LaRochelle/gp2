import { useState } from 'react'
import PacmanLoader from "react-spinners/PacmanLoader";

const Forgot = () => {
    const [email, setEmail] = useState('')

    const handleForgotSubmit = async (e) => {
        e.preventDefault()
        console.log("frontend step 1: email: " + email)
        const response = await fetch('https://guitar-paths-api.onrender.com/api/user/forgot', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: email})
        })
        const json = await response.json()

        if (!response.ok) {
            console.log("response is not ok: " + json.error)
        }
        if (response.ok) {
            const text = JSON.stringify(json)
            console.log("got things back: " + text)
        }
    }
    return (
        <form className="login" onSubmit={handleForgotSubmit}>
            <h3>Log in</h3>
            <label>Email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <button>Send link</button>
            {/* disabled={isLoading} */}
            {/* {error && <div className="error">{error}</div>}
            {isLoading && 
                <div className="loading">
                    <p>Sending email...</p>
                    <p>This process tends to take 20-60 seconds</p>
                    <PacmanLoader color="#c1dafb" />
                </div>} */}
        </form>
    )
}

export default Forgot