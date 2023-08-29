import './error.css'

const Error = ({error}) => {
    return (
        <div className='errorScreenContainer'>
            <div className='errorDisplay'>
                <div className='errorContent'>
                    <p>{error}</p>
                </div>
            </div>
        </div>
    )
}

export default Error