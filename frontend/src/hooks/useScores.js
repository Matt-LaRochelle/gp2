import { ScoresContext } from "../context/ScoreContext";
import { useContext } from 'react'

export const useScoresContext = () => {
    const context = useContext(ScoresContext)

    if (!context) {
        throw Error('useScoresContext must be used inside a ScoresContextProvider')
    }
    
    return context
}