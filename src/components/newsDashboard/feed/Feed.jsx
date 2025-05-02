import {Box, CircularProgress, Typography} from '@mui/material'
import React, { useEffect, useState } from 'react'
import Post from './Post'
import InfiniteScroll from 'react-infinite-scroll-component';
import ReplyIcon from '@mui/icons-material/Reply';
import { useDispatch, useSelector } from 'react-redux';
import { appendNews, appendFavNews } from '../../../redux/newsDataSlice';

const PAGE_SIZE = 20;
const END_POINT=import.meta.env.VITE_URL_END_POINT

const Feed = ({favNewsEvent, handleFavNews}) => {

  const currentPage = useSelector((state) => state.newsData.pageNumber)
  const [page, setPage] = useState(currentPage == 0 ? 1 : currentPage);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [renderFavTab, toRenderFavTab] = useState(false)
  const [errorMessage, setErrorMessage] = useState('false')

  const newsSelector = useSelector((state) => state.newsData.filters)

  // News API Not supporting multiple values to filter for one parameter
  // const language = newsSelector?.language?.map((value) => {
  //   return value.code
  // })    
  // const country = newsSelector?.country?.map((value) => {
  //   return value.code
  // })    
  // const category = newsSelector?.category?.map((value) => {
  //   return value.code
  // })    

  const language = newsSelector?.language?.[0]?.code || '';
  const country = newsSelector?.country?.[0]?.code || '';
  const category = newsSelector?.categories?.[0]?.code || '';

  const dispatch = useDispatch();
  const applyFilteredBtnTrigger = useSelector((state) => state.newsData.applyFilterTriggered)

  let newsd = []
  if(favNewsEvent) {
    newsd = useSelector((state) => state.newsData.favNewsObject); 
  } else {
    newsd = useSelector((state) => state.newsData.newsObject);
  }

  const fetchData = async (pageNum)=>{ 
    try {

      const params = new URLSearchParams({
        pageSize: PAGE_SIZE,
        pageNum: pageNum
      });

      if (language) params.append("language", language);
      if (country) params.append("country", country); 
      if (category) params.append("category", category); 
      console.log(`http://${END_POINT}/feed/news?${params.toString()}`)
      const response = await fetch(`http://${END_POINT}/feed/news?${params.toString()}`, {
        method:"GET",
        headers: {
          "Content-type" : 'application/json'
        }
      });
      if(response.ok) {
        const data = await response.json()
        if (data.length < PAGE_SIZE) {
          setHasMore(false);
        } 
        setLoading(false)
        dispatch(appendNews(data.articles || data.sources))
      } else{
        const error = await response.json()
        console.log("error : ", error)
        setErrorMessage({ message: error.message || "Something went wrong" });
      }
    } catch (error) {
      setHasMore(false)
      console.error("While fetching newsApi", error.message)
    }

  }
  // console.log("Newsd : ", newsd)
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
      // if(page !== currentPage) {
        fetchData(page);
      // } else{
        // console.log("in else")
      // }
    }
  }, [page, applyFilteredBtnTrigger]);

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
      {loading && 

        (newsd.length == 0 && 
          <>
            <CircularProgress /> 
            <Typography 
              variant="h5" 
              sx={{
                  width: '70%', 
                  fontFamily: 'sans-serif',
                  textAlign:'center'
              }}> {errorMessage?.message}
            </Typography> 
          </>
        )
      }
      <InfiniteScroll
        dataLength={newsd?.length}
        next={() => setPage((prev) => prev + 1)}
        hasMore={hasMore}
        loader={<h4>{newsd?.message}</h4>}
        endMessage={<p style={{ textAlign: 'center' }}><b>No more results</b></p>}
      > 
        { newsd && 
          <Typography variant="h5" sx={{width: '70%', fontFamily: 'sans-serif', textAlign:'center'}}> {!errorMessage?.message}</Typography> 
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
