import { PracticesContext } from "../context/PracticeContext";
import { useContext } from 'react'

export const usePracticesContext = () => {
    const context = useContext(PracticesContext)

    if (!context) {
        throw Error('usePracticesContext must be used inside a PracticesContextProvider')
    }
    
    return context
}