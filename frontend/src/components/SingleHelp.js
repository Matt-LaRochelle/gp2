import { useState } from "react"

const SHelp = () => {
    const [help, setHelp] = useState(false)

    const handleClick = () => {
        setHelp(!help);
    }
    return (
        <div className="help">
        <hr></hr>
            <h2>How to Play</h2>
            <ul>
                <li>Press "Play note" button to hear the note</li>
                <li>Play notes on your guitar until you find one that matches</li>
                <li>Note will be somewhere on first 12 frets of guitar</li>
                <li>Refer to the "Key" if needed to see the names of notes on the guitar</li>
                <li>Select note from list</li>
                <li>Check your answer by clicking "Guess"</li>
                <li>You get four guesses before a new note will be played</li>
                <li>Total correct only logs consecutively correct answers</li>
            </ul>
            <button onClick={handleClick}>Video Expalnation</button>
            {help && <iframe width="100%" height="300" src="https://www.youtube.com/embed/z2AGFdyREy0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>}
        </div>
    )
}

export default SHelp