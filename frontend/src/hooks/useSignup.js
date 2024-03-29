import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useSetup } from './useSetup'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const { dispatch } = useAuthContext()
    const { setup } = useSetup()

    const signup = async (email, password, fName, birthday) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('https://guitar-paths-api.onrender.com/api/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password, fName, birthday})
        })
        const json = await response.json()
        console.log(json)

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update the auth context
            dispatch({type: 'LOGIN', payload: json})

            // set new scores
            await setup(json)

            // back to normal code
            setIsLoading(false)
        }
    }
    return { signup, isLoading, error, emptyFields}
}