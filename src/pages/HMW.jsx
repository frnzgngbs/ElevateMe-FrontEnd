import React from 'react';
import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const HMW = () => {
  const theme = useTheme();
  return (
    <Box
      paddingTop='3rem'
      paddingBottom='3rem'
      paddingLeft='8rem'
      paddingRight='8rem'
      sx={{ userSelect: 'none' }}
    >
      <h1 style={{ color: theme.palette.primary.main }}>
        Potential Root Problem
      </h1>
      <Box
        sx={{
          padding: '48px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'end',
        }}
      >
        <Box>
          <h3>Problem</h3>
          Inefficient waste collection
        </Box>
        <Box>
          <Button
            variant='contained'
            sx={{
              paddingTop: '10px',
              paddingBottom: '10px',
              paddingLeft: '30px',
              paddingRight: '30px',
              borderRadius: '32px',
              fontWeight: 'normal',
            }}
          >
            Show
          </Button>
        </Box>
      </Box>
      <Box paddingRight={'48px'} paddingLeft={'48px'}>
        <Button
          variant='contained'
          sx={{
            paddingTop: '10px',
            paddingBottom: '10px',
            paddingLeft: '30px',
            paddingRight: '30px',
            borderRadius: '32px',
            fontWeight: 'normal',
            float: 'right',
          }}
        >
          5 HMW
        </Button>
      </Box>
      <Box>
        <h1 style={{ color: theme.palette.primary.main }}>
          Generated 5 HMW Statement
        </h1>
      </Box>
      <Box paddingLeft={'48px'}>
        Enumerate 5 HMW statement(s) by specifying an ACTION (what you want to
        achieve), a SUBJECT (to be influenced or affected), and a WHAT (outcome
        or what you like to achieve).
      </Box>
      <Box marginTop={'56px'}>
        <FormGroup>
          <Box display='flex' flexDirection='row'>
            {/* Div for the checkboxes */}
            <Box display='flex' flexDirection='column'>
              {Array.from({ length: 5 }).map((_, index) => (
                <FormControlLabel key={index} control={<Checkbox />} />
              ))}
            </Box>
            {/* Div for the gray box */}
            <Box
              sx={{
                paddingLeft: '32px',
                backgroundColor: 'gray.main',
                width: '100%',
                borderRadius: '24px',
              }}
            >
              <Box paddingTop={'16px'}>
                <strong>HMW</strong>
              </Box>
              {Array.from({ length: 4 }).map((_, index) => (
                <Box key={index} paddingTop={'16px'}>
                  <strong>Why?</strong>
                </Box>
              ))}
            </Box>
          </Box>
        </FormGroup>
      </Box>
    </Box>
  );
};

export default HMW;
