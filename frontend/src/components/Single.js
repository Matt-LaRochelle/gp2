import React, { useState, useEffect } from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import audioClip from '../sounds/noteSounds';
import SHelp from './SHelp'
import SKey from './SKey'

import { useAuthContext } from '../hooks/useAuthContext'
import { useScoresContext } from '../hooks/useScores'

const Single = () => {
    const {scores, dispatch} = useScoresContext()
    const { user } = useAuthContext()

    //Object of audio clips
    const audioClips = audioClip;

    //Which sound is being used
    const [sound, setSound] = useState(audioClips[29].clip);
    //Amount of tries
    const [count, setCount] = useState(4);
    //Name of note
    const [answer, setAnswer] = useState(["a"]);
    //Input text answer
    const [inputText, setInputText] = useState("");
    //Green check mark or red x
    const [gotAnswer, setGotAnswer] = useState(null);
    //Follows in the app the best high score today
    const [highScore, setHighScore] = useState(0);
    const [error, setError] = useState(null);
    const [help, setHelp] = useState(false)
    const [key, setKey] = useState(false)

    //Fetch data from database before loading rest of page
    useEffect(() => {
        const fetchScores = async () => {
            const response = await fetch('/api/score', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_SCORES', payload: json})
                console.log("only happens on load page:", json)
            }
        }

        if (user) {
            fetchScores()
        }
        
    }, [dispatch, user])

    // Update db highscore
    useEffect(() => {
        const updateScore = async () => {
            if (highScore > scores[0].single) {
                console.log('High!');
                const packageScore = {"single": highScore}
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
                    console.log('new score updated', json)
                    dispatch({type: 'UPDATE_SCORE', payload: json})
                }
            }
        }
        updateScore()
    }, [gotAnswer])

    // Function for resetting high score for debugging purposes
    const updateHighScore = async () => {
        let number = 2;
        console.log("New number generated: _______=___________--->", number)
        console.log("ID of the mongodb file:", scores[0]._id)
        let single = number
        const packageScore = {single}
        console.log("Data being sent to backend:", packageScore)
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
            console.log('new score updated', json)
            dispatch({type: 'UPDATE_SCORE', payload: json})
        }
    }

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
    }

    //Display key
    function keyScreen() {
        setKey(!key)
    }

    //Main logic of the game
    function check_answer() {

        //First three tries:
        if (count > 1) {
            if (answer.includes(inputText.toLowerCase()) === true) {
                setInputText("");
                setCount(4);

                // Get a new number
                const number = Math.floor(Math.random() * 37)
                setSound(audioClips[number].clip)
                setAnswer(audioClips[number].note_name);
                setGotAnswer(true);
                setHighScore(highScore => highScore + 1);
                setTimeout(() => {
                    setGotAnswer(null);
                }, 1000);
            
            } else if (answer.includes(inputText.toLowerCase()) !== true) {
                setInputText("");
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
                setInputText("");
                setCount(4);
                setGotAnswer(true);
                setHighScore(() => highScore + 1);
                setTimeout(() => {
                    setGotAnswer(null);
                }, 1000);

                 // Get a new number
                 const number = Math.floor(Math.random() * 37)
                 setSound(audioClips[number].clip)
                 setAnswer(audioClips[number].note_name);

            } else if (answer.includes(inputText.toLowerCase()) !== true) {
                setInputText("");
                setCount(4);
                setGotAnswer(false);
                setHighScore(0);
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
                    <p>Correct: {highScore}</p>
                    <p>High Score: {scores ? scores[0].single : null}</p>
                </div>
                
                <button onClick={play_note}>Play note</button>
                {/* <button onClick={updateHighScore}>Update high score</button> */}
                {/* <input onChange={handleChange} type="text" value={inputText} /> */}
                <div className="select-answer">
                    <div className="select-answer-format">
                        <input type="radio" id="A" name="note" value="A" onChange={handleChange}></input>
                        <label for="A">A</label>
                    </div>
                    <div className="select-answer-format">
                        <input type="radio" id="A#/Bb" name="note" value="A#/Bb" onChange={handleChange}></input>
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
                        <input type="radio" id="C#/Db" name="note" value="C#/Db" onChange={handleChange}></input>
                        <label for="C#/Db">C#/Db</label>
                    </div>
                    <div className="select-answer-format">
                        <input type="radio" id="D" name="note" value="D" onChange={handleChange}></input>
                        <label for="D">D</label>
                    </div>
                    <div className="select-answer-format">
                        <input type="radio" id="D#/Eb" name="note" value="D#/Eb" onChange={handleChange}></input>
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
                        <input type="radio" id="F#/Gb" name="note" value="F#/Gb" onChange={handleChange}></input>
                        <label for="F#/Gb">F#/Gb</label>
                    </div>
                    <div className="select-answer-format">
                        <input type="radio" id="G" name="note" value="G" onChange={handleChange}></input>
                        <label for="G">G</label>
                    </div>
                    <div className="select-answer-format">
                        <input type="radio" id="G#/Ab" name="note" value="G#/Ab" onChange={handleChange}></input>
                        <label for="G#/Ab">G#/Ab</label>
                    </div>
                </div>
                <button type="submit" onClick={check_answer}>Guess</button> 
                <div className="bottom-buttons">
                    <button onClick={helpScreen}>Help</button>
                    <p className="tries">Tries: {count}</p>
                    <button onClick={keyScreen}>Key</button>
                </div>
                
                
                
                { gotAnswer === true ? <AiOutlineCheckCircle className="correct"/> : null }
                { gotAnswer === false ? <AiOutlineCloseCircle className="incorrect"/> : null }
            </div>
            {error && <div className="error">{error}</div>}
            {help ? <SHelp /> : null}
            {key ? <SKey /> : null}
        </div>
    )
}

export default Single