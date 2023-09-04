import './landing.css'
import { Link } from 'react-router-dom'

const Landing = () => {

    return (
        <div className="lContainer">
            <div className="lCircle" />
            <div className="lTitle">
                <h1>Ear Training</h1>
                <h1>Buddy</h1>
            </div>
            <div className="lButtons">
                <Link to="/login"><button>Sign in</button></Link>
                <Link to="/signup"><button>Register</button></Link>
            </div>
        </div>
    )
}

export default Landing