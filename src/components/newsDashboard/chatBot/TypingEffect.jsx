import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Box, Typography } from '@mui/material';

const TypingEffect = ({ text, speed = 30 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayedText(prev => prev + text[currentIndex]);
      currentIndex++;
      if (currentIndex == text.length-1) clearInterval(interval);
    }, speed);
    return () => {clearInterval(interval)};
  }, [text, speed]);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
    >
      {displayedText}
    </ReactMarkdown>
  );
};

export default TypingEffect;
