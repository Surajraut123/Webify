import React, { useState, useRef, useEffect } from 'react';

import { Box, Fab, Paper, Slide, Typography, TextField, IconButton, ClickAwayListener, LinearProgress } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import SendIcon from '@mui/icons-material/Send';
import SpeechRecognizer from './SpeechRecognizer';
import ReactMarkDown from 'react-markdown'
import { useDispatch, useSelector } from 'react-redux';
import { userAiChats } from '../../../redux/newsDataSlice';
import 'highlight.js/styles/github.css'; 
import TypingEffect from "./TypingEffect"


const ChatBotLauncher = () => {
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi there! How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);
  const dispatch = useDispatch();
  const userChats = useSelector((state) => state.newsData.userChat)
  const [loader, setLoader] = useState(false)

  const [isVoiceOn, setVoiceOn] = useState(false);
  const [voiceInput, setVoiceInput] = useState('');

  useEffect(() => {
    // setLoader(true)
    const getChat = async () => {
      try {
        const chats = await fetch("http://localhost:5000/ai/get/chat/12345678",{
          method: "GET",
          headers: {
            "Content-type" : "application/json"
          }
        })
  
        if(chats.ok) {
          const chatData = await chats.json();
          dispatch(userAiChats(chatData.messages))
          setLoader(false)
        }
      } catch (error) {
        console.log("Response error : ", error)
      }
    }

    if(userChats.length == 0) {
      getChat()
    }
  }, [])

  const handleSend = async () => {
    setLoader(true)
    if (!input.trim()) return;
    try {
      setMessages([...messages, { from: 'user', text: input }]);
      const response = await fetch("http://localhost:5000/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userInput: input
        })
      });
      


      if(response) {
        const newMessage = await response.json()
        console.log("New Message : ", newMessage)
        dispatch(userAiChats(newMessage))
        setLoader(false)

      }
    } catch (error) {
      console.error("Gemni error : ", error)
    }
    setInput('');
  };

  useEffect(() => {
    if (isVoiceOn) {
      setInput(voiceInput);
    }
  }, [isVoiceOn, voiceInput]); 
  
  useEffect(() => {
    if (isVoiceOn && input === voiceInput) {
      handleSend();
    }
  }, [input]);

  const handleClickAway = () => {
    if (open) setOpen(false);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [userChats, open, loader]);
  return (
    <>
      <Box sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1300 }}>
        <Fab
          color="primary"
          aria-label="chat"
          onClick={() => setOpen((prev) => !prev)}
          sx={{
            animation: 'pulse 2s infinite',
            '@keyframes pulse': {
              '0%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(1.1)' },
              '100%': { transform: 'scale(1)' },
            },
          }}
        >
          <ChatIcon />
        </Fab>
      </Box>

      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Box sx={{ position: 'fixed', bottom: 90, right: 20, width: 420, zIndex: 1300 }}>
          <ClickAwayListener onClickAway={handleClickAway}>
            <Paper elevation={6} sx={{ borderRadius: 3, p: 2, height: 600, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" gutterBottom>
                🤖 Webify Assistant
              </Typography>
              <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 1, px: 1, '&::-webkit-scrollbar': { display: 'none' }}} >
                
                {userChats.length > 0 ? 
                  userChats.map((data, index) => (
                    <Box key={index}>
                      <Box sx={{ textAlign: 'right', mb: 1}}>
                        <Typography
                          variant="body2"
                          sx={{
                            display: 'inline-block',
                            px: 1.5,
                            py: 1,
                            borderRadius: 2,
                            bgcolor:  'grey.300',
                            color:  'black',
                            textAlign: 'left',
                            width: 'auto',
                            maxWidth: '80%'
                          }}
                          >
                            {data?.user}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'left', mb: 1}}>
                        <Typography
                          variant="body2"
                          sx={{
                            display: 'inline-block',
                            px: 1.5,
                            py: 1,
                            borderRadius: 2,
                            bgcolor:  '#145075', 
                            color:  '#ffffff',
                          }}
                          >
                            {
                              // responseFlag ?  
                              // (<TypingEffect text={data?.ai} responseComplete={setResponseFlag}/>)
                              // :
                              <ReactMarkDown>{data?.ai}</ReactMarkDown>
                            }
                        </Typography>
                      </Box>
                    
                    </Box>
                ))
                :
                  <Box sx={{ textAlign: 'left', mb: 1}}>
                      <Typography
                        variant="body2"
                        sx={{
                          display: 'inline-block',
                          px: 1.5,
                          py: 1,
                          borderRadius: 2,
                          bgcolor:  '#145075',
                          color:  '#ffffff',
                          textAlign: 'left',
                          width: 'auto',
                          maxWidth: '80%'
                        }}
                        >
                          Hey there! How can I help you?
                      </Typography>
                    </Box>
                }
                <div ref={bottomRef} />
                {loader && <LinearProgress/>}
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: '10px' }}>
                <SpeechRecognizer setVoiceOn={setVoiceOn} setVoiceInput={setVoiceInput}/>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Type a message"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSend();
                  }}
                  sx={{
                    width: '80%'
                  }}
                />
                <IconButton color="primary" onClick={handleSend} sx={{width: '20%'}}>
                  <SendIcon />
                </IconButton>
              </Box>
            </Paper>
          </ClickAwayListener>
        </Box>
      </Slide>
    </>
  );
}

export default ChatBotLauncher;