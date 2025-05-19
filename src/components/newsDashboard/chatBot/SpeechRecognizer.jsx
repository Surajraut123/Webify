import { Box, IconButton } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import MicIcon from '@mui/icons-material/Mic';
import Lisetener from "../../../assets/AiListener.gif"

const SpeechRecognizer = ({setVoiceOn, setVoiceInput}) => {
  const recognitionRef = useRef(null);
  const isListeningRef = useRef(false);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech Recognition not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim();
      console.log('You said:', transcript);
      setVoiceInput(transcript)
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    recognition.onend = () => {
      console.log('Speech recognition ended.');
      if (isListeningRef.current) {
        console.log('Restarting recognition...');
        recognition.start();
      }
    };

    recognitionRef.current = recognition;
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListeningRef.current) {
      isListeningRef.current = true;
      recognitionRef.current.start();
      console.log('Started listening...');
      setVoiceOn(true)
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListeningRef.current) {
      isListeningRef.current = false;
      recognitionRef.current.stop();
      console.log('Stopped listening.');
      setVoiceOn(false)
    }
  };

  return (
    !isListeningRef.current ?
      (<IconButton 
        color="primary" 
        sx={{ border: '1px solid #d3d3d3', marginRight: '1rem'}} 
        onClick={startListening}
      >
         <MicIcon />
      </IconButton>
      )
      : 
      (<Box sx={{width: '20%', cursor:'pointer'}} onClick={stopListening}>
        <img src={Lisetener} style={{width:'100%', borderRadius: '50%', overflow: 'hidden'}}/>
      </Box>)
  );
};

export default SpeechRecognizer;
