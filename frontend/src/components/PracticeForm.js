import { usePracticesContext } from "../hooks/usePracticesContext"
import { useAuthContext } from "../hooks/useAuthContext"
const { useState } = require("react")


const PracticeForm = () => {
    const { dispatch } = usePracticesContext()
    const { user } = useAuthContext()
    
    const [entry, setEntry] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const practiceEntry = {entry}

        const response = await fetch('/api/practice', {
            method: 'POST',
            body: JSON.stringify(practiceEntry),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setEntry('')
            setError(null)
            console.log('new journal entry added', json)
            dispatch({type: 'CREATE_PRACTICE', payload: json})
        }
    }
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Journal Entry</h3>

            <label>Entry:</label>
            <input
                type="text"
                onChange={(e) => setEntry(e.target.value)}
                value={entry}
                // className={emptyFields.includes('title') ? 'error' : ''}
            />

            <button>Add Entry</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default PracticeForm