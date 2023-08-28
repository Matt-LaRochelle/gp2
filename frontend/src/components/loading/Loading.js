import './loading.css'

const Loading = () => {
    return (
        <div className="loadingScreenContainer">
            <div className='loadingDisplay'>
                <h4>Password must include</h4>
                <ul>
                    <li>One upper case</li>
                    <li>One lower case</li>
                    <li>One number</li>
                    <li>One special character</li>
                    <li>Be at least 8 characters long</li>
                </ul>
            </div>
        </div>
    )
}

export default Loading