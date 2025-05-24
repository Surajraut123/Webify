import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, Avatar, Rating, useTheme } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import StarIcon from '@mui/icons-material/Star';
import { motion, useInView, useAnimation } from 'framer-motion';

const AnimatedNumber = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const incrementTime = (duration * 1000) / end;
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return (
    <Typography ref={ref} variant="h2" sx={{ fontWeight: 700, color: 'primary.main' }}>
      {count.toLocaleString()}+
    </Typography>
  );
};

const FeedbackCard = ({ name, rating, comment, avatar }) => {
  const theme = useTheme();
  
  return (
    <Card 
      component={motion.div}
      whileHover={{ scale: 1.05 }}
      sx={{ 
        height: '100%',
        background: `linear-gradient(135deg, ${theme.palette.primary.main}10 0%, ${theme.palette.primary.main}05 100%)`,
        border: `1px solid ${theme.palette.primary.main}20`,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar src={avatar} sx={{ width: 56, height: 56, mr: 2 }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {name}
            </Typography>
            <Rating value={rating} readOnly precision={0.5} />
          </Box>
        </Box>
        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
          {comment}
        </Typography>
      </CardContent>
    </Card>
  );
};

const SponsorCard = ({ name, logo, description }) => {
  const theme = useTheme();
  const [imgError, setImgError] = useState(false);
  
  const handleImageError = () => {
    setImgError(true);
  };

  return (
    <Card 
      component={motion.div}
      whileHover={{ scale: 1.05 }}
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${theme.palette.primary.main}10 0%, ${theme.palette.primary.main}05 100%)`,
        border: `1px solid ${theme.palette.primary.main}20`,
        p: 3
      }}
    >
      <Box 
        sx={{ 
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2
        }}
      >
        {!imgError ? (
          <Box 
            component="img"
            src={logo}
            alt={name}
            onError={handleImageError}
            sx={{ 
              width: 150,
              height: 150,
              objectFit: 'contain',
              filter: 'grayscale(100%)',
              transition: 'all 0.3s ease',
              '&:hover': {
                filter: 'grayscale(0%)',
                transform: 'scale(1.05)'
              }
            }}
          />
        ) : (
          <Box
            sx={{
              width: 150,
              height: 150,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.palette.primary.main + '10',
              borderRadius: 1
            }}
          >
            <Typography variant="h4" color="primary">
              {name.charAt(0)}
            </Typography>
          </Box>
        )}
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600,
            textAlign: 'center',
            color: theme.palette.text.primary
          }}
        >
          {name}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            textAlign: 'center',
            maxWidth: '80%'
          }}
        >
          {description}
        </Typography>
      </Box>
    </Card>
  );
};

const StatsShowcase = () => {
  const theme = useTheme();
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const stats = [
    {
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      value: 50000,
      label: "Active Users",
      color: theme.palette.primary.main
    },
    {
      icon: <NewspaperIcon sx={{ fontSize: 40 }} />,
      value: 100,
      label: "News Sources",
      color: "#2196f3"
    },
    {
      icon: <StarIcon sx={{ fontSize: 40 }} />,
      value: 4.8,
      label: "User Rating",
      color: "#ff9800"
    }
  ];

  const sponsors = [
    {
      name: "BBC News",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/BBC_News_2019.svg/1200px-BBC_News_2019.svg.png",
      description: "Trusted source for global news coverage"
    },
    {
      name: "Reuters",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Reuters_logo.svg/1200px-Reuters_logo.svg.png",
      description: "Leading international news agency"
    },
    {
      name: "AP News",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Associated_Press_logo_2012.svg/1200px-Associated_Press_logo_2012.svg.png",
      description: "Reliable source for breaking news"
    }
  ];

  const feedbacks = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "The best news platform I've used! The personalized feed and real-time updates are amazing.",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      name: "Michael Chen",
      rating: 4.5,
      comment: "Great interface and reliable sources. The AI chatbot feature is particularly helpful.",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    {
      name: "Emma Davis",
      rating: 5,
      comment: "Love how I can customize my news feed and save articles for later reading.",
      avatar: "https://i.pravatar.cc/150?img=3"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <Box 
      ref={ref}
      sx={{ 
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
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {/* Stats Section */}
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700,
                mb: 4,
                background: 'linear-gradient(45deg, #1976d2, #21cbf3)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Our Impact
            </Typography>
            <Grid container spacing={4} sx={{ mt: 4 }}>
              {stats.map((stat, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <motion.div variants={itemVariants}>
                    <Card 
                      sx={{ 
                        p: 3,
                        textAlign: 'center',
                        background: `linear-gradient(135deg, ${stat.color}10 0%, ${stat.color}05 100%)`,
                        border: `1px solid ${stat.color}20`,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Box sx={{ color: stat.color, mb: 2 }}>
                        {stat.icon}
                      </Box>
                      <AnimatedNumber value={stat.value} />
                      <Typography variant="h6" sx={{ mt: 1, color: 'text.secondary' }}>
                        {stat.label}
                      </Typography>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Sponsors Section */}
          <Box sx={{ mb: 8 }}>
            <Typography 
              variant="h3" 
              sx={{ 
                textAlign: 'center',
                fontWeight: 700,
                mb: 4,
                background: 'linear-gradient(45deg, #1976d2, #21cbf3)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Our Trusted Sources
            </Typography>
            <Grid 
              container 
              spacing={4} 
              sx={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'stretch'
              }}
            >
              {sponsors.map((sponsor, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div variants={itemVariants} style={{ height: '100%' }}>
                    <SponsorCard {...sponsor} />
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Feedback Section */}
          <Box>
            <Typography 
              variant="h3" 
              sx={{ 
                textAlign: 'center',
                fontWeight: 700,
                mb: 4,
                background: 'linear-gradient(45deg, #1976d2, #21cbf3)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              What Our Users Say
            </Typography>
            <Grid 
              container 
              spacing={4}
              sx={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'stretch'
              }}
            >
              {feedbacks.map((feedback, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div variants={itemVariants} style={{ height: '100%' }}>
                    <FeedbackCard {...feedback} />
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default StatsShowcase; 