import Single from '../components/Single'
import { useAuthContext } from '../hooks/useAuthContext'


const Eartraining = () => {

const { user } = useAuthContext()

const handleClick = () => {
    console.log(user)
}
    return (
        <div className="eartraining">
            <h1>Ear Training</h1>
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
            </p>
            <Single />
        </div>
    )
}

export default Eartraining