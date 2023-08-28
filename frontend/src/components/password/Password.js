import { useState } from 'react';
import './password.css'
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';

const Password = () => {
    const [upperCase, setUpperCase] = useState(false)
    const [lowerCase, setLowerCase] = useState(false)
    const [number, setNumber] = useState(false)
    const [specialCharacter, setSpecialCharacter] = useState(false)
    const [eight, setEight] = useState(false)

    const checkUpper = () => {
        setUpperCase(upperCase => !upperCase)
    }
    const checkLower = () => {
        setLowerCase(lowerCase => !lowerCase)
    }
    const checkNumber = () => {
        setNumber(number => !number)
    }
    const checkSpecialCharacter = () => {
        setSpecialCharacter(specialCharacter => !specialCharacter)
    }
    const checkEight = () => {
        setEight(eight => !eight)
    }
    return (
        <div className="passwordScreenContainer">
            <div className='passwordDisplay'>
                <div className='passwordContent'>
                    <h4>Password must include</h4>
                    <hr></hr>
                    <ul>
                        <li onClick={checkUpper}>
                            {upperCase 
                            ? <AiOutlineCheckCircle className="check"/> 
                            : <AiOutlineCloseCircle className="incomplete"/>
                            }
                            One upper case
                        </li>
                        <li onClick={checkLower}>
                            {lowerCase 
                            ? <AiOutlineCheckCircle className="check"/> 
                            : <AiOutlineCloseCircle className="incomplete"/>
                            }
                            One lower case
                        </li>
                        <li onClick={checkNumber}>
                            {number
                            ? <AiOutlineCheckCircle className="check"/> 
                            : <AiOutlineCloseCircle className="incomplete"/>
                            }
                            One number
                        </li>
                        <li onClick={checkSpecialCharacter}>
                            {specialCharacter
                            ? <AiOutlineCheckCircle className="check"/> 
                            : <AiOutlineCloseCircle className="incomplete"/>
                            }
                            One special character
                        </li>
                        <li onClick={checkEight}>
                            {eight
                            ? <AiOutlineCheckCircle className="check"/> 
                            : <AiOutlineCloseCircle className="incomplete"/>
                            }
                            At least 8 characters long
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Password