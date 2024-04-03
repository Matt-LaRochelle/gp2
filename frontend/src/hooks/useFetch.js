import { useState, useEffect } from 'react'
import { useAuthContext } from './useAuthContext'
import { useScoresContext } from './useScores'

export const useFetch = (path) => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const { user } = useAuthContext()
    const { dispatch } = useScoresContext()

    useEffect(() => {
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
        fetchInfo(path)
    }, [user.token])

    return { isLoading, error }
}