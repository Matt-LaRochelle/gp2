import './single.css'
import React, { useState, useEffect, useRef } from "react";

// Icons
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlinePlayCircle } from 'react-icons/ai';

// Sounds
import audioClip from '../../sounds/noteSounds';

// Components
import Loading from "../loading/Loading";
import Error from "../error/Error";
import SHelp from '../singleHelp/SingleHelp'
import SKey from '../singleKey/SingleKey'
import { sharpGuitarNotes, flatGuitarNotes } from './guitarNotes';

// Hooks
import { useAuthContext } from '../../hooks/useAuthContext'
import { useScoresContext } from '../../hooks/useScores'
import { useFetch } from "../../hooks/useFetch";

const Single = () => {
    //User information
    const { user } = useAuthContext()
    //Object of audio clips
    
    // fetch score
    const { isLoading, error: fetchError } = useFetch('score')
    //Database scores and client side rendering
    const {scores, dispatch} = useScoresContext()
    
    const audioClips = audioClip;
    //Which sound is being used
    const [sound, setSound] = useState(audioClips[29].clip);
    //Amount of tries
    const [count, setCount] = useState(4);
    //Name of note
    const [answer, setAnswer] = useState(["a"]);
    //Input radio answer
    const [inputText, setInputText] = useState("");
    //Renders green check mark or red x
    const [gotAnswer, setGotAnswer] = useState(null);
    //Follows in the app the best high score for current session
    const [highScore, setHighScore] = useState(0);
    //Set error if API sends one
    const [error, setError] = useState(null);
    //Render help screen
    const [help, setHelp] = useState(false)
    //Render key screen
    const [key, setKey] = useState(false)
    //Renders features for test user
    const [testUser, setTestUser] = useState(false)
    //For scrolling to key or help pages:
    const keyRef = useRef(null);
    const helpRef = useRef(null);
    const [noteNames, setNoteNames] = useState([
        "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#",
    ])
    const [sharp, setSharp] = useState(true)

    //Fetch data from database before loading rest of page
    // useEffect(() => {
    //     const fetchScores = async () => {
    //         const response = await fetch('https://guitar-paths-api.onrender.com/api/score', {
    //             headers: {
    //                 'Authorization': `Bearer ${user.token}`
    //             }
    //         })
    //         const json = await response.json()
    //         if (!response.ok) {
    //             setError(json.error)
    //         }
    //         if (response.ok) {
    //             setError(null)
    //             dispatch({type: 'SET_SCORES', payload: json})
    //         }
    //     }
    //     if (user) {
    //         fetchScores()
    //     }
        
    // }, [dispatch, user])

    // Check if the user is a test user - then set up page for a client
    useEffect(() => {
        const check = user.email
        if (check === "testuser@testing.user") {
            setTestUser(true)
        }
    }, [])

     // Function for resetting high score for test user
     const updateHighScore = async () => {
        let number = 0;
        let single = number
        const packageScore = {single}
        const response = await fetch('https://guitar-paths-api.onrender.com/api/score/' + scores[0]._id, {
            method: 'PATCH',
            body: JSON.stringify(packageScore),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setError(null)
            dispatch({type: 'UPDATE_SCORE', payload: json})
        }
    }

    // Toggle sharps and flats
    const sharpFlatToggle = () => {
        if (noteNames[1] === "A#") {
            setNoteNames([
                "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab",
            ])
            setSharp(false)
        } else {
            setNoteNames(["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#",])
            setSharp(true)
        }
    }

    // Toggle help screen
    const helpScreen = () => {
        setHelp(help => !help)
    }

    // Toggle key screen
    const keyScreen = () => {
        setKey(key => !key)
    }

    // Update db highscore
    useEffect(() => {
        const updateScore = async () => {
            if (scores !== null && highScore > scores[0].single) {
                const packageScore = {"single": highScore}
                const response = await fetch('https://guitar-paths-api.onrender.com/api/score/' + scores[0]._id, {
                    method: 'PATCH',
                    body: JSON.stringify(packageScore),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const json = await response.json()
                if (!response.ok) {
                    setError(json.error)
                }
                if (response.ok) {
                    setError(null)
                    dispatch({type: 'UPDATE_SCORE', payload: json})
                }
            }
        }
        updateScore()
    }, [gotAnswer, dispatch, highScore, scores, user.token])

    
   
    //Plays note of current state
    const play_note = () => {
        const note = new Audio(sound);
        note.play();
    }

    //Log which button is clicked
    function handleClick(event) {
        const newValue = event.target.value;
        console.log(newValue)
        setInputText(newValue);
    }


    //Main logic of the game
    function check_answer() {

        //First three tries:
        if (count > 1) {
            if (answer.includes(inputText.toLowerCase()) === true) {
                // setInputText("");
                setCount(4);

                // Get a new number
                const number = Math.floor(Math.random() * 37)
                setSound(audioClips[number].clip)
                setAnswer(audioClips[number].note_name);
                setHighScore(highScore => highScore + 1);
                setGotAnswer(true);
                setTimeout(() => {
                    setGotAnswer(null);
                }, 1000);
            
            } else if (answer.includes(inputText.toLowerCase()) !== true) {
                // setInputText("");
                setCount(count - 1);
                setGotAnswer(false);
                setTimeout(() => {
                    setGotAnswer(null);
                }, 1000);
            }
            
        } 
        // Last try:
        else if (count === 1) {
            if (answer.includes(inputText.toLowerCase()) === true) {
                // setInputText("");
                setCount(4);
                setHighScore(() => highScore + 1);
                setGotAnswer(true);
                setTimeout(() => {
                    setGotAnswer(null);
                }, 1000);

                 // Get a new number
                 const number = Math.floor(Math.random() * 37)
                 setSound(audioClips[number].clip)
                 setAnswer(audioClips[number].note_name);

            } else if (answer.includes(inputText.toLowerCase()) !== true) {
                // setInputText("");
                setCount(4);
                setHighScore(0);
                setGotAnswer(false);
                setTimeout(() => {
                    setGotAnswer(null);
                }, 1000);

                 // Get a new number
                 const number = Math.floor(Math.random() * 37)
                 setSound(audioClips[number].clip)
                 setAnswer(audioClips[number].note_name);
            }      
        }
    }

    return (
        <div className="singleContainer">
            <div>
                {isLoading 
                ?   <Loading />
                :   fetchError 
                    ?   <Error error={fetchError} /> 
                    :   <div className="singleScoresBanner">
                            <p>Tries: <span>{count}/4</span></p>
                            <p>Current: <span>{highScore}</span></p>
                            <p>High Score: <span>{scores[0].single}</span></p>
                        </div>
                }
                <button className="singlePlayButton" onClick={play_note}><AiOutlinePlayCircle /></button>
                <div className="singleNoteSelection">
                    <div className="string">
                        {sharpGuitarNotes[5].e.map((note) => (
                            <button className={note === inputText ? "highlightNote singleNote" : "singleNote"} value={note} onClick={handleClick}>
                                {note}
                            </button>
                            ))}
                    </div>
                    <div className="string">
                        {sharpGuitarNotes[4].B.map((note) => (
                            <button className={note === inputText ? "highlightNote singleNote" : "singleNote"} value={note} onClick={handleClick}>
                                {note}
                            </button>
                            ))}
                    </div>
                    <div className="string">
                        {sharpGuitarNotes[3].G.map((note) => (
                            <button className={note === inputText ? "highlightNote singleNote" : "singleNote"} value={note} onClick={handleClick}>
                                {note}
                            </button>
                            ))}
                    </div>
                    <div className="string">
                        {sharpGuitarNotes[2].D.map((note) => (
                            <button className={note === inputText ? "highlightNote singleNote" : "singleNote"} value={note} onClick={handleClick}>
                                {note}
                            </button>
                            ))}
                    </div>
                    <div className="string">
                        {sharpGuitarNotes[1].A.map((note) => (
                            <button className={note === inputText ? "highlightNote singleNote" : "singleNote"} value={note} onClick={handleClick}>
                                {note}
                            </button>
                            ))}
                    </div>
                    <div className="string">
                        {sharpGuitarNotes[0].E.map((note) => (
                            <button className={note === inputText ? "highlightNote singleNote" : "singleNote"} value={note} onClick={handleClick}>
                                {note}
                            </button>
                            ))}
                    </div>
                </div>
                <div className="guessContainer">
                    <button className="primary-button" onClick={check_answer}>Guess</button> 
                    { gotAnswer === true ? <AiOutlineCheckCircle className="singleCorrect"/> : null }
                    { gotAnswer === false ? <AiOutlineCloseCircle className="singleIncorrect"/> : null }
                </div>
                <div className="bottomButtons">
                    <button className={help ? "highlight raise" : null} onClick={helpScreen}>Help</button>
                    <button className={key ? "highlight raise" : null} onClick={keyScreen}>Key</button>
                    <button className={key ? "raise" : null} onClick={sharpFlatToggle}>#/b</button>
                </div>
                {testUser && 
                    <div className="test-features">
                        <p>This feature only available for the test user account.</p>
                        <p><strong>Answer: {answer}</strong></p>
                        <button onClick={updateHighScore}>Reset High Score</button>
                    </div>
                    }
            </div>
            {error && <div className="error">{error}</div>}
            {help ? <SHelp /> : null}
            {key ? <SKey type={sharp} /> : null}
        </div>
    )
}

export default Single