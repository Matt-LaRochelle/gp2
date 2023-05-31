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
            <h2>Hello {user.email}</h2>
            
            <Single />
            <button onClick={handleClick}>What is a User?</button>
        </div>
    )
}

export default Eartraining