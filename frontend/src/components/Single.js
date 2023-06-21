import React, { useState, useEffect, useRef } from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import audioClip from '../sounds/noteSounds';
import SHelp from './SingleHelp'
import SKey from './SingleKey'

import { useAuthContext } from '../hooks/useAuthContext'
import { useScoresContext } from '../hooks/useScores'

const Single = () => {
    //Database scores and client side rendering
    const {scores, dispatch} = useScoresContext()
    //User information
    const { user } = useAuthContext()
    //Object of audio clips
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

    //Fetch data from database before loading rest of page
    useEffect(() => {
        const fetchScores = async () => {
            const response = await fetch('https://guitar-paths-api.onrender.com/api/score', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if (!response.ok) {
                setError(json.error)
            }
            if (response.ok) {
                setError(null)
                dispatch({type: 'SET_SCORES', payload: json})
            }
        }
        if (user) {
            fetchScores()
        }
        
    }, [dispatch, user])

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
        const response = await fetch('/api/score/' + scores[0]._id, {
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

    //Log which radio button is clicked
    function handleChange(event) {
        const newValue = event.target.value;
        setInputText(newValue);
    }

    //Display help screen
    function helpScreen() {
        setHelp(!help)
        if (help) {
            helpRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }

    //Effect for scrolling to help - must separate these two for faster performance
    useEffect(() => {
        if (helpRef.current) {
            helpRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [help])

    //Display key
    function keyScreen() {
        setKey(!key)
        if (key) {
            keyRef.current.scrollIntoView({ behavior: 'smooth' })
        } 
    }
    
    //Effect for scrolling to key
    useEffect(() => {
        if (keyRef.current) {
          keyRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, [key]);

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
        <div className="single-container">
            <div>
                <h2>Single Note Identification Game</h2>
                <div className="single-format">
                    <p className="primary">Correct: <span>{highScore}</span></p>
                    <p className="primary">High Score: <span>{!scores ? null : scores[0].single}</span></p>
                </div>
                
                <button className="primary-button" onClick={play_note}>Play Note</button>
                
                <div className="select-answer">
                    <div className="select-answer-format">
                        <input type="radio" id="A" name="note" value="A" onChange={handleChange}></input>
                        <label for="A">A</label>
                    </div>
                    <div className="select-answer-format">
                        <input type="radio" id="A#/Bb" name="note" value="A#" onChange={handleChange}></input>
                        <label for="A#/Bb">A#/Bb</label>
                    </div>
                    <div className="select-answer-format">
                        <input type="radio" id="B" name="note" value="B" onChange={handleChange}></input>
                        <label for="B">B</label>
                    </div>
                    <div className="select-answer-format">
                        <input type="radio" id="C" name="note" value="C" onChange={handleChange}></input>
                        <label for="C">C</label>
                    </div>
                    <div className="select-answer-format">
                        <input type="radio" id="C#/Db" name="note" value="C#" onChange={handleChange}></input>
                        <label for="C#/Db">C#/Db</label>
                    </div>
                    <div className="select-answer-format">
                        <input type="radio" id="D" name="note" value="D" onChange={handleChange}></input>
                        <label for="D">D</label>
                    </div>
                    <div className="select-answer-format">
                        <input type="radio" id="D#/Eb" name="note" value="D#" onChange={handleChange}></input>
                        <label for="D#/Eb">D#/Eb</label>
                    </div>
                    <div className="select-answer-format">
                        <input type="radio" id="E" name="note" value="E" onChange={handleChange}></input>
                        <label for="E">E</label>
                    </div>
                    <div className="select-answer-format">
                        <input type="radio" id="F" name="note" value="F" onChange={handleChange}></input>
                        <label for="F">F</label>
                    </div>
                    <div className="select-answer-format">
                        <input type="radio" id="F#/Gb" name="note" value="F#" onChange={handleChange}></input>
                        <label for="F#/Gb">F#/Gb</label>
                    </div>
                    <div className="select-answer-format">
                        <input type="radio" id="G" name="note" value="G" onChange={handleChange}></input>
                        <label for="G">G</label>
                    </div>
                    <div className="select-answer-format">
                        <input type="radio" id="G#/Ab" name="note" value="G#" onChange={handleChange}></input>
                        <label for="G#/Ab">G#/Ab</label>
                    </div>
                </div>
                <button className="primary-button" type="submit" onClick={check_answer}>Guess</button> 
                { gotAnswer === true ? <AiOutlineCheckCircle className="correct"/> : null }
                { gotAnswer === false ? <AiOutlineCloseCircle className="incorrect"/> : null }
                <div className="bottom-buttons">
                    <button onClick={helpScreen}>Help</button>
                    <p className="tries"><span className="primary">Tries: {count}</span></p>
                    <button onClick={keyScreen}>Key</button>
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
            {help ? <section ref={helpRef}><SHelp /> </section> : null}
            {key ? <section ref={keyRef}><SKey /></section> : null}
        </div>
    )
}

export default Single