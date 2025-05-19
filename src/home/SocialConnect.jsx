import { Box, Typography } from '@mui/material'
import React from 'react'
import LinkedIn from '../assets/linkedin.png'
import Instagram from '../assets/instagram.png'
import GitHUb from '../assets/github.png'
import Telegram from '../assets/telegram.png'

const SocialConnect = () => {
  return (
    <Box sx={{width: '100%', display:'flex', justifyContent: 'center', alignItems: 'center', padding: '5rem', boxSizing: 'border-box'}}>
        <Box sx={{display: 'flex', flexDirection: 'column', width: '70%', justifyContent:'center', alignItems:'center', gap: '5rem'}}>
            <Box sx={{textAlign:'center', display: 'flex', flexDirection: 'column', gap:3, width: '80%'}}>
                <Typography variant="h4" sx={{fontWeight: '800'}}>Welcome to Your Trusted News Hub</Typography>
                <Typography>Stay informed with reliable, up-to-date news from around the world. Whether it's politics, technology, entertainment, or local happenings — we've got you covered. Dive into stories that matter, engage in thoughtful discussions, and be part of a community that values truth and transparency.</Typography>
            </Box>
            <Box sx={{display:'flex', gap:'10rem'}}>
                <Box 
                    sx={{
                        borderRadius: '50%', 
                        padding: '1rem', 
                        boxShadow: '0px 2px 21px -10px #000000',
                        '&:hover' : {
                            boxShadow: '0px 12px 21px -10px #000000',
                            transition: '1s',
                            cursor: 'pointer'
                        }
                    }} 
                    onClick={()=>{window.open("https://www.linkedin.com/in/suraj-raut-software-developer", "_blank")}}>
                    <img src={LinkedIn}/>
                </Box>
                <Box 
                    sx={{
                        borderRadius: '50%', 
                        padding: '1rem', 
                        boxShadow: '0px 2px 21px -10px #000000',
                        '&:hover' : {
                            boxShadow: '0px 12px 21px -10px #000000',
                            transition: '1s',
                            cursor: 'pointer'
                        }
                    }} 
                    onClick={()=>{window.open("", "_blank")}}>
                    <img src={Instagram}/>
                </Box>
                <Box 
                    sx={{
                        borderRadius: '50%', 
                        padding: '1rem', 
                        boxShadow: '0px 2px 21px -10px #000000',
                        '&:hover' : {
                            boxShadow: '0px 12px 21px -10px #000000',
                            transition: '1s',
                            cursor: 'pointer'
                        }
                    }} 
                    onClick={()=>{window.open("https://github.com/Surajraut123", "_blank")}}>
                    <img src={GitHUb}/>
                </Box>
                <Box 
                    sx={{
                        borderRadius: '50%', 
                        padding: '1rem', 
                        boxShadow: '0px 2px 21px -10px #000000',
                        '&:hover' : {
                            boxShadow: '0px 12px 21px -10px #000000',
                            transition: '1s',
                            cursor: 'pointer'
                        }
                    }} 
                    onClick={()=>{window.open("", "_blank")}}>
                    <img src={Telegram}/>
                </Box>
            </Box>
        </Box>
      
    </Box>
  )
}

export default SocialConnect
