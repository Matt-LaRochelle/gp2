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
    
    const handleClick = () => {
        console.log(scores.single)
    }


    return (
        <div className="home">
        <div>
            <h2>Scores:</h2>
            <p onClick={handleClick}>Single notes: {scores.single}</p>
        </div>
        <div>
            Hello {user.email}
        </div>
        <h2>Practice Journal</h2>
        <h2>Today is {date}</h2>
        
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