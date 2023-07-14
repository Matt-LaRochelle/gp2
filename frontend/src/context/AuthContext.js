import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null}
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    // Check if something is in local storage already
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        const validateUser = async () => {
            if (user) {
                // Check if the token is valid or invalid
                const response = await fetch('https://guitar-paths-api.onrender.com/api/score', {
                        headers: {
                            'Authorization': `Bearer ${user.token}`
                        }
                    })
                    const json = await response.json()
                    console.log(json)

                    if (response.ok) {
                        dispatch({ type: 'LOGIN', payload: user })
                    }
                    else {
                        dispatch({ type: 'LOGOUT', payload: null})
                    }
                }
            }
        validateUser()
    }, [])

    // back to normal code
    console.log('AuthContext state: ', state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}