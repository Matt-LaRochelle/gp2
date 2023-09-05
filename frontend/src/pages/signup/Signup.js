import { useState, useEffect, useRef } from 'react'
import { useSignup } from '../../hooks/useSignup'
import './signup.css'
import Password from '../../components/password/Password';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import { DatePicker } from '@mui/x-date-pickers';
import { Stack, TextField } from '@mui/material';

const Signup = () => {
    const [fName, setFName] = useState('')
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [dateInput, setDateInput] = useState(false)

    const [checkList, setCheckList] = useState(false)
    const {signup, error, isLoading, emptyFields} = useSignup()
    const passwordInputRef = useRef(null);
    const dateInputRef = useRef(null);

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

    const dateClick = () => {
        setDateInput(true)
    }

    useEffect(() => {
        const handleClickOutsideD = (event) => {
            if (dateInputRef.current && !dateInputRef.current.contains(event.target)) {
                setDateInput(false)
            }
        };

        document.addEventListener('click', handleClickOutsideD);

        return () => {
            document.removeEventListener('click', handleClickOutsideD);
        };
    }, [])


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
                    className={emptyFields.includes('fName') && 'signupError'}
                />
                <div 
                    className="signupDateContainer"
                    onClick={dateClick}
                    ref={dateInputRef}
                    >
                    {!dateInput 
                    ? <p>Birthday</p>
                    :
                    <div className="signupDateInputContainer">
                        <input className="signupDateInput" placeholder="Month" type="number" />
                        <input className="signupDateInput" placeholder="Day" type="number" />
                        <input className="signupDateInput" placeholder="Year" type="number" />
                    </div>}
                </div>
                {/* <input
                    type="date"
                    placeholder='Birthday'
                    onChange={(e) => setBirthday(e.target.value)}
                    value={birthday}
                    className={emptyFields.includes('birthday') ? 'signupDateInput signupError' : 'signupDateInput'}
                    /> */}
                <input
                    type="email"
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className={emptyFields.includes('email') && 'signupError'}
                />
                <input
                    type="password"
                    placeholder='Password'
                    onFocus={passwordCheckList}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    ref={passwordInputRef}
                    className={emptyFields.includes('password') && 'signupError'}
                />
                <div className='signupBottom'>
                    {error && <Error error={error}/>}
                    <button disabled={isLoading}>Sign Up</button>
                </div>
            </form>
        </div>
    )
}

export default Signup
