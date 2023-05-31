import { useEffect } from 'react'
import { usePracticesContext } from '../hooks/usePracticesContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useScoresContext } from '../hooks/useScores'

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
            }
        }

        if (user) {
            fetchScores()
        }
    }, [scoresDispatch, user])

    return (
        <div className="home">
        <h2>Scores:</h2>
        <p>Single notes: {scores.single}</p>
            <div className="practices">
                {practices && practices.map((practice) => (
                    <PracticeDetails key={practice._id} practice={practice} />
                ))}
            </div>
            <PracticeForm />
        </div>
    )
}

export default Profile