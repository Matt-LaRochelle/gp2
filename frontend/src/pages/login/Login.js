import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLogin } from '../../hooks/useLogin'
import PacmanLoader from "react-spinners/PacmanLoader";
import './login.css'
import Loading from '../../components/loading/Loading';
import Password from '../../components/password/Password';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [checkList, setCheckList] = useState(false)
    const {login, error, isLoading} = useLogin()
    const passwordInputRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    const passwordCheckList = () => {
        setCheckList(true)
    }

    const handleClickOutside = (e) => {
        if (passwordInputRef.current && !passwordInputRef.current.contains(e.target)) {
          setCheckList(false);
        }
      };
    
      useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

    return (
        <div className='login'>
            <div className='loginTop'>
                <div className="loginLogo">
                    <p>Logo</p>
                </div>   
            </div>
            {checkList && 
                    <div className='passwordScreen'>
                        <Password content={password} />
                    </div>
                }

            <form className="loginForm" onSubmit={handleSubmit}>
                <div className='loginMiddle'>
                    <input
                        type="email"
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <input
                        type="password"
                        placeholder='Password'
                        onFocus={passwordCheckList}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        ref={passwordInputRef}
                    />
                    <div className='loginLinkContainer'>
                        <Link to="/forgot" className="loginLink">Forgot password</Link>
                    </div>
                </div>
                <div className="loginBottom">
                    <button disabled={isLoading}>Log In</button>
                    {error && <div className="error">{error}</div>}
                    {isLoading && 
                        <div className="loading">
                            <p>Fetching data from server...</p>
                            <p>This process tends to take 5-60 seconds</p>
                            <PacmanLoader color="#1aac83" />
                        </div>}
                </div>
            </form>
        </div>
    )
}

export default Login