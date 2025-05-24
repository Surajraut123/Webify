import React, { useState } from 'react';
import Box from '@mui/material/Box';
// import HomeCard from './HomeCard'
import LandingLogo from '../assets/LandingLogo.gif'
import LandingPage from './LandingPage';
import Footer from './Footer';
import SocialConnect from './SocialConnect';
import Premium from '../components/premium/Premium';
import NewsNavigation from './newsNavigation/NewsNavigation';
import FeaturesShowcase from './FeaturesShowcase';
import StatsShowcase from './StatsShowcase';
import ContactForm from './ContactForm';

const Home = () => {

  const [premium, setPremium] = useState(false);
  return (
    <Box sx={{width: '100%', display: 'flex', alignItems: 'center', flexDirection:'column'}}>
      <img src={LandingLogo} style={{width: '100%', height: '100vh'}}/>
      <Box sx={{height: '100%', display: 'flex', flexDirection: 'column', position: 'absolute', width: '100%'}}>
        {!premium && <LandingPage setPremium={setPremium}/>}
        {premium && <Premium setPremium={setPremium}/>}
      </Box>
      <NewsNavigation/>
      <FeaturesShowcase/>
      <StatsShowcase/>
      <SocialConnect/>
      <ContactForm/>
      <Footer/>
    </Box>
  );
}
export default Home;