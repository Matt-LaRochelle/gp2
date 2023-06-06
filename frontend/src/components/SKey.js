import sharps from './Sharps.png'
import flats from './Flats.png'

const SKey = () => {
    return (
        <div className="key">
            <hr></hr>
            <h2>Sharps:</h2>
            <img src={sharps} />
            <h2>Flats:</h2>
            <img src={flats} />
        </div>
    )
}

export default SKey