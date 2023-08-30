import sharps from '../Sharps.png'
import flats from '../Flats.png'
import './singleKey.css'
import { useState, useEffect } from 'react'
import { AiOutlineFullscreen } from 'react-icons/ai'

const SKey = ({type}) => {
    const [sharpKey, setSharpKey] = useState(true)
    const [isMaximized, setIsMaximized] = useState(false);

    const toggleMaximize = () => {
        setIsMaximized(!isMaximized);
      };

      const windowStyles = {
        // Apply styles based on the maximize state
        width: isMaximized ? '100%' : '300px',
        height: isMaximized ? 'auto' : '200px',
        position: isMaximized ? 'fixed' : 'absolute',
        top: isMaximized ? '0' : '200px',
        left: isMaximized ? '0' : '50%',
        transform: isMaximized ? 'none' : 'translate(-50%, -50%)',
        zIndex: isMaximized ? '999' : '0',
      };

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
        <div>
            <div className="window" style={windowStyles}>
                {
                    sharpKey 
                    ? <img src={sharps} alt="notes on the guitar using naturals and sharps" />
                    : <img src={flats} alt="notes on the guitar using naturals and flats" />
                }
                <AiOutlineFullscreen className='maximize' onClick={toggleMaximize} />
            </div>
        </div>
    )
}

export default SKey