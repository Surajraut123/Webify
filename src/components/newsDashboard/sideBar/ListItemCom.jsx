import React, { useState } from 'react'
import { Box, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Filter from './Filter'
const ListItemCom = ({label, icon, setFilters}) => {

    
  const[visibility, setVisibility] = useState(false)


  const handleFilterVisibillity = () => {
    setVisibility((prev) => !prev)
  }


  return (
    <ListItem disablePadding >
        
        <Box sx={{p:1, position: 'relative', width: '100%'}}>
            <ListItemButton 
                component="a" 
                href='#language' 
                sx={{ 
                  position: 'relative', 
                  width: '100%', 
                  display: 'flex', 
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                onClick={handleFilterVisibillity}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', width:'100%' }}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                    {icon}
                </ListItemIcon>   
                <ListItemText primary={label} />
                </Box>

                <KeyboardArrowDownIcon sx={{ position: 'absolute', right: 0 }} />
            </ListItemButton>

            {visibility && <Filter entity={label} setFilters={setFilters}/>}
        </Box>
    </ListItem>
  )
}

export default ListItemCom