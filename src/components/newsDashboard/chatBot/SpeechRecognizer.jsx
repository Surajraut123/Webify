import { IconButton } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import MicIcon from '@mui/icons-material/Mic';

const SpeechRecognizer = () => {
  const recognitionRef = useRef(null);

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
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    recognition.onend = () => {
      console.log('Speech recognition ended, restarting...');
      recognition.start(); // auto-restart
    };

    recognitionRef.current = recognition;
  }, []);

  const startListening = () => {
    recognitionRef.current?.start();
    console.log('Listening...');
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    console.log('Stopped listening.');
  };

  return (
    <IconButton color="primary" sx={{borderRadius: '50%', border: '1px solid #d3d3d3', marginRight: '1rem'}} onClick={startListening}>
      <MicIcon/>
    </IconButton>
  );
};

export default SpeechRecognizer;
