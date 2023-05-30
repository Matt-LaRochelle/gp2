import { useEffect } from 'react'
import { usePracticesContext } from '../hooks/usePracticesContext'
import { useAuthContext } from '../hooks/useAuthContext'

// components
import PracticeDetails from '../components/PracticeDetails'
import PracticeForm from '../components/PracticeForm'

const Profile = () => {
    const {practices, dispatch} = usePracticesContext()
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

    return (
        <div className="home">
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