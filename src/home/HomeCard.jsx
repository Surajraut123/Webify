import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar, Box, Link, Button } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const HomeCard = ({data}) => {
  const handleOpenNews = () => {
    window.open(data?.link, '_blank');
  };

  return (
    <Box sx={{
      width: '20rem',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      height: '100%',
      boxSizing: 'border-box',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      }
    }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          height: '30%'
        }}
      >
        <Typography component='p' sx={{fontSize: '1.2rem', height:'80%', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 'bold'}}>{data?.title}</Typography>
        <Typography component='span' sx={{fontSize: '0.9rem', height: '20%', color: '#666'}}>{data?.pubDate}</Typography>
      </Box>
      <Box sx={{
        display: 'flex',
        gap: "5px",
        alignItems: 'center',
        height: '10%'
      }}>
          <Avatar src={data?.source_icon} sx={{width: '30px', height: '30px'}}/>
          <Link href={data?.source_url} sx={{textDecoration: 'none', color: '#1976d2'}}>{data?.source_name}</Link>
      </Box>
      <Box
        component="img"
        src={data?.image_url}
        sx={{
          width: '100%',
          height: '40%',
          borderRadius: '8px',
          objectFit: 'cover'
        }}
      />
      <Box
        sx={{
          height: '20%',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}
      >
        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.5 }}>
          {data?.description?.length > 150
            ? `${data.description.slice(0, 150)}...`
            : data?.description}
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        endIcon={<OpenInNewIcon sx={{ transition: 'transform 0.3s', ml: 0.5 }} />}
        onClick={handleOpenNews}
        sx={{
          mt: 2,
          width: '100%',
          py: 0.7,
          fontWeight: 600,
          fontSize: '0.98rem',
          letterSpacing: 1,
          borderRadius: 2,
          background: 'linear-gradient(90deg, #1976d2 0%, #21cbf3 100%)',
          boxShadow: '0 4px 16px 0 rgba(33,203,243,0.15)',
          textTransform: 'uppercase',
          transition: 'all 0.3s cubic-bezier(.4,2,.3,1)',
          '&:hover': {
            background: 'linear-gradient(90deg, #21cbf3 0%, #1976d2 100%)',
            boxShadow: '0 8px 24px 0 rgba(33,203,243,0.25)',
            transform: 'scale(1.04)',
            '& .MuiSvgIcon-root': {
              transform: 'translateX(4px) scale(1.2)',
              color: '#fff',
            }
          },
        }}
      >
        Read Full Article
      </Button>
    </Box>
  );
}

export default HomeCard;
