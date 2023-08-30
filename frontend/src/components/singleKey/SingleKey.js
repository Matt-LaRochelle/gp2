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
    }, [])

    return (
        <div className="singleKeyContainer">
            {
                sharpKey 
                ? <img src={sharps} alt="notes on the guitar using naturals and sharps" />
                : <img src={flats} alt="notes on the guitar using naturals and flats" />
            }
        </div>
    )
}

export default SKey