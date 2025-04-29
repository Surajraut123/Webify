import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch } from '@mui/material'
import React, { useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import PublicIcon from '@mui/icons-material/Public';
import CategoryIcon from '@mui/icons-material/Category';
import ListItemCom from './ListItemCom'
import { useNavigate } from 'react-router-dom';
const SideBar = ({mode, setMode}) => {

      const[filters, setFilters] = useState({
          lang: [],
          country: [],
          category: []
      })

  return (
    <Box flex={1} p={2} sx={{ display: { xs:"none", sm: "block", width: '30%' }}}>
      <Box sx={{width: '100%', position:"sticky", left:0, top: '5rem'}}>
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href='/'>
              <ListItemIcon>
                <HomeIcon/> 
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton> 
          </ListItem>
          
          <ListItemCom label="Language" setFilters={setFilters} icon={<GTranslateIcon/>} sx={{overflow:'scroll'}}/>
          <ListItemCom label="Country" setFilters={setFilters} icon={<PublicIcon/>}/> 
          <ListItemCom label="Categories" setFilters={setFilters} icon={<CategoryIcon/>}/> 

          <ListItem disablePadding>
            <ListItemButton component="a" href='#mode'>
              <ListItemIcon>
                <ModeNightIcon/>
              </ListItemIcon>
              <Switch onChange={(e) => setMode(mode === "light"? "dark" : "light")}/>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  )
}

export default SideBar

// All articles mentioning Apple from yesterday, sorted by popular publishers first
// https://newsapi.org/v2/everything?q=apple&from=2025-04-09&to=2025-04-09&sortBy=popularity&apiKey=fe44a453b1e84678842ccaa7a0c0276d

// All articles about Tesla from the last month, sorted by recent first
// https://newsapi.org/v2/everything?q=tesla&from=2025-03-10&sortBy=publishedAt&apiKey=fe44a453b1e84678842ccaa7a0c0276d

// Top business headlines in the US right now
// https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=fe44a453b1e84678842ccaa7a0c0276d

// Top headlines from TechCrunch right now
// https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=fe44a453b1e84678842ccaa7a0c0276d

// All articles published by the Wall Street Journal in the last 6 months, sorted by recent first
// https://newsapi.org/v2/everything?domains=wsj.com&apiKey=fe44a453b1e84678842ccaa7a0c0276d


// category
// Find sources that display news of this category. Possible options: business, entertainment, general, health, science, sports, technology. Default: all categories.

// language
// Find sources that display news in a specific language. Possible options: ardeenesfrheitnlnoptrusvudzh. Default: all languages.

// country
// Find sources that display news in a specific country. Possible options: aearataubebgbrcachcncocuczdeegfrgbgrhkhuidieilinitjpkrltlvmamxmyngnlnonzphplptrorsrusasesgsiskthtrtwuausveza. Default: all countries.