import { usePracticesContext } from "../hooks/usePracticesContext"
import { useAuthContext } from '../hooks/useAuthContext'
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const PracticeDetails = ({ practice }) => {
    const { dispatch } = usePracticesContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
        if (!user) {
            return
        }

        const response = await fetch('/api/practice' + practice._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_PRACTICE', payload: json})
        }
    }

    return (
        <div className="practice-details">
            <h4>{formatDistanceToNow(new Date(practice.createdAt), { addSuffix: true })}</h4>
            <p>{practice.entry}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default PracticeDetails