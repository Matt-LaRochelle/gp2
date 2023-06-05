import React, { useState, useEffect } from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import audioClip from '../sounds/noteSounds';

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

    //Log what is written in input
    function handleChange(event) {
        const newValue = event.target.value;
        setInputText(newValue);
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
        <div>
            <div>
                <h2>Single Note Identification Game</h2>
                <button onClick={play_note}>Play note</button>
                <button onClick={updateHighScore}>Update high score</button>
                <label >Tries: {count}, High Score: {highScore}, All Time High Score: {scores ? scores[0].single : null}</label>
                <input onChange={handleChange} type="text" value={inputText} />
                <button type="submit" onClick={check_answer}>Guess</button>
                { gotAnswer === true ? <AiOutlineCheckCircle /> : null }
                { gotAnswer === false ? <AiOutlineCloseCircle /> : null }
            </div>
            {error && <div className="error">{error}</div>}
        </div>
    )
}

export default Single