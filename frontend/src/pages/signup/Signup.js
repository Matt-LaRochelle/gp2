import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'
import PacmanLoader from "react-spinners/PacmanLoader";
import './signup.css'

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
        <div>
            <div className='loginTop'>
                <div className="loginLogo">
                    <p>Logo</p>
                </div>   
            </div>
            <form className="signupForm" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='First name'
                    onChange={(e) => setFName(e.target.value)}
                    value={fName}
                />
                <input
                    type="number"
                    placeholder='Birthday'
                    onChange={(e) => setYear(e.target.value)}
                    value={year}
                    />
                <input
                    type="email"
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <input
                    type="password"
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <div className="signupBottom">
                    <button disabled={isLoading}>Sign Up</button>
                    {error && <div className="error">{error}</div>}
                    {isLoading && 
                        <div>
                            <p>Fetching data from server...</p>
                            <p>This process tends to take 5-60 seconds</p>  
                            <PacmanLoader color="#1aac83" />
                        </div>}
                </div>
            </form>
        </div>
    )
}

export default Signup
