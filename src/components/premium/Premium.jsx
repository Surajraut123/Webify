import { Box, Button, Grid2, Typography } from '@mui/material'
import React from 'react'
import PremiumBenefits from './PremiumBenefits'
import Logo from  "../../assets/LogoW.png"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
const Premium = (props) => {
  return (
    <Box color="primary" sx={{display: 'flex', flexDirection: 'column', width: 'auto', height: '100vh', background: '#040608', color: '#ffffff', padding: '3rem'}}>
        <Box sx={{width: '100%', height:'10vh', display:'flex', justifyContent: 'space-between'}}>
            <Box sx={{display:'flex', gap: "2rem", justifyContent:'center', alignItems:'center'}}>
                <CloseOutlinedIcon sx={{height: "50px", width: '50px', cursor:'pointer'}} onClick={() => (props.setPremium(false))}/>
                <Grid2 container alignItems="center">
                    <img src={Logo} alt='loading...' style={{width: '7rem'}}/>
                    <Typography variant ='h4' sx={{fontFamily: 'Abril Fatface', color: '#ffffff', marginLeft: '-20px'}}>ebify</Typography>
                </Grid2>
            </Box>
            <Box sx={{padding: '1rem'}}>
                <Button sx={{background: "linear-gradient(110deg, #1492ff 0%, #0860c4 50%, #eb0066 100%);", color:'#ffffff', textTransform: 'none', padding: '0.5rem 2rem', fontSize: '1.2rem'}}>Login</Button>
            </Box>
        </Box>
        <Box sx={{width: '100%', height:'90vh', display: 'flex'}}>
            <Box sx={{padding: '2rem', flex: 1}}>
                <Typography variant="h4">Subscribe and Enjoy all articles and get live top headlines in real time</Typography>
            </Box>
            <Box sx={{flex: 2, width: '100%'}}>
                <Box sx={{display:'flex', gap: '3rem', flexDirection: 'column', padding: '2rem'}}>
                    <Box>
                        <PremiumBenefits/>
                    </Box>
                    <Box sx={{display:'flex', gap: '3rem', flexDirection: 'column'}}>
                        <Box sx={{display:'flex', gap: '1rem'}}>
                            <Box sx={{border: '2px solid #ffffff', borderRadius: '10px', padding: '10px', flex: 1, boxSizing: 'border-box'}}>
                                <Typography variant="h6" sx={{color: '#ffd65b'}}>Super</Typography>
                                <Typography variant="span">
                                    <sup title="" aria-hidden="false">₹</sup>
                                    <Typography variant="span" sx={{fontSize: '25px', fontWeight: '800', fontFamily: 'system-ui'}}>
                                        299
                                        <Typography variant="span" sx={{fontSize: '12px', fontFamily: 'Roboto'}}>/3Months</Typography>
                                    </Typography>
                                </Typography>
                            </Box>
                            <Box sx={{border: '2px solid #ffffff', borderRadius: '10px', padding: '10px', flex: 1, boxSizing: 'border-box'}}>
                                <Typography variant="h6" sx={{color: '#ffd65b'}}>Super</Typography>
                                <Typography variant="span">
                                    <sup title="" aria-hidden="false">₹</sup>
                                    <Typography variant="span" sx={{fontSize: '25px', fontWeight: '800', fontFamily: 'system-ui'}}>
                                        499
                                        <Typography variant="span" sx={{fontSize: '12px', fontFamily: 'Roboto'}}>/3Months</Typography>
                                    </Typography>
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{background: "linear-gradient(110deg, #1492ff 0%, #0860c4 50%, #eb0066 100%)", display:'flex', justifyContent:'center', alignItems:'center', padding: '1rem 2rem', borderRadius: '10px'}}>
                            <Typography sx={{fontSize: '1.1rem', fontWeight: '800', display: 'flex', alignItems:'center', justifyContent:'center', gap: '1rem'}}>
                                Continue with super
                                <Typography variant="span">
                                    <ArrowForwardIosIcon sx={{width: '20px'}}/>
                                </Typography>
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box>
  ) 
}

export default Premium
