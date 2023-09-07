import { useState, useEffect } from 'react';
import './password.css'
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';

const Password = ({content}) => {
    const [upperCase, setUpperCase] = useState(false)
    const [lowerCase, setLowerCase] = useState(false)
    const [number, setNumber] = useState(false)
    const [specialCharacter, setSpecialCharacter] = useState(false)
    const [eight, setEight] = useState(false)

    useEffect(() => {
        //Check uppercase
        if (/[A-Z]/.test(content)) {
            setUpperCase(true);
        } else {
            setUpperCase(false)
        }

        //Check lowercase
        if (/[a-z]/.test(content)) {
            setLowerCase(true);
        } else {
            setLowerCase(false)
        }

        //Check number
        if (/\d/.test(content)) {
            setNumber(true);
        } else {
            setNumber(false)
        }

        //Check special character
        if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/ .test(content)) {
            setSpecialCharacter(true);
        } else {
            setSpecialCharacter(false)
        }

        //Check that length is greater than 8
        if (content.length >= 8) {
            setEight(true);
        } else {
            setEight(false)
        }
    }, [content])


    return (
            <div className='passwordDisplay'>
                <div className='passwordContent'>
                    <h4>Password must include</h4>
                    <hr></hr>
                    <ul>
                        <li>
                            {upperCase 
                            ? <AiOutlineCheckCircle className="check"/> 
                            : <AiOutlineCloseCircle className="incomplete"/>
                            }
                            One upper case
                        </li>
                        <li>
                            {lowerCase 
                            ? <AiOutlineCheckCircle className="check"/> 
                            : <AiOutlineCloseCircle className="incomplete"/>
                            }
                            One lower case
                        </li>
                        <li>
                            {number
                            ? <AiOutlineCheckCircle className="check"/> 
                            : <AiOutlineCloseCircle className="incomplete"/>
                            }
                            One number
                        </li>
                        <li>
                            {specialCharacter
                            ? <AiOutlineCheckCircle className="check"/> 
                            : <AiOutlineCloseCircle className="incomplete"/>
                            }
                            One special character
                        </li>
                        <li>
                            {eight
                            ? <AiOutlineCheckCircle className="check"/> 
                            : <AiOutlineCloseCircle className="incomplete"/>
                            }
                            At least 8 characters
                        </li>
                    </ul>
                </div>
            </div>
    )
}

export default Password