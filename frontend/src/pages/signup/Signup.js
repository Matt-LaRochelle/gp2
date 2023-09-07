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


    // Date input color changer
    const inputStyle = {
        color: birthday.length > 0 ? '#333' : 'gray',
      };


    return (
        <div className="signupContianer">
                <div className='signupCircle' />
            {isLoading && <Loading />}
            
            <form className="signupForm" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='First name'
                    onChange={(e) => setFName(e.target.value)}
                    value={fName}
                    className={emptyFields.includes('fName') && 'signupError'}
                />
                <label style={inputStyle} className="signupBirthdayLabel">Birthday</label>
                <input
                    type="date"
                    onChange={(e) => setBirthday(e.target.value)}
                    value={birthday}
                    style={inputStyle}
                    className={emptyFields.includes('birthday') ? 'signupHTMLDate signupError' : 'signupHTMLDate'}
                    />
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
                {checkList && 
                    <div className='signupPasswordChecklist'>
                        <Password content={password} />
                    </div>
                }
                <div className='signupBottom'>
                    {error && <Error error={error}/>}
                    <button disabled={isLoading}>Sign Up</button>
                </div>
            </form>
        </div>
    )
}

export default Signup