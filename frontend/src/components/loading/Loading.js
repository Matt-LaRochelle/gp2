import './loading.css'
import PacmanLoader from "react-spinners/PacmanLoader";

const Loading = () => {
    return (
        <div className="loadingScreenContainer">
            <div className='loadingDisplay'>   
                <div className='loadingContent'>
                    <PacmanLoader className="loadingIcon" color="var(--correct)" />
                    <p>Fetching data from server...</p>
                    <p>This process tends to take 5-60 seconds</p>
                </div> 
            </div>
        </div>
    )
}

export default Loading