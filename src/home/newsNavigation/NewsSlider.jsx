import { Box } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import HomeCard from '../HomeCard'

const NewsSlider = () => {
  const [newsData, setNewsData] = useState();
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const pageNumber = useRef(1);
  const scrollPosition = useRef(0);
  const scrollSpeed = 1; // pixels per frame

  const currentPage = pageNumber.current;

  useEffect(() => {
    const getNewsDetails = async () => {
      try {
        const response = await fetch(`https://newsdata.io/api/${currentPage}/latest?language=en&apikey=pub_3a3a51ab5f59496da60c5841c613a9d1&q=social`, {
          method: "GET",
          headers: {
            "Content-type" : "application/json"
          }
        })
  
        if(response.ok) {
          const data = await response.json();
          setNewsData(data?.results)
        }
      } catch (error) {
        console.error("Error : ", error)
      }
    }

    getNewsDetails()
  }, [])

  const animate = () => {
    if (!isHovered) {
      scrollPosition.current += scrollSpeed;
      if (scrollRef.current) {
        scrollRef.current.style.transform = `translateX(-${scrollPosition.current}px)`;
      }
    }
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered]);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        height: '35rem',
        backgroundColor: 'rgba(0, 0, 0, 0.02)',
        borderRadius: '12px',
        '&:hover': {
          cursor: 'grab'
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box
        ref={scrollRef}
        sx={{
          display: 'flex',
          gap: '2rem',
          height: '100%',
          padding: '1rem',
          position: 'relative',
          transition: 'transform 0.1s linear',
          '&::before, &::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '100px',
            zIndex: 1,
            pointerEvents: 'none'
          },
          '&::before': {
            left: 0,
            background: 'linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0))'
          },
          '&::after': {
            right: 0,
            background: 'linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0))'
          }
        }}
      >
        {/* First set of cards */}
        {newsData &&
          newsData.map((object, index) => (
            <Box 
              sx={{
                minWidth: '20rem',
                flexShrink: 0,
                maxHeight: '30rem',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                }
              }}  
              key={index}
            >
              <HomeCard data={object}/>
            </Box>
          ))
        }
        {/* Duplicate set of cards for seamless loop */}
        {newsData &&
          newsData.map((object, index) => (
            <Box 
              sx={{
                minWidth: '20rem',
                flexShrink: 0,
                maxHeight: '30rem',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                }
              }}  
              key={`duplicate-${index}`}
            >
              <HomeCard data={object}/>
            </Box>
          ))
        }
      </Box>
    </Box>
  )
}

export default NewsSlider