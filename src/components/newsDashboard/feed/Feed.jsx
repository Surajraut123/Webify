import {Box, CircularProgress, Typography} from '@mui/material'
import React, { useEffect, useState } from 'react'
import Post from './Post'
import InfiniteScroll from 'react-infinite-scroll-component';
import DateObject from 'react-date-object';
import ReplyIcon from '@mui/icons-material/Reply';
import { useDispatch, useSelector } from 'react-redux';
import { appendNews, appendFavNews, pageNumber } from '../../../redux/newsDataSlice';

const PAGE_SIZE = 20;
const NEWS_KEY = import.meta.env.VITE_NEWS_API_KEY
const END_POINT=import.meta.env.VITE_URL_END_POINT

const Feed = ({favNewsEvent, handleFavNews}) => {

  const currentPage = useSelector((state) => state.newsData.pageNumber)
  const [page, setPage] = useState(currentPage == 0 ? 1 : currentPage);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [renderFavTab, toRenderFavTab] = useState(false)

  const dispatch = useDispatch();
  let newsd = []
  if(favNewsEvent) {
    newsd = useSelector((state) => state.newsData.favNewsObject); 
  } else {
    newsd = useSelector((state) => state.newsData.newsObject);
  }

  const fetchData = async (pageNum)=>{
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    const url = `https://newsapi.org/v2/everything?q=tesla&from=${formattedDate}&sortBy=publishedAt&pageSize=${PAGE_SIZE}&page=${pageNum}&language=en&apiKey=${NEWS_KEY}`;
    
    try {
      const response = await fetch(url);
      if(response.ok) {
        let data = await response.json();
        if (data.length < PAGE_SIZE) {
          setHasMore(false);
        } 
        setLoading(false)
        dispatch(appendNews(data.articles))
      } else{
        const errorData = await response.json();
        setNews({ message: errorData.message || "Something went wrong" });
      }
    } catch (error) {
      setHasMore(false)
      console.error("While fetching newsApi", error.message)
    }

  }

  useEffect(() => {

    if(!favNewsEvent) return;

    const fetchFavNews = async () => {
      try {
        const response = await fetch(`http://${END_POINT}/api/fav?userid=680741baa2cf06d6d97b0500`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json'
          }
        })
  
        if(response.ok) {
          const favNewsData = await response.json()
          dispatch(appendFavNews(favNewsData))
          setLoading(false)
        } else{
          console.log("Error while Fetching favourite news")
          setLoading(true)
        }
      } catch (error) {
        console.error("Fav News Fetching Error : ", error)
        setLoading(true)
      }
    }

    fetchFavNews()
  }, [favNewsEvent, renderFavTab])  

  useEffect(() => {
    if(!favNewsEvent) {
      setLoading(true)
      if(page !== currentPage) {
        fetchData(page);
      } 
    }
  }, [page]);

  const handleBackButton = () => {
    handleFavNews(false)
  }

  useEffect(() => {localStorage.removeItem("currentPage")}, [])

  return (
    <Box flex={4} sx={{display: 'flex', alignItems: 'center', justifyContent:'center', flexDirection: 'column', marginTop:'1rem', width: '50%'}}>
      {favNewsEvent && 
      <Box sx={{display:'flex', alignItems:'center', width: '100%', borderBottom: '1px solid #d9d9d9' }}>
        <ReplyIcon sx={{position:'absolute', padding: '0.8rem', borderRadius: '50%', "&:hover": {background: '#d9d9d9', cursor:'pointer'}}} onClick={handleBackButton}/>
        <Typography sx={{textAlign:'center', width: '100%', padding: '1rem 0rem'}} variant='h5'>Your Favourite News</Typography>
      </Box>  
      }
      {loading && newsd.length == 0 && <CircularProgress />}
      <InfiniteScroll
        dataLength={newsd?.length}
        next={() => setPage((prev) => prev + 1)}
        hasMore={hasMore}
        loader={<h4>{newsd?.message}</h4>}
        endMessage={<p style={{ textAlign: 'center' }}><b>No more results</b></p>}
      > 
        { newsd && 
          <Typography variant="h5" sx={{width: '70%', fontFamily: 'sans-serif', textAlign:'center'}}> {!newsd?.message}</Typography> 
          && 
          newsd.length>0 
          &&
          newsd.map((item, index) => {
            const data = favNewsEvent ? item.data : item;
            return (
              <Post 
                key={index} 
                author={data?.author} 
                published={data?.publishedAt} 
                urlToImage={data?.urlToImage}
                headline={data?.content} 
                description={data?.description}
                title={data?.title}
                urlToReDirect={data?.url}
                newsData={data}
                isOpenFavourite={favNewsEvent}
                setFavNewsClicked={toRenderFavTab}
              />

            )
          })

        }
      </InfiniteScroll>

      
    </Box>
  )
}

export default Feed
