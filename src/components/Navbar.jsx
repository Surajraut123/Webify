import { AppBar, Avatar, Badge, Box, Button, InputBase, Menu, MenuItem, Toolbar, Tooltip, Typography, colors, styled } from '@mui/material'
import {React, useState} from 'react'
import CodeOffIcon from '@mui/icons-material/CodeOff';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useLocation } from 'react-router-dom';
const Navbar = ({favNews}) => {

    const StyledToolbar = styled(Toolbar)({
        display: "flex",
        justifyContent: "space-between"
    })

    const SearchBar = styled("div") ({
        backgroundColor: "white",
        color: "black",
        padding: "0, 10px",
        borderRadius: "10px",
        width: "40%"

    })

    const handleFavNews = () => {
        favNews((prev) => !prev)
    }

    const Icons = styled(Box)(({theme}) => ({
        display: 'none',
        gap: "20px",
        alignItems: "center",

        [theme.breakpoints.up("sm")]:{
            display: 'flex'
        }
    }))

    const UserBox = styled(Box) (({theme}) => ({
        display: 'flex',
        gap: "20px",
        alignItems: "center",
        [theme.breakpoints.up("sm")]: {
            display: 'none'
        }
    }))
    const [open, setOpen] = useState(false);

    const location = useLocation();
    const isFeed = location.pathname === '/feed'

  return (
    <AppBar position='sticky' sx={{backgroundColor: '#3985d1'}}>
        <StyledToolbar>
            <Typography variant='h6' sx={{ display: {xs: "none", sm: "block"}}}>Webify</Typography>
            <CodeOffIcon sx={{ display: {xs: "block", sm: "none"}}}/>


            {isFeed && (<Icons>
                <Tooltip title="Favourite news">
                    <Badge badgeContent={4} color='error'>
                        <FavoriteIcon onClick={handleFavNews} sx={{"&:hover": {cursor: 'pointer'}}}/>
                    </Badge>
                </Tooltip>
                <Tooltip title="Notifications">
                    <Badge badgeContent={4} color='error'>
                        <NotificationsIcon sx={{"&:hover": {cursor: 'pointer'}}}/>
                    </Badge>
                </Tooltip>
                <Tooltip title="Profile">
                    <Avatar sx={{width:30, height:30, "&:hover": {cursor: 'pointer'}}} alt="Remy Sharp" src="https://images.pexels.com/photos/1462980/pexels-photo-1462980.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    onClick={(e)=>setOpen(true)}
                    />
                </Tooltip>
            </Icons>)}

            {!isFeed && (
                <Box sx={{display: 'flex', gap: '1rem'}}>
                    <Button sx={{color: '#ffffff', border: '1px solid #ffffff'}} >Sign up</Button>
                    <Button 
                        variant='outlined' sx={{backgroundColor: '#ffffff', color: '#000000', p: 1, borderRadius: 2}}>Log in</Button>
                </Box>
            )}

            <UserBox onClick={(e)=>setOpen(true)}>
                <Avatar sx={{width:30, height:30}}alt="Remy Sharp" src="https://images.pexels.com/photos/1462980/pexels-photo-1462980.jpeg?auto=compress&cs=tinysrgb&w=600" />
                
                <Typography variant='span'>Suraj</Typography>
            </UserBox>
        </StyledToolbar>

        <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            open={open}
            onClose={(e) => setOpen(false)}
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
        >
            <MenuItem >Profile</MenuItem>
            <MenuItem >My account</MenuItem>
            <MenuItem >Logout</MenuItem>
        </Menu>
    </AppBar>
  )
}

export default Navbar
