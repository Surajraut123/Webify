import './App.css'
import SideBar from "./components/newsDashboard/sideBar/SideBar"
import Feed from "./components/newsDashboard/feed/Feed"
import RightBar from "./components/newsDashboard/rightbar/RightBar"
import Navbar from "./components/Navbar"
import {Box, createTheme, Stack, ThemeProvider} from "@mui/material"
import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./home/Home.jsx"
import Init from './init/Init.jsx'
import { useUser } from '@clerk/clerk-react'
import SignInUp from './home/SignInUp.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import ChatBotLauncher from './components/newsDashboard/chatBot/ChatBotLauncher.jsx'
import VoiceResponse from "./components/newsDashboard/VoiceResponse.jsx"
function App() {

  const [mode, setMode] = useState("light")
  const [preference, setPreference] = useState(true)
  const [isClickedFavouriteNews, setClickedFavouriteNews] = useState(false)

  const darkTheme = createTheme({
    palette:{
      mode: mode,
      primary: {
        main: '#145075'
      }
    }
  })

  const ProtectedRoute = ({children}) => {
    const {isLoaded, user} = useUser();
    if (!isLoaded) return null;

    if (!user) {
      return <SignInUp signIn={true} signUp={false}/>;
    }

    return children;
  }
  return (
      <BrowserRouter>
        <ThemeProvider theme={darkTheme}>
          <Box bgcolor={"background.default"} color={"text.primary"}>

            {!preference && (
              <Routes>
                <Route path="/" element={<Init event={setPreference} />} />
              </Routes>
            )}
            {preference && (
              <Routes>
                <Route path="/" element={<Box><Home /></Box>} />
                <Route path="/feed" element={
                  <ProtectedRoute>
                      <>
                        <Navbar favNews={setClickedFavouriteNews}/>
                        <Provider store={store}>
                          <Stack direction="row" spacing={2} justifyContent="space-between">
                            <SideBar setMode={setMode} mode={mode} />
                            <Feed favNewsEvent={isClickedFavouriteNews} handleFavNews={setClickedFavouriteNews}/>
                            <RightBar />
                          </Stack>
                          <ChatBotLauncher/>
                          {/* <VoiceResponse/> */}
                        </Provider>
                      </>
                  </ProtectedRoute>
                  } 
                />
              </Routes>
            )}
          </Box>
        </ThemeProvider>
      </BrowserRouter>

  )
}

export default App
