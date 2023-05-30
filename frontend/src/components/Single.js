import React, { useState } from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import audioClip from '../sounds/noteSounds';

const Single = () => {

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
    const [dbHighScore, setDbHighScore] = useState(0);

    const play_note = () => {
        const note = new Audio(sound);
        note.play();
    }

    //Function for logging what is written in input
    function handleChange(event) {
        const newValue = event.target.value;
        setInputText(newValue);
    }

    //Main logic of the game
    function check_answer() {

        //First three tries:
        if (count > 1) {
            console.log(inputText);
            if (answer.includes(inputText.toLowerCase()) === true) {
                setInputText("");
                setCount(4);

                // Get a new number
                const number = Math.floor(Math.random() * 37)
                setSound(audioClips[number].clip)
                setAnswer(audioClips[number].note_name);
                
                setGotAnswer(true);
                setHighScore(highScore + 1);
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
                setHighScore(highScore + 1);
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
            <p>
                Learning to identify notes by ear is an essential skill 
                for any musician, and it's also a lot of fun! It can 
                help you to play music more confidently and accurately, 
                and can also improve your ability to improvise and compose. 
                Additionally, it can make listening to music more enjoyable 
                as you start to notice the nuances and subtleties in the 
                melodies and harmonies. Don't be intimidated by the idea of 
                ear training - it's a skill that can be developed with 
                practice and patience. With each note you're able to recognize, 
                you'll feel a sense of accomplishment and progress, which can 
                be incredibly motivating. So, why not give it a try? Who knows, 
                you might just discover a new passion for music!
            </p>
            <div>
                    <h2>Single Note Identification Game</h2>
                    <button onClick={play_note}>Play note</button>
                    <label >Tries: {count}</label>
                    <input onChange={handleChange} type="text" value={inputText} />
                    <button type="submit" onClick={check_answer}>Guess</button>
                    { gotAnswer === true ? <AiOutlineCheckCircle /> : null }
                    { gotAnswer === false ? <AiOutlineCloseCircle /> : null }
                </div>
        </div>
    )
}

export default Single