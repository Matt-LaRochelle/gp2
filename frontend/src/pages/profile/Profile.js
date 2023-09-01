import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
// import { useScoresContext } from '../hooks/useScores'
import './profile.css'
import Navbar from '../../components/navbar/Navbar'
import Loading from '../../components/loading/Loading'
import Error from '../../components/error/Error'

const Profile = () => {
    // const {scores, dispatch: scoresDispatch} = useScoresContext()
    const { user } = useAuthContext()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [linkSent, setLinkSent] = useState(false)

    // useEffect(() => {
    //     const fetchScores = async () => {
    //         const response = await fetch('https://guitar-paths-api.onrender.com/api/score', {
    //             headers: {
    //                 'Authorization': `Bearer ${user.token}`
    //             }
    //         })
    //         const json = await response.json()

    //         if (response.ok) {
    //             scoresDispatch({type: 'SET_SCORES', payload: json})
    //             console.log(json)
    //         }
    //     }

    //     if (user) {
    //         fetchScores()
    //         console.log("user:", user)
    //     }
        
    // }, [scoresDispatch, user])

    const handleResetPassword = async () => {
        setIsLoading(true)
        const response = await fetch('https://guitar-paths-api.onrender.com/api/user/forgot', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: user.email})
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError("There was an error: " + json.error)
        }
        if (response.ok) {
            const text = JSON.stringify(json)
            console.log("got things back: " + text)
            setLinkSent(true)
            setIsLoading(false)
            setError(false)
        }
    }



    let bDay = new Date(Date.parse(user.birthday));
    const options = { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' };
    const formattedDate = bDay.toLocaleDateString('en-US', options);
    
    return (
        <div className="profileContainer">
            <Navbar />
            {isLoading && <Loading />}
            {error && <Error error={error}/>}
            <div className="profileContentContainer">
                <div>
                    <label>First name:</label>
                    <p>{user.fName}</p>
                    <label>Email:</label>
                    <p>{user.email}</p>
                    <label>Birthday:</label>
                    <p>{formattedDate}</p>
                    {/* <p>Reset password: <button>Reset</button></p> */}
                </div>
                {/* <div className="profile-scores">
                    <h3>Scores:</h3> <h4> </h4>
                    <p>Single notes: </p><p>{scores && scores[0].single}</p>
                    <p>Intervals: </p><p>{scores && scores[0].interval}</p>
                    <p>Chords: </p><p>{scores && scores[0].chord}</p>
                    <p>Scales: </p><p>{scores && scores[0].scale}</p>
                    <p>Progressions: </p><p>{scores && scores[0].progression}</p>
                </div> */}
            </div>
            <button className="resetPassword" onClick={handleResetPassword}>Reset password</button>
            {linkSent && <div className="resetPasswordResponse">A reset link has been sent to your email.</div> }
        </div>
    )
}

export default Profile