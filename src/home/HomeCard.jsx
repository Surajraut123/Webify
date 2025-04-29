import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const RecipeReviewCard = ({data}) => {
  return (
    <Card sx={{width: '20rem'}}>
      <CardHeader
        title={data.title}
        subheader={data.publishedAt}
      />
      <CardMedia
        component="img"
        height="194"
        image="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="loading"
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.primary' }}>
          {data.content}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default RecipeReviewCard;
