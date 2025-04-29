import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import Filter from '../components/newsDashboard/sideBar/Filter'
const Sections = ({heading, entity}) => {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap:3}}>
        <Typography sx={{fontSize: "1.5rem"}}>{heading}</Typography>
        <Filter entity={entity}/>   
    </Box>
  )
}

export default Sections
