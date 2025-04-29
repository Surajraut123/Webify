import { Avatar, Button, LinearProgress, Typography } from '@mui/material'
import { Box, Grid } from '@mui/system'
import React, { useEffect, useState } from 'react'
import Sections from './Sections'
import Logo from  "../assets/WebLogo.png"
import Profile from  "../assets/Profile.jpg"
import emoji from '../assets/emoji.gif'
import { useNavigate } from 'react-router-dom'

const Init = (props) => {

    const[prefNumber, setPrefNumber] = useState(0);
    const navigate = useNavigate();

    const handlePreference = () => {
        setPrefNumber(prev => prev + 1);
    }

    const handleSkip = () => {
        props.event(true)
        console.log("in skip");
        
    }
    const steps = [
        { heading: "Topics", entity: "Categories" },
        { heading: "Preferred News Type", entity: "NewsType" },
        { heading: "Languages", entity: "Language" },
        { heading: "Country", entity: "Country" },
        { heading: "Notifications", entity: "Notifications" },
    ];

    useEffect(() => {
        if(prefNumber == steps.length) {
            setTimeout(() => {
                navigate("/feed")
            }, [5000])
        }
    }, [prefNumber])
      
  return (
    <Box 
        sx={{
            width: '100%', 
            background: 'linear-gradient(#fff7f7, #437797)', 
            display: 'flex', 
            alignItems: 'center', 
            height: '100vh', 
            borderRadius: '0rem 0rem 1rem 1rem', 
            overflow: 'hidden',
            flexDirection: 'column',
            gap:5
        }}>
            <Avatar src={Profile} sx={{position: 'absolute', right: '2rem', top: '2rem'}}/>
            <Grid container alignItems="center">
                <img src={Logo} alt='loading...' style={{width: '10rem'}}/>
                <Typography variant ='h3' sx={{fontFamily: 'Abril Fatface', color: '#000000', marginLeft: '-30px'}}>ebify</Typography>
            </Grid>
        <Box 
            sx={{
                width: '40%', 
                height: '50%', 
                backgroundColor: '#ffffff', 
                borderRadius: 5,
                position: 'relative', 
                boxSizing: 'border-box'
            }}>

            { (prefNumber < steps.length) ? (
                <>
                    <Box 
                        sx={{
                            background: '#145075', 
                            borderRadius: '1rem 1rem 0rem 0rem', 
                            padding: 2, 
                            height: '10%', 
                            display: 'flex', 
                            alignItems: 'center'
                        }
                    }>
                        <Typography sx={{color: '#ffffff', fontSize: '1.5rem'}}>Select Preferences</Typography>
                    </Box>
                    <Box sx={{padding: 2, overflow: 'auto', backgroundColor: '#ffffff', height: '60%'}}>  
                        {steps[prefNumber] && (
                            <Sections 
                                heading={steps[prefNumber].heading}
                                entity={steps[prefNumber].entity}
                            />
                        )}
                    </Box>   
                    <Box sx={{position: 'absolute', bottom: 10, right: 20, display: 'flex', gap: 2, alignItems: 'center'}}>
                        <Button sx={{borderRadius: 5, fontSize: 18, ":hover": {backgroundColor : '#e9e9e9'}}} onClick={handleSkip}>Skip</Button>
                        <Button variant="contained" sx={{borderRadius: 5, fontSize: 18}} onClick={handlePreference}>Next</Button>
                    </Box>
                </>
            ) : 
            
                <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', height: '100%', marginTop: '2rem'}}>
                    <img src={emoji} style={{width: '4rem', marginBottom :'3rem'}}/>
                    <Typography variant='h4'>Personalizing Your Feed</Typography>
                    <Typography variant='h6'>Getting Things Ready...</Typography>
                    <LinearProgress sx={{width: '70%', marginTop: '3rem'}}/>
                </Box>
            }
        </Box>
    </Box>  
  )
}

export default Init
