import sharps from './Sharps.png'
import flats from './Flats.png'

const SKey = () => {
    return (
        <div className="key">
            <hr></hr>
            <h2>Sharps:</h2>
            <img src={sharps} alt="notes on the guitar using naturals and sharps" />
            <h2>Flats:</h2>
            <img src={flats} alt="notes on the guitar using naturals and flats" />
        </div>
    )
}

export default SKey