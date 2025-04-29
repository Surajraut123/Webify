import { Avatar, Box, CircularProgress, Divider, ImageList, ImageListItem, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import itemData from './ImageList'

const THE_NEWS_API_KEY = import.meta.env.VITE_THE_NEWS_API_KEY;
const RightBar = () => {


  const [loading, setLoading] = useState(true)

  const url = `https://api.thenewsapi.com/v1/news/top?locale=us&language=en&limit=6&api_token=${THE_NEWS_API_KEY}`

  const[topNews, setTopNews] = useState([])

  useEffect(() => {
    const fetchTheNewsApi = async () => {
      try {
        const response = await fetch(url)
        if(response.ok) {
          const data = await response.json();
          setTopNews(data)
          setLoading(false)
        } else{
          const errorData = await response.json();
          console.log("Error : ", errorData)
        }
      } catch (error) {
        console.error(error)
        setLoading(true)
      }
    }
    fetchTheNewsApi();
  } , [])

  const handleRedirect = (type, url) => {
    if(type == "newsUrl") {
      window.open(url, '_blank')
    } else{
      window.open("https://"+url, "_blank")
    }
}


  return (
    <Box flex={2} p={2} sx={{ display: { xs:"none", sm: "block", width: '20%', height:'85vh' }}}>
      <Box sx={{width: '100%', position:"sticky", left:0, top: '5rem', height:'100%'}}>

        <Typography variant='h6' fontWeight={100} mt={2} mb={2} sx={{height: '5%'}}>Latest News</Typography>

        <ImageList cols={3} gap={5} sx={{height: '15%', overflow:'hidden'}}>
          {topNews?.data?.map((item, index) => (
            <ImageListItem key={index}>
              <img
                src={item.image_url}
                alt="loading"
                loading="lazy"
              />
            </ImageListItem>
          ))}
          {loading && <CircularProgress />}
        </ImageList>

        <Typography variant='h6' fontWeight={100} mt={2} sx={{height: '5%'}}>Top news</Typography>
        <Box sx={{overflowY:"auto", height: '75%'}}>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {
              topNews?.data?.map((item, index) => (
                <ListItem alignItems="flex-start" key={index}>
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography 
                        onClick={() => handleRedirect("newsUrl", item.url)} 
                        variant='p'
                        sx={{
                            '&:hover':{
                              cursor:'pointer',
                              textDecoration: 'underline'
                            }
                        }}
                        >{item.title}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ 
                            color: 'text.primary', 
                            display: 'inline' ,
                            '&:hover':{
                              cursor:'pointer',
                              textDecoration: 'underline'
                            }
                          }}
                          onClick={() => handleRedirect("source", item.source)}
                        >
                          {item?.source}
                        </Typography>
                        <Typography variant='p'>
                          {item?.description}
                        </Typography>
                      </>
                    }
                    sx={{textOverflow: 'ellipsis'}}
                  />
                </ListItem>
              ))
            }

            {loading && <CircularProgress />}
          </List>

        </Box>

      </Box>
    </Box>
  )
}

export default RightBar
