import { Box, Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import React, { useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import PublicIcon from '@mui/icons-material/Public';
import CategoryIcon from '@mui/icons-material/Category';
import ListItemCom from './ListItemCom'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkApplyFilterTriggered } from '../../../redux/newsDataSlice';
const SideBar = ({mode, setMode}) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const applyFilteredTrigger = useSelector((state) => state.newsData.applyFilterTriggered)
  const [newsType, setNewsType] = useState('top-headlines');

  return (
    <Box flex={1} p={2} sx={{ display: { xs:"none", sm: "block", width: '30%' }, background: '#efefef'}}>
      <Box sx={{width: '100%', position:"sticky", left:0, top: '5rem', height: '90vh', overflowY:"auto", overflowX:'hidden'}}>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/")}> 
              <ListItemIcon>
                <HomeIcon/> 
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton> 
          </ListItem>
          
          <ListItemCom label="Language" icon={<GTranslateIcon/>} sx={{overflow:'scroll'}}/>
          <ListItemCom label="Country" icon={<PublicIcon/>}/> 
          <ListItemCom label="Categories" icon={<CategoryIcon/>}/> 

          <ListItem disablePadding>
            <ListItemButton sx={{display:"block"}}>
              <Typography sx={{marginBottom:'1rem'}}>Browse by</Typography>
              <ToggleButtonGroup
                value={newsType}
                exclusive
                onChange={(event, newValue) => {
                  if (newValue !== null) setNewsType(newValue);
                }}
                aria-label="News Type"
              >
                <ToggleButton value="top-headlines" sx={{fontSize: '0.8rem'}}>Top Headlines</ToggleButton>
                <ToggleButton value="everything" sx={{fontSize: '0.8rem'}}>Everything</ToggleButton>
                <ToggleButton value="sources" sx={{fontSize: '0.8rem'}}>Sources</ToggleButton>
              </ToggleButtonGroup>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component="a" href='#mode'>
              <ListItemIcon>
                <ModeNightIcon/>
              </ListItemIcon>
              <Switch onChange={(e) => setMode(mode === "light"? "dark" : "light")}/>
            </ListItemButton>
          </ListItem>

        </List>
        <Button 
          variant='contained' 
          sx={{
            position: 'absolute', 
            bottom:20, 
            width: '100%', 
            background:"#145075"
          }}
          onClick={()=>dispatch(checkApplyFilterTriggered(applyFilteredTrigger))}
        > Apply Filters
        </Button>
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