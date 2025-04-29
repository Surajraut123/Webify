import { Box, Grid2, Stack, Typography } from '@mui/material'
import React from 'react'
import Logo from  "../assets/LogoW.png"
const Footer = () => {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#27282f', width: '100%', boxSizing: 'border-box'}}>
        <Box sx={{display:'flex', gap: '10rem', color: '#ffffff', height:'80%', p: 10, boxSizing: 'border-box'}}>
            <Box sx={{display:'flex', flexDirection:'column', gap: '1rem'}}>
                <Grid2 container alignItems="center">
                    <img src={Logo} alt='loading...' style={{width: '10rem'}}/>
                    <Typography variant ='h3' sx={{fontFamily: 'Abril Fatface', color: '#ffffff', marginLeft: '-30px'}}>ebify</Typography>
                </Grid2>
                <Typography>The Ultimate platform in news Industry</Typography>
            </Box>
            <Stack>
                <Typography sx={{fontWeight: '800', mb: 1}}>Quick Links</Typography>
                <Stack>
                    <Typography sx={{color: '#83868d', cursor:'pointer'}}>Home</Typography>
                    <Typography sx={{color: '#83868d', cursor:'pointer'}}>Courses</Typography>
                    <Typography sx={{color: '#83868d', cursor:'pointer'}}>DevChallenge</Typography>
                    <Typography sx={{color: '#83868d', cursor:'pointer'}}>Labs</Typography>
                    <Typography sx={{color: '#83868d', cursor:'pointer'}}>Contact</Typography>
                </Stack>
            </Stack>
            <Stack>
                <Typography sx={{fontWeight: '800', mb: 1}}>Legal</Typography>
                <Stack>
                    <Typography sx={{color: '#83868d', cursor:'pointer'}}>Privacy Policy</Typography>
                    <Typography sx={{color: '#83868d', cursor:'pointer'}}>Terms of Use</Typography>
                    <Typography sx={{color: '#83868d', cursor:'pointer'}}>Refund & Cancellation Policy</Typography>
                </Stack>
            </Stack>
            <Stack>
                <Typography sx={{fontWeight: '800', mb: 1}}>GET IN TOUCH</Typography>
                <Stack>
                    <Typography sx={{color: '#83868d'}}>surajrauy347@gmail.com</Typography>
                </Stack>
            </Stack>
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20%', width: '100%', p: 5, boxSizing: 'border-box', borderTop: '1px solid #38393b'}}>
            <Typography sx={{color: '#ffffff'}}>Copyright © 2025 Suraj Raut developers. All Rights Reserved.</Typography>
        </Box>
    </Box>
  )
}

export default Footer
