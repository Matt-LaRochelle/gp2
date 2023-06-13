import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'
import PacmanLoader from "react-spinners/PacmanLoader";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Signup = () => {
    const [fName, setFName] = useState('')
    const [birthday, setBirthday] = useState(new Date());
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(fName, birthday, email, password)
    }
    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <label>First name:</label>
            <input
                type="text"
                onChange={(e) => setFName(e.target.value)}
                value={fName}
            />
            <label>Birthday:</label>
            <DatePicker selected={birthday} onChange={(date) => setBirthday(date)} />
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
                    <PacmanLoader color="#1aac83" />
                </div>}
        </form>
    )
}

export default Signup
