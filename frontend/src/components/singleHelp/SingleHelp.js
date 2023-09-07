// import { useState } from "react"
import './singleHelp.css'
import Navbar from '../navbar/Navbar'

const SHelp = () => {
    // const [help, setHelp] = useState(false)

    // const handleClick = () => {
    //     setHelp(!help);
    // }
    return (
        <div className="helpScreen">
            {/* <Navbar /> */}
            <h3>Instructions</h3>
            <p>
            Play the note using the play button, then using your guitar, 
            try to find the note. Once you’ve found it, pick the note from 
            the menu. You get four guesses. Good luck!
            </p>
            {/* <button onClick={handleClick}>Video Expalnation</button>
            {help && <iframe width="100%" height="300" src="https://www.youtube.com/embed/z2AGFdyREy0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>} */}
        </div>
    )
}

export default SHelp