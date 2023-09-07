import './tuner.css'
import Navbar from '../../components/navbar/Navbar'

const Tuner = () => {
    return (
        <div className="tunerPageContainer">
            <Navbar className="navbarComp" />
            <div className="tunerContainer">
            <div className='tunerTop'>
                <h1>b</h1><h1>#</h1>
            </div>
            <div className='tunerMiddle'>
                {/* <div className='tunerCurrentNote'>
                    <p>E</p>
                </div> */}
                <h2>Coming soon...</h2>
            </div>

            <div className="tunerBottom">
                <div className="tunerPegNamesLeft">
                    <p>D</p><p>A</p><p>E</p>
                </div>
                <div className="tunerPegNamesRight">
                    <p>G</p><p>B</p><p>E</p>
                </div>
                <img className="tunerHeadstock" src="https://static.vecteezy.com/system/resources/previews/009/383/457/original/guitar-head-clipart-design-illustration-free-png.png" />
            </div>
            </div>
        </div>
    )
}

export default Tuner