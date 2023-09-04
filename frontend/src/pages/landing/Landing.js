import './landing.css'
import { Link } from 'react-router-dom'

const Landing = () => {

    return (
        <div className="landingContainer">
            <div className="landingCircle" />
            <div className="landingTitle">
                <h1>Ear Training</h1>
                <h1>Buddy</h1>
            </div>
            <div className="landingButtons">
                <Link to="/login"><button>Sign in</button></Link>
                <Link to="/signup"><button>Register</button></Link>
            </div>
        </div>
    )
}

export default Landing