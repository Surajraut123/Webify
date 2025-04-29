import { SignIn, SignUp } from '@clerk/clerk-react'
import { Box } from '@mui/material'
import React from 'react'

const SignInUp = ({signIn, signUp}) => {
  return (
    
    <Box sx={{width :'100%', height: '100%', display: 'flex', justifyContent:'center', alignItems: 'center', position:'absolute'}}>
        {signIn && <SignIn/>}
        {signUp && <SignUp/>}                                                                             
    </Box>
    
    )
}

export default SignInUp
