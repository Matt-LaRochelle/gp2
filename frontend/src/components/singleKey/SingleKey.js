import sharps from '../Sharps.png'
import flats from '../Flats.png'
import './singleKey.css'
import { useState, useEffect } from 'react'

const SKey = ({type}) => {
    const [sharpKey, setSharpKey] = useState(true)

    useEffect(() => {
        if (type) {
            setSharpKey(true)
        } else {
            setSharpKey(false)
        }
    }, [type])

    return (
        <div className="keyContainer">
            <div className="window">
                {
                sharpKey 
                ? <img src={sharps} alt="notes on the guitar using sharps" />
                : <img src={flats} alt="notes on the guitar using flats" />
                }
            </div>
        </div>
    )
}

export default SKey