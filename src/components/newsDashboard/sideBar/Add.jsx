import { Avatar, Box, Button, ButtonGroup, Fab, IconButton, Modal, Stack, styled, TextField, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import AddIcon from "@mui/icons-material/Add"
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DateRangeIcon from '@mui/icons-material/DateRange';
const Add = () => {
    const [open, setOpen] = useState(false)

    const StyledModal = styled(Modal) ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    })
    const UserBox = styled(Box) ({
        display: "flex",
        alignItems: "center",
        gap: "10px"
    })
  return (
    <>
        <Tooltip 
            title="Delete" 
            sx={{
                position: "fixed", 
                bottom: 20, 
                left:{xs:"calc(50% - 25px)", md: 30},
                }}
            onClick={(e) => setOpen(true)}
        >
            <Fab color="primary" aria-label="add">
                <AddIcon />
            </Fab>
        </Tooltip>

        <StyledModal
            open={open}
            onClose={(e) => setOpen(true)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box width={400} height={280} bgcolor={"background.default"} color={"text.primary"} p={3} borderRadius={5} >
                <Typography variant="h6" color="gray" textAlign="center">Create Post</Typography>

                <UserBox>
                <Avatar sx={{width:30, height:30}} alt="Suraj Raut" src="https://images.pexels.com/photos/1462980/pexels-photo-1462980.jpeg?auto=compress&cs=tinysrgb&w=600" 
                />
                <Typography>Suraj Raut</Typography>
                </UserBox>

                <TextField
                    sx={{width: "100%"}}
                    id="standard-multiline-static"
                    multiline
                    placeholder="What's on your mind?"
                    variant='standard'
                    rows={4}
                />

                <Stack direction="row" gap={1} mt={2} mb={2}>
                    <EmojiEmotionsIcon color='primary'/>
                    <ImageIcon color='secondary'/>
                    <VideocamIcon color='error'/>
                    <PersonAddIcon color='success'/>
                </Stack>

                <ButtonGroup 
                    fullWidth
                    variant="contained" 
                    aria-label="Basic button group">
                    <Button>Post</Button>
                    <Button sx={{width: "100px"}}><DateRangeIcon/></Button>
                </ButtonGroup>
            </Box>
        </StyledModal>
    </>
  )
}

export default Add
