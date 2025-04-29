import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox, Collapse, IconButton, InputAdornment, Modal, TextField, Typography } from '@mui/material'
import React, { useMemo, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import DateObject from 'react-date-object';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import {
    WhatsappShareButton,
    WhatsappIcon,
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    LinkedinIcon,
    MailruShareButton,
    MailruIcon,
    TelegramShareButton,
    TelegramIcon,
    InstapaperShareButton,
    InstapaperIcon,
    LinkedinShareButton,
  } from "react-share";
import { toast, ToastContainer } from 'react-toastify';

const Post = ({author, published, urlToImage, headline, description, title, urlToReDirect, newsData, isOpenFavourite, setFavNewsClicked}) => {
    const fallbackImage = "https://www.pewresearch.org/wp-content/uploads/sites/8/2016/07/PJ_2016.07.07_Modern-News-Consumer_0-01.png";

    const NEWS_END_POINT = import.meta.env.VITE_URL_END_POINT;

    const [favouriteClicked, setFavouriteClicked] = useState(false)
    const [imgSrc, setImgSrc] = useState(urlToImage || fallbackImage);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleRedirect = (url) => {
        window.open(url, '_blank')
    }
    const setFavouriteNews = async () => {
        if(!isOpenFavourite) {
            setFavouriteClicked((prev) => !prev)
        }

        try {
            const response = await fetch(`http://${NEWS_END_POINT}/api/fav`, {
                method: "POST",
                body: JSON.stringify({
                    userId: "680741baa2cf06d6d97b0500",
                    newsData: newsData,
                    isOpenFavourite: isOpenFavourite
                }),
                headers: {
                    "Content-type": "application/json"
                }
            })

            if(response.ok && !isOpenFavourite) {
                console.log("Favourite news added")
                alert("News added to Favourite")
                
            } else{
                console.log("Something went wrong while setting favourite news")
            }

            // On each liked button this, condition should check
            if(isOpenFavourite) {
                setFavNewsClicked((prev) => !prev)
                alert("News removed")
            }
        } catch(error) {
            console.error("Error While Setting FAvourite News")
        }
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
      
    const ShareBlock = (url, title) => {
        return (
            <Box sx={{ display: "flex", gap: "10px" }}>
                <WhatsappShareButton url={url} title={createShareMessage(title)}>
                    <WhatsappIcon size={50} round />
                </WhatsappShareButton>
            
                <FacebookShareButton url={url} quote={createShareMessage(title)}>
                    <FacebookIcon size={50} round />
                </FacebookShareButton>
            
                <TwitterShareButton url={url} title={createShareMessage(title)}>
                    <TwitterIcon size={50} round />
                </TwitterShareButton>

                <LinkedinShareButton url={url} title={createShareMessage(title)}>
                    <LinkedinIcon size={50} round />
                </LinkedinShareButton>

                <MailruShareButton url={url} title={createShareMessage(title)}>
                    <MailruIcon size={50} round />
                </MailruShareButton>

                <TelegramShareButton url={url} title={createShareMessage(title)}>
                    <TelegramIcon size={50} round />
                </TelegramShareButton>

                <InstapaperShareButton url={url} title={createShareMessage(title)}>
                    <InstapaperIcon size={50} round />
                </InstapaperShareButton>
            </Box>

        )
    };
      
    const createShareMessage = (title, prefix = "📢 Must Read:") => {
        return `${prefix} ${title}\n\nStay updated at Webify 👉 https://www.webify.com \n\n\n Read more: `;
    };

    const [copied, setCopied] = useState(false);

    const handleCopy = (text) => {
      navigator.clipboard.writeText(text);
      setCopied(true);
  
      setTimeout(() => {
        setCopied(false);
      }, 2000); 
    };
  
  return (
    <>
        <Card sx={{margin: "0rem 9rem 3rem 9rem"}}>
            <CardHeader
                avatar={    
                    <Avatar 
                        sx={{ backgroundColor: "red" }} 
                        aria-label="recipe"
                    >  
                        {author?.slice(0, 1)}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={author || "Unknown"}
                subheader={
                    useMemo(() => {
                        return new DateObject(published).format("MMMM D, YYYY hh:mm A");
                    }, [published])
                }
            />  
            <Box 
                position='relative' 
                overflow="hidden" 
                sx={{cursor:'pointer'}}
                onClick={() => handleRedirect(urlToReDirect)}
            >
                <CardMedia
                    component="img" 
                    height="20%"
                    image={imgSrc}
                    alt="loading"
                    onError={() => setImgSrc(fallbackImage)}
                />
                <Typography sx={{
                    position: "absolute",
                    bottom: 0,
                    color: "white", 
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    padding: "4px 8px",
                    borderRadius: 1,
                    width: '100%',
                    whiteSpace: "wrap",
                    fontSize: '1.6rem',
                    '&:hover' :{
                        boxShadow: '0px 0px 50px 20px #000000',
                        transition: '0.2s'
                    }
                }}
                >
                    {title}
                </Typography>
            </Box>

            <CardContent>
                <Typography 
                    variant="body2" 
                    sx={{ 
                        color: 'text.primary', 
                        fontWeight: 700, 
                        marginBottom: "1rem", 
                        fontSize: '1rem', 
                        cursor: "pointer",
                        "&:hover":{
                            textDecoration: 'underline'
                        }
                    }}
                    onClick={() => handleRedirect(urlToReDirect)}
                >
                    <strong>{headline ? headline?.slice(0, 100) : ""}...</strong>
                </Typography>
                <Typography 
                    variant="body2" 
                    sx={{ 
                        color: 'text.secondary',
                        fontSize: '0.95rem'
                    }}
                >
                    {(description==null || description==="") ? "" : description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <Checkbox 
                        icon={<FavoriteBorder />} 
                        checkedIcon={
                            <Favorite sx={{color: "red"}}/>
                        } 
                        checked={isOpenFavourite || favouriteClicked}
                        onClick={() => setFavouriteNews(newsData)}
                    />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon onClick={handleOpen}/>
                </IconButton>
            </CardActions>
        </Card>
        <ToastContainer/>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                Share the news with your friends
                </Typography>

                <TextField
                id="outlined-basic"
                variant="outlined"
                value={urlToReDirect}
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={() => handleCopy(urlToReDirect)}>
                        <ContentCopyIcon />
                        </IconButton>
                    </InputAdornment>
                    ),
                }}
                sx={{ width: '100%', margin: '2rem 0' }}
                />

                {copied && (
                <Typography variant="body2" color="success.main" sx={{ mb: 2 }}>
                    Link copied to clipboard!
                </Typography>
                )}
                {ShareBlock(urlToReDirect, title)}
            </Box>
        </Modal>
    </>
  )
}

export default Post
