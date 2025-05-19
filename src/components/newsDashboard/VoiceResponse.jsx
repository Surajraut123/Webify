import { Box } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import AudioGIF from "../../assets/audio.gif";

function TextToSpeech() {
    const incomingText = "Okay, Im here to help. To give you the best assistance, I need a little more information. Please tell me  What are you trying to do? (e.g., write a story, solve a math problem, find a recipe, learn about a topiWhat is the problem you are facing? (e.g., writer's block, can't understand a concept, need help finding ingredientWhat have you tried already? This helps me avoid suggesting things you've already donIs there anything specific you want me to do? (e.g., brainstorm ideas, provide code examples, give step-by-step instructionThe more details you give me, the better I can understand your situation and provide helpful adviceHere are some general areas I can help with:nformation Retrieval: Finding information on the interneWriting: Brainstorming, outlining, drafting, editinProblem Solving: Helping you break down problems and find solutionsearning: Explaining concepts, providing resources, creating study plansreative Tasks: Generating ideas, writing poetry, composing musiTechnical Tasks: Providing code snippets, debugging code'm ready to listen and help in any way I can. Just let me know what you need.";
  const [text, setText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [allWords, setAllWords] = useState([]);
  const wordsRef = useRef([]);
  const charOffsets = useRef([]);

  useEffect(() => {
    if (!incomingText) return;

    // Set and process new text
    setText(incomingText);

    const words = incomingText.split(/(\s+)/); // Split by word, keep spaces
    setAllWords(words);

    const offsets = [];
    let offset = 0;
    for (let word of words) {
      offsets.push(offset);
      offset += word.length;
    }
    charOffsets.current = offsets;
    wordsRef.current = words;

    // Auto speak new incoming text
    speak(incomingText);
  }, [incomingText]);

  const speak = (textToSpeak) => {
    if (!window.speechSynthesis) {
      alert("Text-to-speech not supported.");
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const charIndex = event.charIndex;
        const wordIndex = charOffsets.current.findIndex(
          (offset, i) =>
            charIndex >= offset && charIndex < offset + wordsRef.current[i].length
        );
        if (wordIndex !== -1) setCurrentWordIndex(wordIndex);
      }
    };

    utterance.onend = () => {
      setCurrentWordIndex(-1);
    };

    window.speechSynthesis.speak(utterance);
  };

  return (
    <Box sx={{
      position: 'absolute',
      top: '10%',
      left: '25%',
      background: "#05001e",
      padding: '2rem',
      textAlign: 'center',
      borderRadius: '20px',
      height: '70%',
      width: '50%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflowY: 'auto'
    }}>
      <Box sx={{
        width: '50%',
        borderRadius: '50px',
        overflow: 'hidden',
        boxShadow: '0px -1px 61px -30px white',
        height: '50%',
        marginBottom: '1rem'
      }}>
        <img src={AudioGIF} alt="Speaking" style={{ width: "100%", height: "100%" }} />
      </Box>

      <Box sx={{ color: '#ffffff', fontSize: '1rem', lineHeight: '1.6', textAlign: 'left' }}>
        {allWords.map((word, index) => (
          <span
            key={index}
            style={{
              backgroundColor: index === currentWordIndex ? 'yellow' : 'transparent',
              color: index === currentWordIndex ? 'black' : 'white'
            }}
          >
            {word}
          </span>
        ))}
      </Box>
    </Box>
  );
}

export default TextToSpeech;
