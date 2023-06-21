import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'
import PacmanLoader from "react-spinners/PacmanLoader";

const Signup = () => {
    const [fName, setFName] = useState('')
    const [year, setYear] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, password, fName, year)
    }
    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>

            <label>First Name:</label>
            <input
                type="text"
                onChange={(e) => setFName(e.target.value)}
                value={fName}
            />
            <label>Year of Birth:</label>
            <input
                type="number"
                onChange={(e) => setYear(e.target.value)}
                value={year}
                 />
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

            <button disabled={isLoading}>Sign Up</button>
            {error && <div className="error">{error}</div>}
            {isLoading && 
                <div>
                    <p>Fetching data from server...</p>
                    <p>This process tends to take 5-60 seconds</p>  
                    <PacmanLoader color="#1aac83" />
                </div>}
        </form>
    )
}

export default Signup
