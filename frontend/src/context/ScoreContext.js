import { createContext, useReducer } from 'react'

export const ScoresContext = createContext()

export const scoresReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SCORES':
            return {
                scores: action.payload
            }
        case 'CREATE_SCORES':
            return {
                scores: [action.payload, ...state.scores]
            }
        case 'UPDATE_SCORE':
            return {
                scores: [action.payload]
            }
        case 'DELETE_SCORES':
            return {
                scores: state.scores.filter((s) => s._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const ScoresContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(scoresReducer, {
        scores: null
    })

    return (
        <ScoresContext.Provider value={{...state, dispatch}}>
            { children }
        </ScoresContext.Provider>
    )
}