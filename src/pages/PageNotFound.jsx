import React from 'react';
import Box from '@mui/material/Box';
import useTheme from '@mui/material/styles/useTheme';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  const theme = useTheme();
  return (
    <Box sx={{ userSelect: 'none' }} padding={'4rem'} textAlign={'center'}>
      <h1
        style={{
          color: theme.palette.primary.main,
        }}
      >
        Oops! Something went wrong.
      </h1>
      <img src={require('./../res/notfound.png')} alt='Not found' />
      <br />
      <Box sx={{ fontWeight: '500' }}>
        It appears something went wrong. Please proceed to our homepage
      </Box>
      <Link to='/user/home'>
        <Button
          variant='contained'
          sx={{
            marginTop: 15,
            paddingTop: '10px',
            paddingBottom: '10px',
            paddingLeft: '30px',
            paddingRight: '30px',
            borderRadius: '32px',
          }}
        >
          Go Home
        </Button>
      </Link>
    </Box>
  );
};

export default PageNotFound;
