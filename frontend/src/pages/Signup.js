import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'
import { useSetup } from '../hooks/useSetup'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()
    const {setup, error: setupError, isLoading: setupIsLoading} = useSetup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, password)
        await setup();
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
            {setupError && <div className="error">{setupError}</div>}
        </form>
    )
}

export default Signup
