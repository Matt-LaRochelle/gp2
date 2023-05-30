import { createContext, useReducer } from 'react'

export const PracticesContext = createContext()

export const practicesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PRACTICES':
            return {
                practices: action.payload
            }
        case 'CREATE_PRACTICE':
            return {
                practices: [action.payload, ...state.practices]
            }
        case 'DELETE_PRACTICE':
            return {
                practices: state.practices.filter((p) => p._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const PracticesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(practicesReducer, {
        practices: null
    })

    return (
        <PracticesContext.Provider value={{...state, dispatch}}>
            { children }
        </PracticesContext.Provider>
    )
}