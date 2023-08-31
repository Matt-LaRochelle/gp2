// import { useEffect } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
// import { useScoresContext } from '../hooks/useScores'
import { format } from 'date-fns'
import './profile.css'
import Navbar from '../../components/navbar/Navbar'

const Profile = () => {
    // const {scores, dispatch: scoresDispatch} = useScoresContext()
    const { user } = useAuthContext()

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

    // let bDay = user.birthday
    // const birth = bDay.split('T')[0]
    // console.log("b:", birth)


    // let date = format(birth, 'MMMM do, yyyy')
    // console.log("d:", date)
    // let date = format((bDay), 'MMMM do, yyyy')

    let bDay = new Date(Date.parse(user.birthday));
    const options = { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' };
    const formattedDate = bDay.toLocaleDateString('en-US', options);

    console.log(formattedDate); // Output: January 1, 1991
    
    return (
        <div className="profileContainer">
            <Navbar />
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
            <button className="resetPassword">Reset password</button>
        </div>
    )
}

export default Profile