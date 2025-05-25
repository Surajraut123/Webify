import React, { useEffect, useRef, useState } from 'react'
import { Avatar, Box, Button, Grid2, Typography } from '@mui/material';
import LogoW from  "../assets/LogoW.png"
import SignInUp from './SignInUp.jsx';
import { useUser } from '@clerk/clerk-react';
import profile from '../assets/Profile.jpg'
import { useNavigate } from 'react-router-dom';
const LandingPage = (props) => {

    const [isSignInOpen, setIsSignInOpen] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);

    const { user } = useUser();
    const navigate = useNavigate()


    const [loggedIn, setLoggedIn] = useState(false)
    const authRef = useRef(null); 

    const handleAuthPage = (action) => {
        if(action == "signin") {    
            setIsSignInOpen(true)
            setIsSignUpOpen(false)
        } else{
            setIsSignUpOpen(true)
            setIsSignInOpen(false)
        }
    }
    console.log(user?.id)
    localStorage.setItem("userid", user?.id)

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (authRef.current && !authRef.current.contains(event.target)) {
            setIsSignInOpen(false);
            setIsSignUpOpen(false);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if(user)
            setLoggedIn(true)
    }, [user])

    const redirectToFree = () => {
        navigate("/feed")
    }
    
    return (
        <>
            
            <div ref={authRef}>
                <SignInUp signIn={isSignInOpen} signUp={isSignUpOpen}/>
            </div>
            <Box sx={{position: 'absolute', display: 'flex', gap: '1rem', right: '2rem', top: '1rem', zIndex:3}}>

                {!loggedIn ?
                
                    <>
                        <Button
                            sx={{
                                color: '#ffffff', 
                                border: '1px solid #ffffff'
                            }}
                            onClick={() => handleAuthPage("signup")}    
                            >Sign up
                        </Button>
                        <Button 
                            variant='outlined' 
                            sx={{
                                backgroundColor: '#ffffff', 
                                color: '#000000', 
                                p: 1, 
                                borderRadius: 2
                            }} 
                            onClick={() => handleAuthPage("signin")}    
                            >Log in
                        </Button>
                    </>
                    :

                    <Box sx={{display: 'flex', alignItems:'center', gap:1}}>
                        <Typography sx={{color:"white", fontWeight:"600"}}>Hello, {user?.primaryEmailAddress?.emailAddress}</Typography>
                        <Avatar src={profile}/>
                    </Box>
                }
            </Box>

            <Box>
                <Grid2 container alignItems="center">
                    <img src={LogoW} alt='loading...' style={{width: '10rem'}}/>
                    <Typography variant ='h3' sx={{fontFamily: 'Abril Fatface', color: '#ffffff', marginLeft: '-30px'}}>ebify</Typography>
                </Grid2>
            </Box>
            <Box sx={{color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '5rem', width: '100%'}}>
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '1rem', width: '50%'}}>
                    <Typography variant='h1' sx={{fontFamily: 'serif'}}>Your World, Your Feed</Typography>
                    <Typography variant='h4'>Don’t Just Read the News. Understand It.</Typography>
                    <Typography variant='p' sx={{fontSize: '1.4rem', textAlign:'center'}}>Webify is your personalized news hub — delivering the latest headlines from around the world, tailored to your interests. Choose your favorite categories, countries, topics, and languages to create a news experience that’s truly yours. With a fast, interactive interface and a clutter-free design, staying informed has never felt this easy or enjoyable.</Typography>
                </Box>

                <Box display="flex" gap='5rem'>
                    <Button variant="contained" sx={{ px: 4, py: 1.5, borderRadius: 2, backgroundColor: '#ffffff', color: '#000000'}} onClick={redirectToFree}>
                        Try Free
                    </Button>
                    <Button 
                        variant="outlined" 
                        sx={{ 
                            px: 4, 
                            py: 1.5, 
                            borderRadius: 3, 
                            backgroundColor: '#ffb812' 
                        }} 
                        onClick={() => { props.setPremium(true) }}>
                        Go Premium
                    </Button>
                </Box>

            </Box>
        </>
    )
}

export default LandingPage
