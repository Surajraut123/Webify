import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import HomeCard from './HomeCard';

const NewsSlider = ({ newsData }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);
  const scrollSpeed = 0.5; // pixels per frame - reduced for slower movement

  useEffect(() => {
    let animationFrameId;
    let lastTimestamp;

    const animate = (timestamp) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;

      if (elapsed > 16) { // approximately 60fps
        if (!isHovered) {
          setScrollPosition(prev => {
            const newPosition = prev + scrollSpeed;
            // Reset position when it reaches the end
            return newPosition >= containerRef.current?.scrollWidth ? 0 : newPosition;
          });
        }
        lastTimestamp = timestamp;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        padding: '20px 0',
        '&:hover': {
          cursor: 'grab'
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '20px',
          transform: `translateX(-${scrollPosition}px)`,
          transition: isHovered ? 'transform 0.3s ease' : 'none',
          willChange: 'transform'
        }}
      >
        {newsData.map((news, index) => (
          <HomeCard key={index} data={news} />
        ))}
      </Box>
    </Box>
  );
};

export default NewsSlider; 