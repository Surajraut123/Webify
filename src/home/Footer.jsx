import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, useTheme } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/LogoW.png';

const Footer = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const footerLinks = {
    company: [
      { label: 'About Us', path: '/about' },
      { label: 'Careers', path: '/careers' },
      { label: 'Contact', path: '/contact' }
    ],
    resources: [
      { label: 'News API', path: '/api' },
      { label: 'Documentation', path: '/docs' },
      { label: 'Support', path: '/support' }
    ],
    legal: [
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Cookie Policy', path: '/cookies' }
    ]
  };

  const socialLinks = [
    { icon: <FacebookIcon />, url: 'https://facebook.com' },
    { icon: <TwitterIcon />, url: 'https://twitter.com' },
    { icon: <LinkedInIcon />, url: 'https://linkedin.com' },
    { icon: <InstagramIcon />, url: 'https://instagram.com' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        py: 6,
        px: 2,
        mt: 'auto',
        background: 'linear-gradient(180deg, #1a1a1a 0%, #27282f 100%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
        }
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info with Logo */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <img 
                src={Logo} 
                alt="News Platform Logo" 
                style={{ 
                  width: '120px',
                  height: 'auto',
                  marginRight: '10px'
                }} 
              />
              <Typography 
                variant="h4" 
                sx={{ 
                  color: '#ffffff',
                  fontFamily: 'Abril Fatface',
                  marginLeft: '-20px'
                }}
              >
                ebify
              </Typography>
            </Box>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#83868d',
                mb: 3,
                fontSize: '1rem',
                lineHeight: 1.6
              }}
            >
              Your trusted source for real-time news and updates from around the world.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  sx={{
                    color: '#ffffff',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      transform: 'translateY(-2px)',
                      transition: 'all 0.3s ease'
                    }
                  }}
                  component="a"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={4}>
              {Object.entries(footerLinks).map(([category, links]) => (
                <Grid item xs={12} sm={4} key={category}>
                  <Typography
                    variant="subtitle1"
                    sx={{ 
                      color: '#ffffff',
                      fontWeight: 700,
                      mb: 2,
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}
                  >
                    {category}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    {links.map((link, index) => (
                      <Link
                        key={index}
                        component="button"
                        variant="body2"
                        onClick={() => handleNavigation(link.path)}
                        sx={{
                          color: '#83868d',
                          textAlign: 'left',
                          textDecoration: 'none',
                          fontSize: '0.95rem',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            color: '#ffffff',
                            transform: 'translateX(5px)'
                          }
                        }}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box
          sx={{
            mt: 6,
            pt: 3,
            borderTop: '1px solid rgba(255,255,255,0.1)',
            textAlign: 'center'
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#83868d',
              fontSize: '0.9rem'
            }}
          >
            © {new Date().getFullYear()} News Platform. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
