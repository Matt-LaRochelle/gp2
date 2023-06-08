import { useState } from 'react'
import { useScoresContext } from './useScores'
import { useAuthContext } from "./useAuthContext"

export const useSetup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useScoresContext()

    const setup = async (jSon) => {
        setIsLoading(true)
        setError(null)
        console.log("step 1")
        console.log(jSon)

        const response = await fetch('https://guitar-paths-api.onrender.com/api/score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jSon.token}`
            },
            body: JSON.stringify({single: 0, interval: 0, chord: 0, scale: 0, progression: 0})
        })
        const json = await response.json()
        console.log("step 2")

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // update the auth context
            dispatch({type: 'CREATE_SCORES', payload: json})

            setIsLoading(false)
        }
    }

    return { setup, isLoading, error}
}