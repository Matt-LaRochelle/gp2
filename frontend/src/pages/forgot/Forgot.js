import { useState } from 'react'
import './forgot.css'
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';

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
        <div className="forgotContainer">
        {!linkSent ? 
            <div>
                <div className="forgotCircle" />
                {isLoading && <Loading />}
                {error && <Error error={error}/>}
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
                    </div>
                </form>
            </div>
            : 
                <div>
                    <div className="forgotCircle" />
                    <div className="resetResponse">A reset link has been sent to your email.</div>
                </div> }
            
        </div>
    )
}

export default Forgot