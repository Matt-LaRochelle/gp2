import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'
import PacmanLoader from "react-spinners/PacmanLoader";

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, password)
    }
    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <label>Email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button disabled={isLoading}>Sign up</button>
            {error && <div className="error">{error}</div>}
            {isLoading && 
                <div>
                    <p>Fetching data from server...</p>
                    <p>This process tends to take 5-60 seconds</p>  
                    <PacmanLoader color="#36d7b7" />
                </div>}
        </form>
    )
}

export default Signup
