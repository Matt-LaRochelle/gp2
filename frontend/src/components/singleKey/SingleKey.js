import sharps from '../Sharps.png'
import flats from '../Flats.png'
import './singleKey.css'
import { useState, useEffect } from 'react'

const SKey = ({type}) => {
    const [sharpKey, setSharpKey] = useState(true)

    // To do:
    // In here you can have a maximize/minimize window
    // Always display the key in a minimal fashion - 200 x 200
    // Still have a background fade color 
    // but make sure you can click through it

    useEffect(() => {
        if (type) {
            setSharpKey(true)
        } else {
            setSharpKey(false)
        }
    }, [type])

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