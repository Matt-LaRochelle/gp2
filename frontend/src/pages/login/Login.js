import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLogin } from '../../hooks/useLogin'
import PacmanLoader from "react-spinners/PacmanLoader";
import './login.css'
import Loading from '../../components/loading/Loading';
import Password from '../../components/password/Password';
import Error from '../../components/error/Error';

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
        <div className='loginContainer'>
            <div className="loginCircle" />
            {checkList && 
                    <div className='passwordScreen'>
                        <Password content={password} />
                    </div>
                }
            {isLoading && <Loading />}

            <form className="loginForm" onSubmit={handleSubmit}>
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
                    <Link to="/forgot" className="loginLink">Forgot password</Link>
                    {error && <Error error={error}/>}
                    <button disabled={isLoading}>Log In</button>
            </form>
        </div>
    )
}

export default Login