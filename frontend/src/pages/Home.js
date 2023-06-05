import { useSetup } from '../hooks/useSetup'

const Home = () => {
    const {setup} = useSetup()

    const setScores = () => {
        console.log("let's go!")
        setup();
    }

    return (
        <div>
            <button onClick={setScores}>Set the scores</button>
        </div>
    )
}

export default Home