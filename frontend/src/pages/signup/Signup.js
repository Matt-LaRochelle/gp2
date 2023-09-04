import { useState, useEffect, useRef } from 'react'
import { useSignup } from '../../hooks/useSignup'
import './signup.css'
import Password from '../../components/password/Password';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';

const Signup = () => {
    const [fName, setFName] = useState('')
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [checkList, setCheckList] = useState(false)
    const {signup, error, isLoading, emptyFields} = useSignup()
    const passwordInputRef = useRef(null);

    useEffect(() => {
        console.log(emptyFields)
    }, [emptyFields])

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, password, fName, birthday)
    }

    const passwordCheckList = () => {
        setCheckList(true)
    }

    // handleClick for password
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
        <div className="signupContianer">
                <div className='signupCircle' />
            {isLoading && <Loading />}
            {checkList && 
                    <div className='passwordScreen'>
                        <Password content={password} />
                    </div>
                }
            <form className="signupForm" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='First name'
                    onChange={(e) => setFName(e.target.value)}
                    value={fName}
                />
                <input
                    type="date"
                    placeholder='Birthday'
                    onChange={(e) => setBirthday(e.target.value)}
                    value={birthday}
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
                    onFocus={passwordCheckList}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    ref={passwordInputRef}
                />
                {error && <Error error={error}/>}
                <button disabled={isLoading}>Sign Up</button>
            </form>
        </div>
    )
}

export default Signup
