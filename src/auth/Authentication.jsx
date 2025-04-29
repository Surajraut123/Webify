import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';

// preview-start
const providers = [
  { id: 'credentials', name: 'Email and Password' },
  { id: 'github', name: 'GitHub' },
  { id: 'google', name: 'Google' },
  { id: 'facebook', name: 'Facebook' },
  { id: 'twitter', name: 'Twitter' },
  { id: 'linkedin', name: 'LinkedIn' },
];

const signIn = async (provider, credentials) => {
  if (provider.id === 'credentials') {
    console.log('Email:', credentials.get('email'));
    console.log('Password:', credentials.get('password'));

    

    return { error: null };
  } else {
    console.log(`Sign in with ${provider}`);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ error: null });
      }, 500);
    });
  }
};

const Authetication = () => {
  const theme = useTheme();
  return (
    <AppProvider theme={theme}>
      <SignInPage 
        signIn={signIn} 
        providers={providers} />
    </AppProvider>
  );

}
export default Authetication;