import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useScoresContext } from './useScores'

export const useFetch = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { user } = useAuthContext()
    const { dispatch } = useScoresContext()

    const fetchInfo = async (path) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('https://guitar-paths-api.onrender.com/api/' + path, {
            'Authorization': `Bearer ${ user.token }`
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // update the auth context
            dispatch({type: 'SET_SCORES', payload: json})
            setIsLoading(false)
        }
    }

    return { fetchInfo, isLoading, error }
}