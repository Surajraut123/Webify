import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, IconButton, useTheme } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import PublicIcon from '@mui/icons-material/Public';
import CategoryIcon from '@mui/icons-material/Category';
import SourceIcon from '@mui/icons-material/Source';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const FeatureCard = ({ icon, title, description, color }) => {
  const theme = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = React.useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  // Calculate which border should be visible based on cursor position
  const getBorderPosition = () => {
    if (!isHovered || !cardRef.current) return { top: false, right: false, bottom: false, left: false };
    
    const rect = cardRef.current.getBoundingClientRect();
    const threshold = 30; // increased threshold for better visibility

    return {
      top: mousePosition.y <= threshold,
      right: mousePosition.x >= rect.width - threshold,
      bottom: mousePosition.y >= rect.height - threshold,
      left: mousePosition.x <= threshold
    };
  };

  const borderPosition = getBorderPosition();

  return (
    <Card 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{ 
        height: '100%',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
        },
        background: `linear-gradient(135deg, ${color}10 0%, ${color}05 100%)`,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '150px',
          height: '150px',
          background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
          borderRadius: '50%',
          transform: `translate(${mousePosition.x - 75}px, ${mousePosition.y - 75}px)`,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
          zIndex: 0,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          padding: '2px',
          background: `
            ${borderPosition.top ? `linear-gradient(to right, ${color} 0%, ${color}80 50%, transparent 100%) top,` : ''}
            ${borderPosition.right ? `linear-gradient(to bottom, ${color} 0%, ${color}80 50%, transparent 100%) right,` : ''}
            ${borderPosition.bottom ? `linear-gradient(to left, ${color} 0%, ${color}80 50%, transparent 100%) bottom,` : ''}
            ${borderPosition.left ? `linear-gradient(to top, ${color} 0%, ${color}80 50%, transparent 100%) left` : ''}
          `,
          backgroundSize: '100% 4px, 4px 100%, 100% 4px, 4px 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top, right, bottom, left',
          opacity: isHovered ? 1 : 0,
          transition: 'all 0.3s ease',
          pointerEvents: 'none',
        }
      }}
    >
      <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton 
            sx={{ 
              backgroundColor: `${color}15`,
              color: color,
              '&:hover': {
                backgroundColor: `${color}25`,
              }
            }}
          >
            {icon}
          </IconButton>
          <Typography variant="h6" sx={{ ml: 2, fontWeight: 600, color: theme.palette.text.primary }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

const FeaturesShowcase = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <PublicIcon />,
      title: "Global Coverage",
      description: "Access news from every corner of the world. Our extensive country filter lets you stay informed about specific regions that matter to you.",
      color: theme.palette.primary.main
    },
    {
      icon: <LanguageIcon />,
      title: "Multilingual News",
      description: "Read news in your preferred language. We support multiple languages to ensure you never miss important stories in your native tongue.",
      color: "#2196f3"
    },
    {
      icon: <CategoryIcon />,
      title: "Diverse Categories",
      description: "From sports and politics to technology and arts, explore news across various categories tailored to your interests.",
      color: "#4caf50"
    },
    {
      icon: <SourceIcon />,
      title: "Trusted Sources",
      description: "Access news from verified and reliable sources. Filter by specific news outlets to get information from your preferred publishers.",
      color: "#ff9800"
    },
    {
      icon: <TrendingUpIcon />,
      title: "Top Stories",
      description: "Stay updated with the most important and trending news stories from around the world.",
      color: "#f44336"
    },
    {
      icon: <AccessTimeIcon />,
      title: "Latest Updates",
      description: "Get real-time news updates as they happen. Never miss breaking news with our latest news section.",
      color: "#9c27b0"
    },
    {
      icon: <SmartToyIcon />,
      title: "AI Chatbot",
      description: "Interact with our intelligent chatbot to get instant answers to your questions about current events and news topics.",
      color: "#00bcd4"
    },
    {
      icon: <FavoriteIcon />,
      title: "Personalized Feed",
      description: "Save your favorite news articles and create a personalized feed that matches your interests and preferences.",
      color: "#e91e63"
    }
  ];

  return (
    <Box sx={{ 
      py: 8,
      backgroundColor: theme.palette.background.default,
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)'
      }
    }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 700,
              mb: 2,
              background: 'linear-gradient(45deg, #1976d2, #21cbf3)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Discover Our Features
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ maxWidth: '800px', mx: 'auto', lineHeight: 1.6 }}
          >
            Experience a new way of consuming news with our comprehensive set of features designed to keep you informed and engaged.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <FeatureCard {...feature} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ 
          mt: 6, 
          textAlign: 'center',
          p: 4,
          borderRadius: 2,
          background: 'linear-gradient(135deg, rgba(33,150,243,0.1) 0%, rgba(33,203,243,0.1) 100%)',
          border: '1px solid rgba(33,150,243,0.2)'
        }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            Ready to Explore?
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Start your journey with us and discover a world of news tailored just for you.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturesShowcase; 