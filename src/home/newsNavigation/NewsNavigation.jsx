import { Box, Typography } from '@mui/material'
import React from 'react'
import NewsSlider from './NewsSlider';
const NewsNavigation = () => {
  return (
    <Box sx={{width:'100%', padding: '5rem', boxSizing: 'border-box'}}>
        <Box sx={{display:'flex', flexDirection: 'column', alignItems:'center', gap:'1rem'}}>
            <Typography variant="h3" sx={{fontWeight: '500'}}>Discover News Like Never Before</Typography>
            <Typography variant="h6">Your personalized gateway to the world of information. Explore our unique features designed to enhance your news reading experience.</Typography>
            <NewsSlider/>
        </Box>
    </Box>
  )
}

export default NewsNavigation
