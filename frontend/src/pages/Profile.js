import { useEffect } from 'react'
import { usePracticesContext } from '../hooks/usePracticesContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useScoresContext } from '../hooks/useScores'
import { format } from 'date-fns'

// components
import PracticeDetails from '../components/PracticeDetails'
import PracticeForm from '../components/PracticeForm'

const Profile = () => {
    const {practices, dispatch} = usePracticesContext()
    const {scores, dispatch: scoresDispatch} = useScoresContext()
    const { user } = useAuthContext()
    
    useEffect(() => {
        const fetchPractices = async () => {
            const response = await fetch('/api/practice', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_PRACTICES', payload: json})
                console.log(json)
            }
        }

        if (user) {
            fetchPractices()
        }
    }, [dispatch, user])

    useEffect(() => {
        const fetchScores = async () => {
            const response = await fetch('/api/score', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                scoresDispatch({type: 'SET_SCORES', payload: json})
                console.log(json)
            }
        }

        if (user) {
            fetchScores()
        }
        
    }, [scoresDispatch, user])

    let date = format(new Date(), 'EEEE, MMMM do, yyyy')

    
    return (
        <div className="profile">
            <div className="profile-header">
                <div>
                    <p>{date}</p>
                    <p>Hello {user.email}!</p>
                </div>
                <div className="profile-scores">
                    <h3>Scores:</h3> <h4> </h4>
                    <p>Single notes: </p><p>{scores && scores[0].single}</p>
                    <p>Intervals: </p><p>{scores && scores[0].interval}</p>
                    <p>Chords: </p><p>{scores && scores[0].chord}</p>
                    <p>Scales: </p><p>{scores && scores[0].scale}</p>
                    <p>Progressions: </p><p>{scores && scores[0].progression}</p>
                </div>
            </div>
            
            
            <h2>Practice Journal</h2>
            
            <div className="home">
                <div className="practices">
                        {practices && practices.map((practice) => (
                            <PracticeDetails key={practice._id} practice={practice} />
                        ))}
                    </div>
                    <PracticeForm />
            </div> 
        </div>
    )
}

export default Profile