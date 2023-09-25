import './tuner.css'
import Navbar from '../../components/navbar/Navbar'
import React, { useEffect, useRef, useState } from 'react';

const Tuner = () => {
    const audioContext = useRef(null);
    const analyserNode = useRef(null);
    const microphoneNode = useRef(null);
    const [currentNote, setCurrentNote] = useState(0);

    useEffect(() => {
        // Create the audio context
        audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
    
        // Create the analyser node
        analyserNode.current = audioContext.current.createAnalyser();
    
        // Set up the microphone node
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then((stream) => {
            microphoneNode.current = audioContext.current.createMediaStreamSource(stream);
            
            // Connect the microphone node to the analyser node
            microphoneNode.current.connect(analyserNode.current);
          })
          .catch((error) => {
            console.error('Error accessing microphone:', error);
          });
      }, []);

    
    
      useEffect(() => {
        const updateTuningInfo = () => {
            // Get the frequency data from the analyser node
            const bufferLength = analyserNode.current.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            analyserNode.current.getByteFrequencyData(dataArray);
      
            // Find the index of the highest amplitude in the frequency data
            let maxAmplitudeIndex = 0;
            let maxAmplitude = dataArray[0];
            for (let i = 1; i < bufferLength; i++) {
                if (dataArray[i] > maxAmplitude) {
                maxAmplitude = dataArray[i];
                maxAmplitudeIndex = i;
                }
            }

            // Calculate the dominant frequency
            const sampleRate = audioContext.current.sampleRate;
            const frequency = maxAmplitudeIndex * (sampleRate / bufferLength);

            // Map the frequency to the closest note name
            const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
            const closestNote = notes[Math.round(notes.length * Math.log2(frequency / 440) % 12)];

            setCurrentNote(closestNote);
        };
      
        // Set up a timer to periodically update the tuning information
        const timerId = setInterval(updateTuningInfo, 100);
      
        // Clean up the timer when the component unmounts
        return () => clearInterval(timerId);
      }, []);



    

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
                <h2>{currentNote}</h2>
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