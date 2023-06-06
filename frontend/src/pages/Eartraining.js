import Single from '../components/Single'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from 'react'


const Eartraining = () => {
    const { user } = useAuthContext()
    const [display, setDisplay] = useState(null)



    const toggle = (e) => {
        console.log(e.target.id)
        setDisplay(e.target.id)
    }
    return (
        <div className="eartraining">
            <h1>Ear Training</h1>
            {display ? null :
            <p>
                Learning to identify notes by ear is an essential skill 
                for any musician, and it's also a lot of fun! It can 
                help you to play music more confidently and accurately, 
                and can also improve your ability to improvise and compose. 
                Additionally, it can make listening to music more enjoyable 
                as you start to notice the nuances and subtleties in the 
                melodies and harmonies. Don't be intimidated by the idea of 
                ear training - it's a skill that can be developed with 
                practice and patience. With each note you're able to recognize, 
                you'll feel a sense of accomplishment and progress, which can 
                be incredibly motivating. So, why not give it a try? Who knows, 
                you might just discover a new passion for music!
            </p>}
            <div className="toggle-level">
                <button id="1" onClick={toggle}>Level 1</button>
                <button id="2" onClick={toggle}>Level 2</button>
                <button id="3" onClick={toggle}>Level 3</button>
                <button id="4" onClick={toggle}>Level 4</button>
                <button id="5" onClick={toggle}>Level 5</button>
            </div>
            {display === "1" && <Single />}
            {display === "2" && <p>Interval</p>}
            {display === "3" && <p>Chord</p>}
            {display === "4" && <p>Scale</p>}
            {display === "5" && <p>Progression</p>}
        </div>
    )
}

export default Eartraining