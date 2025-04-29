import { Box } from '@mui/material'
import React from 'react'
import newsData from './navigation.json';
import HomeCard from '../HomeCard'
const NewsSlider = () => {
  return (
    <Box sx={{width:'80%', overflowX:'scroll', display:'flex', gap:'2rem', scrollBehavior: 'smooth'}} >
      {
        newsData &&
        newsData.articles.map((object, index) => (
          <Box sx={{minWidth: '12rem', flexShrink: 0}}  key={index}>
            <HomeCard data={object}/>
          </Box>
        ))
      }
    </Box>
  )
}

export default NewsSlider